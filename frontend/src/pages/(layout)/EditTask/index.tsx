import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "react-query"
import Cookies from "js-cookie"
import axios from "axios"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"
import { api } from "../../../store/QueryClient"

const taskSchema = z.object({
  id: z.number().optional(),
  taskText: z
    .string()
    .nonempty("The task text is required.")
    .min(5, "Task must have at least 5 characters.")
    .max(400, "Task exceeds character limit, Max 400.")
    .refine((value) => value.split("\n").length <= 10, {
      message: `Task text can have a maximum of ${10} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Task text cannot be only spaces."
    ),
})

type TaskInterface = z.infer<typeof taskSchema>

export const EditTask = () => {
  const {
    taskIdSelected,
    setEditTaskIsOpen,
    editTaskTextValue,
    createTaskIsActive,
  } = useContext(GlobalStateContext)

  const [taskApiError, setTaskApiError] = useState<string | null>(
    null
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskInterface>({
    resolver: zodResolver(taskSchema),
  })

  useEffect(() => {
    setValue("taskText", editTaskTextValue)
  }, [editTaskTextValue, setValue])

  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskInterface) => {
      const token = Cookies.get("access_token")
      const response = await api.post(
        "/tasks/",
        {
          taskText: data.taskText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tasks"])
      setEditTaskIsOpen(false)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setTaskApiError(error.response?.data)
      }
    },
  })

  const patchTaskMutation = useMutation({
    mutationFn: async (data: TaskInterface) => {
      const token = Cookies.get("access_token")
      const response = await api.patch(
        `/tasks/${taskIdSelected}/`,
        {
          taskText: data.taskText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tasks"])
      setEditTaskIsOpen(false)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setTaskApiError(error.response?.data)
      }
    },
  })

  const deleteTaskMutation = useMutation(
    async () => {
      const token = Cookies.get("access_token")
      await api.delete(`/tasks/${taskIdSelected}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"])
        setEditTaskIsOpen(false)
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setTaskApiError(error.response?.data)
        }
      },
    }
  )

  const onSubmit = (data: TaskInterface) => {
    if (createTaskIsActive) {
      createTaskMutation.mutate(data)
    } else {
      patchTaskMutation.mutate(data)
    }
  }

  const onDelete = () => {
    deleteTaskMutation.mutate()
  }

  const cancelButtonText = "Cancel"
  const saveButtonText = createTaskIsActive ? "Create" : "Save"

  return (
    <EditLayout>
      <form
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
        py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          id="editCreateTaskTextArea"
          className={`h-full w-full resize-none rounded-md border-2
          p-3 align-text-top font-nunitoRegular focus:outline-none
          ${errors.taskText && "border-myRed"}`}
          placeholder="Put your task here.."
          {...register("taskText")}
        />
        {errors.taskText && (
          <p className="font-nunitoRegular text-myRed">
            {errors.taskText.message}
          </p>
        )}
        {taskApiError && (
          <p className="font-nunitoRegular text-myRed">
            {taskApiError}
          </p>
        )}
        <div className="space flex h-16 w-full items-end justify-end gap-3">
          <button
            type="button"
            className="h-10 w-24 transform rounded-md bg-gray-400
            font-nunitoRegular text-white transition-all hover:scale-105
            active:scale-100"
            onClick={() => setEditTaskIsOpen(false)}
          >
            {cancelButtonText}
          </button>
          {!createTaskIsActive ? (
            <button
              type="button"
              className="h-10 w-24 transform rounded-md bg-myRed
            font-nunitoRegular text-white transition-all hover:scale-105
            active:scale-100"
              onClick={onDelete}
            >
              Delete
            </button>
          ) : null}
          <button
            type="submit"
            className="h-10 w-24 transform rounded-md
            bg-myBlue font-nunitoRegular text-white transition-all
            hover:scale-105 active:scale-100"
          >
            {saveButtonText}
          </button>
        </div>
      </form>
    </EditLayout>
  )
}
