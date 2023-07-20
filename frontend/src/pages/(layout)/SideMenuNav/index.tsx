import { NavButton } from "./NavButton"

import iconLogo from "/src/assets/svg/icon_naruto_logo.svg"
import iconHome from "/src/assets/svg/icon_home.svg"
import iconTasks from "/src/assets/svg/icon_tasks.svg"
import iconNote from "/src/assets/svg/icon_note.svg"
import iconCalendar from "/src/assets/svg/icon_calendar.svg"
import iconSettings from "/src/assets/svg/icon_settings.svg"

export const SideMenuNav = () => {
  return (
    <div className="flex h-full w-1/4 max-w-250px flex-col justify-between rounded-xl bg-myBgWhite">
      <div className="flex h-1/2 w-full flex-col items-center justify-start rounded-t-xl">
        <figure className="my-8">
          <img src={iconLogo} alt="" className="h-12" />
        </figure>
        <nav className="w-full">
          <NavButton buttonName="HOME" text="HOME" imgSrc={iconHome} />
          <NavButton buttonName="TASKS" text="TASKS" imgSrc={iconTasks} />
          <NavButton buttonName="NOTES" text="NOTES" imgSrc={iconNote} />
          <NavButton
            buttonName="CALENDAR"
            text="CALENDAR"
            imgSrc={iconCalendar}
          />
        </nav>
      </div>
      <div className="flex h-1/6 items-center justify-center rounded-b-2xl">
        <NavButton
          buttonName="SETTINGS"
          text="SETTINGS"
          imgSrc={iconSettings}
        />
      </div>
    </div>
  )
}
