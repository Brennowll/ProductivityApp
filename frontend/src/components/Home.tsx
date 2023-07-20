import { useContext, useEffect } from "react"
import { StateGlobalContext } from "./StateGlobalProvider"

import LeftNavBar from "./home_components/LeftNavBar"
import TopBar from "./home_components/TopBar"
import MainTasks from "./tasks_components/MainTasks"
import MainNotes from "./notes_components/MainNotes"
import MainCalendar from "./calendar_components/MainCalendar"
import MainSettings from "./settings_components/MainSettings"

import EditCreateTask from "./tasks_components/EditCreateTask"

const Home = () => {
  const { navButtonActive, editCreateTaskIsOpen } =
    useContext(StateGlobalContext)

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-myBgLightGray">
      {editCreateTaskIsOpen === true ? <EditCreateTask /> : null}
      <div className="m-8 flex h-100-minus-4rem w-full flex-row items-center justify-center">
        <LeftNavBar />
        <div className="ml-4 flex h-full w-full flex-col">
          <TopBar />
          <div className="flex h-full flex-col items-center justify-center rounded-xl bg-myBgWhite">
            {navButtonActive === "TASKS" ? <MainTasks /> : null}
            {navButtonActive === "NOTES" ? <MainNotes /> : null}
            {navButtonActive === "CALENDAR" ? <MainCalendar /> : null}
            {navButtonActive === "SETTINGS" ? <MainSettings /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
