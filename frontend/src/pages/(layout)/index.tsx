import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { GlobalStateContext } from "../../store/GlobalStateProvider"

import { SideMenuNav } from "./SideMenuNav"
import { SearchUserBar } from "./SearchUserBar"

import { Home } from "../home"
import { Tasks } from "../tasks"
import { Notes } from "../notes"
import { Calendar } from "../calendar"
import { Settings } from "../settings"

import { EditTask } from "./EditTask"

export const Layout = () => {
  const { editCreateTaskIsOpen } = useContext(GlobalStateContext)

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-myBgLightGray">
      {editCreateTaskIsOpen === true ? <EditTask /> : null}
      <div className="m-8 flex h-100-minus-4rem w-full flex-row items-center justify-center">
        <SideMenuNav />
        <div className="ml-4 flex h-full w-full flex-col">
          <SearchUserBar />
          <div className="flex h-full flex-col items-center justify-center overflow-y-auto rounded-xl bg-myBgWhite">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
