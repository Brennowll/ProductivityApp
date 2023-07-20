import { useContext } from "react"
import { GlobalStateContext } from "../../store/GlobalStateProvider"

import { SideMenuNav } from "./SideMenuNav"
import { SearchUserBar } from "./SearchUserBar"
import { Tasks } from "../tasks"
import { Notes } from "../notes"
import { Calendar } from "../calendar"
import { Settings } from "../settings"

import { EditTask } from "../edit-task"

export const Layout = () => {
  const { navButtonActive, editCreateTaskIsOpen } =
    useContext(GlobalStateContext)

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-myBgLightGray">
      {editCreateTaskIsOpen === true ? <EditTask /> : null}
      <div className="m-8 flex h-100-minus-4rem w-full flex-row items-center justify-center">
        <SideMenuNav />
        <div className="ml-4 flex h-full w-full flex-col">
          <SearchUserBar />
          <div className="flex h-full flex-col items-center justify-center rounded-xl bg-myBgWhite">
            {navButtonActive === "TASKS" ? <Tasks /> : null}
            {navButtonActive === "NOTES" ? <Notes /> : null}
            {navButtonActive === "CALENDAR" ? <Calendar /> : null}
            {navButtonActive === "SETTINGS" ? <Settings /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
