import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient, useMutation } from "react-query"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { api } from "../../../store/QueryClient"
import { EditLayout } from "../EditLayout"
import { EditEventButton } from "./EditEventButton"

const eventSchema = z.object({
  id: z.number().optional(),
  start: z.date().optional(),
  end: z.date().optional(),
  title: z
    .string()
    .nonempty("The title is required.")
    .min(5, "Title must have at least 5 characters.")
    .max(200, "Title exceeds character limit, Max 200.")
    .refine((value) => value.split("\n").length <= 10, {
      message: `Title can have a maximum of ${10} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Task text cannot be only spaces."
    ),
})

type CalendarEvent = z.infer<typeof eventSchema>

export const EditEvent = () => {
  const { createEventIsActived, setEditEventIsOpen, eventSelected } =
    useContext(GlobalStateContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CalendarEvent>({
    resolver: zodResolver(eventSchema),
  })

  useEffect(() => {
    setValue("title", eventSelected.title)
  }, [eventSelected, setValue])

  const findEventById = (
    calendarId: number,
    events: CalendarEvent[]
  ): CalendarEvent | undefined => {
    return events.find((event) => event.id === calendarId)
  }

  const queryClient = useQueryClient()

  const createEventMutation = useMutation({
    mutationFn: async (data: CalendarEvent) => {
      const token = Cookies.get("access_token")
      const response = await api.post(
        "/calendar-events/",
        {
          start: eventSelected.start,
          end: eventSelected.end,
          title: data.title,
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
      await queryClient.invalidateQueries(["events"])
      setEditEventIsOpen(false)
    },
  })

  const patchEventMutation = useMutation({
    mutationFn: async (data: CalendarEvent) => {
      const token = Cookies.get("access_token")
      const response = await api.patch(
        `/calendar-events/${eventSelected.id}/`,
        {
          start: eventSelected.start,
          end: eventSelected.end,
          title: data.title,
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
      await queryClient.invalidateQueries(["events"])
      setEditEventIsOpen(false)
    },
  })

  const deleteEventMutation = useMutation(
    async () => {
      const token = Cookies.get("access_token")
      await api.delete(`/calendar-events/${eventSelected.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["events"])
        setEditEventIsOpen(false)
      },
    }
  )

  const onSubmit = (data: CalendarEvent) => {
    if (createEventIsActived) {
      createEventMutation.mutate(data)
    } else {
      patchEventMutation.mutate(data)
    }
  }

  const onDelete = () => {
    deleteEventMutation.mutate()
  }

  const handleCancelButtonClick = () => {
    setEditEventIsOpen(false)
  }

  const cancelButtonText = "Cancel"
  const saveButtonText = createEventIsActived ? "Create" : "Save"

  return (
    <EditLayout>
      <form
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
        py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          className={`mb-1 h-full w-full resize-none rounded-md border-2
          p-3 align-text-top font-nunitoRegular
          focus:outline-none ${errors.title && "border-myRed"}`}
          placeholder="Put your event title here.."
          {...register("title")}
        />
        {errors.title && (
          <p className="mb-1 font-nunitoRegular text-xs text-myRed">
            {errors.title.message}
          </p>
        )}
        <input
          type="text"
          className="mb-1 h-8 w-full rounded-md border-2
            p-3 font-nunitoRegular focus:outline-none"
          readOnly
          value={`Start: ${eventSelected.start}`}
        />
        <input
          type="text"
          className="mb-1 h-8 w-full rounded-md border-2
            p-3 font-nunitoRegular focus:outline-none"
          readOnly
          value={`End: ${eventSelected.end}`}
        />
        <div className="space flex h-16 w-full items-end justify-end">
          <EditEventButton
            buttonText={cancelButtonText}
            onClick={handleCancelButtonClick}
            backgroundColor="bg-gray-400"
          />
          {createEventIsActived === false ? (
            <EditEventButton
              buttonText="Delete"
              onClick={onDelete}
              backgroundColor="bg-red-500"
            />
          ) : null}
          <EditEventButton
            isSubmit={true}
            buttonText={saveButtonText}
            backgroundColor="bg-myBlue"
          />
        </div>
      </form>
    </EditLayout>
  )
}
