import React, { useContext, useCallback, useMemo } from "react"
import { Calendar, DateLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./style.css"
import { useLocation } from "react-router-dom"

interface ReactBigCalendarProps {
  localizer: DateLocalizer
}

interface Event {
  id: number
  start: Date
  end: Date
  title: string
}

export const ReactBigCalendar: React.FC<ReactBigCalendarProps> = ({
  localizer,
}) => {
  const {
    myCalendarEvents,
    setEventSelected,
    setEditEventIsOpen,
    setCreateEventIsActived,
  } = useContext(GlobalStateContext)

  const location = useLocation()
  const shadowIfCalendarPath =
    location.pathname === "/calendar"
      ? "sm:shadow-md p-3 sm:p-7 lg:p-10 sm:bg-myLightGray h-[calc(100%-10px)] w-[calc(100%-40px)] lg:h-[calc(100%-40px)] lg:w-[calc(100%-100px)] sm:h-[calc(100%-30px)] sm:w-[calc(100%-75px)] "
      : "h-9/10 w-full  border-2 border-gray-300"

  const handleSelectSlot: (slotInfo: {
    start: Date
    end: Date
  }) => void = useCallback(
    ({ start, end }) => {
      const title = ""
      const id = myCalendarEvents.length + 1

      setEventSelected({ id, start, end, title })
      setCreateEventIsActived(true)
      setEditEventIsOpen(true)
    },
    [
      myCalendarEvents,
      setCreateEventIsActived,
      setEventSelected,
      setEditEventIsOpen,
    ]
  )

  const handleSelectEvent: (event: Event) => void = useCallback(
    (event) => {
      const id = event.id
      const title = event.title
      const start = event.start
      const end = event.end

      setEventSelected({ id, start, end, title })
      setCreateEventIsActived(false)
      setEditEventIsOpen(true)
    },
    [setCreateEventIsActived, setEventSelected, setEditEventIsOpen]
  )

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  )

  return (
    <div className={`rounded-lg ${shadowIfCalendarPath}`}>
      <div className="h-full w-full">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myCalendarEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          dayPropGetter={(date) =>
            moment(date).format("YYYY MM DD") ===
            moment().format("YYYY MM DD")
              ? { className: "rbc-selected-day" }
              : {}
          }
        />
      </div>
    </div>
  )
}
