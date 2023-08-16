import { NavButton } from "./NavButton"

import iconLogo from "/src/assets/svg/icon_logo.svg"
import iconHome from "/src/assets/svg/icon_home.svg"
import iconTasks from "/src/assets/svg/icon_tasks.svg"
import iconNote from "/src/assets/svg/icon_note.svg"
import iconCalendar from "/src/assets/svg/icon_calendar.svg"
import iconSettings from "/src/assets/svg/icon_settings.svg"

export const SideMenuNav = () => {
  return (
    <div
      id="side-nav-container"
      className="z-50 mt-14 hidden h-9/10 w-[calc(100%-32px)] flex-col justify-between
      rounded-xl bg-myBgWhite sm:z-0 sm:m-0
      sm:flex sm:h-full sm:min-w-0 sm:max-w-[6rem] lg:max-w-250px"
    >
      <div className="flex h-1/2 w-full flex-col items-center justify-start rounded-t-xl">
        <figure className="my-8 self-center">
          <img src={iconLogo} alt="" className="filter-orange h-12" />
        </figure>
        <nav className="w-full">
          <NavButton
            buttonName="home"
            href="/home"
            imgSrc={iconHome}
          />
          <NavButton
            buttonName="tasks"
            href="/tasks"
            imgSrc={iconTasks}
          />
          <NavButton
            buttonName="notes"
            href="/notes"
            imgSrc={iconNote}
          />
          <NavButton
            buttonName="calendar"
            href="/calendar"
            imgSrc={iconCalendar}
          />
        </nav>
      </div>
      <div className="flex h-1/6 items-center justify-center rounded-b-2xl">
        <NavButton
          buttonName="SETTINGS"
          href="/settings"
          imgSrc={iconSettings}
        />
      </div>
    </div>
  )
}
