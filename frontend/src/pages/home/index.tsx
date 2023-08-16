import { momentLocalizer } from "react-big-calendar"
import { ReactBigCalendar } from "../calendar/ReactBigCalendar"
import { Tasks } from "../tasks"
import { Notes } from "../notes"
import moment from "moment"

const localizer = momentLocalizer(moment)

export const Home = () => {
  return (
    <section
      className="grid h-[calc(100%-10px)] w-[calc(100%-40px)]
      grid-cols-1 overflow-y-auto pr-3 sm:h-[calc(100%-30px)]
      sm:w-[calc(100%-60px)]
      sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:p-0 
      xl:h-[calc(100%-40px)] xl:w-[calc(100%-100px)] xl:gap-8"
    >
      <div
        className="col-span-1 clear-both flex
        min-h-[400px] items-center justify-center"
      >
        <Tasks />
      </div>
      <div
        className="col-span-1 clear-both flex
        min-h-[400px] items-center justify-center"
      >
        <Notes />
      </div>
      <div
        className="col-span-1 clear-both flex min-h-[600px]
        items-center justify-center overflow-x-clip
        sm:col-span-2"
      >
        <div className="h-full w-full">
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
