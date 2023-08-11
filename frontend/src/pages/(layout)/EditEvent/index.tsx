import { useContext, useState, useEffect } from "react"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"
import { EditEventButton } from "./EditEventButton"

interface CalendarEvent {
  id: number
  start: Date
  end: Date
  title: string
}

export const EditEvent = () => {
  const {
    createEventIsActived,
    setEditEventIsOpen,
    eventSelected,
    myCalendarEvents,
    setMyCalendarEvents,
  } = useContext(GlobalStateContext)

  const [titleAreaValue, setTitleAreaValue] = useState<string>("")

  useEffect(() => {
    setTitleAreaValue(eventSelected.title)
  }, [eventSelected.title])

  const findEventById = (
    calendarId: number,
    events: CalendarEvent[]
  ): CalendarEvent | undefined => {
    return events.find((event) => event.id === calendarId)
  }

  const handleEventTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitleAreaValue(event.target.value)
  }

  const updateEvent = (
    eventId: number,
    start: Date,
    end: Date,
    title: string,
    events: CalendarEvent[]
  ) => {
    const eventToUpdate = findEventById(eventId, events)
    if (eventToUpdate) {
      eventToUpdate.start = start
      eventToUpdate.end = end
      eventToUpdate.title = title
    }
  }

  const handleCancelButtonClick = () => {
    setEditEventIsOpen(false)
  }

  const handleDeleteButtonClick = () => {
    const myCalendarEventsCopy = [...myCalendarEvents]
    for (
      let notePosition = 0;
      notePosition < myCalendarEventsCopy.length;
      notePosition++
    ) {
      if (myCalendarEventsCopy[notePosition].id === eventSelected.id) {
        myCalendarEventsCopy.splice(notePosition, 1)
        break
      }
    }
    setMyCalendarEvents(myCalendarEventsCopy)
    setEditEventIsOpen(false)
  }

  const handleSaveButtonClick = () => {
    const myCalendarEventsCopy = [...myCalendarEvents]

    if (createEventIsActived) {
      const newId =
        myCalendarEventsCopy.length > 0
          ? myCalendarEventsCopy[myCalendarEventsCopy.length - 1].id + 1
          : 1
      myCalendarEventsCopy.push({
        id: newId,
        start: eventSelected.start,
        end: eventSelected.end,
        title: titleAreaValue,
      })
    } else {
      updateEvent(
        eventSelected.id,
        eventSelected.start,
        eventSelected.end,
        titleAreaValue,
        myCalendarEventsCopy
      )
    }

    setMyCalendarEvents(myCalendarEventsCopy)
    setEditEventIsOpen(false)
  }

  const cancelButtonText = "Cancel"
  const saveButtonText = createEventIsActived ? "Create" : "Save"

  return (
    <EditLayout>
      <div
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
          py-4"
      >
        <textarea
          className="mb-1 h-full w-full resize-none rounded-md border-2
            p-3 align-text-top font-nunitoRegular
            focus:outline-none"
          value={titleAreaValue}
          onChange={handleEventTitleChange}
          placeholder="Put your event title here.."
        />
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
              onClick={handleDeleteButtonClick}
              backgroundColor="bg-red-500"
            />
          ) : null}
          <EditEventButton
            buttonText={saveButtonText}
            onClick={handleSaveButtonClick}
            backgroundColor="bg-myBlue"
          />
        </div>
      </div>
    </EditLayout>
  )
}
