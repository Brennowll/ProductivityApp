import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"

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
    .refine((value) => value.trim() !== "", "Task text cannot be only spaces."),
})

type UserTask = z.infer<typeof taskSchema>

export const EditTask = () => {
  const {
    userTasks,
    setUserTasks,
    taskIdSelected,
    setEditTaskIsOpen,
    editTaskTextValue,
    createTaskIsActive,
  } = useContext(GlobalStateContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserTask>({
    resolver: zodResolver(taskSchema),
  })

  useEffect(() => {
    setValue("taskText", editTaskTextValue)
  }, [editTaskTextValue, setValue])

  const findTaskById = (
    taskId: number,
    tasks: UserTask[]
  ): UserTask | undefined => {
    return tasks.find((task) => task.id === taskId)
  }

  const updateTask = (
    taskId: number,
    newTaskText: string,
    tasks: UserTask[]
  ) => {
    const taskToUpdate = findTaskById(taskId, tasks)
    if (taskToUpdate) {
      taskToUpdate.taskText = newTaskText
    }
  }

  const onSubmit = (data: UserTask) => {
    const userTasksCopy = [...userTasks]

    if (createTaskIsActive) {
      const newId =
        userTasksCopy.length > 0
          ? userTasksCopy[userTasksCopy.length - 1].id + 1
          : 1
      userTasksCopy.push({
        id: newId,
        taskText: data.taskText,
      })
    } else {
      updateTask(taskIdSelected, data.taskText, userTasksCopy)
    }

    setUserTasks(userTasksCopy)
    setEditTaskIsOpen(false)
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
        <div className="space flex h-16 w-full items-end justify-end">
          <button
            className="h-10 w-24 transform rounded-md bg-gray-400
            font-nunitoRegular text-white transition-all hover:scale-105
            active:scale-100"
            onClick={() => setEditTaskIsOpen(false)}
          >
            {cancelButtonText}
          </button>
          <button
            className="ml-3 h-10 w-24 transform rounded-md
            bg-myBlue font-nunitoRegular text-white transition-all
            hover:scale-105 active:scale-100"
            type="submit"
          >
            {saveButtonText}
          </button>
        </div>
      </form>
    </EditLayout>
  )
}
