import { momentLocalizer } from "react-big-calendar"
import { ReactBigCalendar } from "../calendar/ReactBigCalendar"
import { Tasks } from "../tasks"
import { Notes } from "../notes"
import moment from "moment"

const localizer = momentLocalizer(moment)

export const Home = () => {
  return (
    <section
      className="grid h-[calc(100%-40px)] w-[calc(100%-100px)]
      grid-cols-4 grid-rows-1 gap-8"
    >
      <div
        className="col-start-1 flex items-center
        justify-center rounded-lg"
      >
        <Tasks />
      </div>
      <div
        className="col-start-2 flex items-center
        justify-center rounded-lg"
      >
        <Notes />
      </div>
      <div
        className="col-start-3 col-end-5 flex
        items-center justify-center"
      >
        <div className="h-full">
          <header className="mb-3 flex h-14 w-full items-center border-b-[1px] border-black">
            <h2
              className="font-nunitoRegular text-xl font-bold tracking-wider
                text-slate-900"
            >
              MY CALENDAR
            </h2>
          </header>
          <ReactBigCalendar localizer={localizer} />
        </div>
      </div>
    </section>
  )
}
