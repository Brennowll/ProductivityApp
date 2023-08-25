import { useContext } from "react"
import { useMutation, useQuery } from "react-query"
import { Route, Routes, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

import { api } from "../../store/QueryClient"
import { GlobalStateContext } from "../../store/GlobalStateProvider"
import { EditTask } from "./EditTask"
import { EditNote } from "./EditNote"
import { EditNoteCategory } from "./EditNoteCategory"
import { EditEvent } from "./EditEvent"
import { SideMenuNav } from "./SideMenuNav"
import { SearchUserBar } from "./SearchUserBar"

import { Login } from "../login"
import { Home } from "../home"
import { Tasks } from "../tasks"
import { Notes } from "../notes"
import { Calendar } from "../calendar"
import { Settings } from "../settings"
import { LoadingSpinner } from "../../components/LoadingSpinner"

export const Layout = () => {
  const refreshTokenMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const response = await api.post("/token/refresh/", {
        refresh: refreshToken,
      })

      return response.data
    },
    onSuccess: (data) => {
      Cookies.remove("access_token")
      Cookies.set("access_token", data.access)
      tokenValidationQuery.refetch()
    },
    onError: () => {
      Cookies.remove("access_token")
      Cookies.remove("refresh_token")
    },
  })

  const tokenValidationQuery = useQuery({
    queryKey: ["tokenValidation"],
    queryFn: async () => {
      const token = Cookies.get("access_token")

      if (!token) {
        return Promise.reject(new Error("Token not found"))
      }

      const response = await api.get("/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: (data) => {
      setUserData(data[0])
      setUserIsLogged(true)
    },
    onError: () => {
      const refreshToken = Cookies.get("refresh_token")
      if (refreshToken) {
        refreshTokenMutation.mutate(refreshToken)
        return
      }

      setUserIsLogged(false)
    },
  })

  const {
    userIsLogged,
    editTaskIsOpen,
    editNoteIsOpen,
    editNoteCategoryIsOpen,
    editEventIsOpen,
    setUserData,
    setUserIsLogged,
  } = useContext(GlobalStateContext)

  if (userIsLogged === null) {
    return (
      <span className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </span>
    )
  }

  return userIsLogged === false ? (
    <Routes>
      <Route path="/*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  ) : (
    <div className="relative flex h-screen w-screen items-center justify-center bg-myBgLightGray">
      {editTaskIsOpen ? <EditTask /> : null}
      {editNoteIsOpen ? <EditNote /> : null}
      {editNoteCategoryIsOpen ? <EditNoteCategory /> : null}
      {editEventIsOpen ? <EditEvent /> : null}
      <div className="m-2 flex h-100-minus-1rem w-full flex-row items-center justify-center gap-4 sm:m-8 sm:h-100-minus-4rem">
        <SideMenuNav />
        <div className="flex h-full w-full flex-col gap-2 sm:gap-4">
          <SearchUserBar />
          <div className="flex h-full flex-col items-center justify-center overflow-y-auto rounded-xl bg-myBgWhite">
            <Routes>
              <Route path="/*" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route
                path="/notes"
                element={<Navigate to="/notes/all" />}
              />
              <Route path="/notes/*" element={<Notes />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
