import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../store/GlobalStateProvider"
import { Task } from "../../components/Task"
import iconAddTask from "/src/assets/svg/icon_add_task.svg"
import { api } from "../../store/QueryClient"
import { LoadingSpinner } from "../../components/LoadingSpinner"

interface TaskInterface {
  id: number
  taskText: string
}

export const Tasks = () => {
  const {
    setEditTaskIsOpen,
    setCreateTaskIsActive,
    setEditTaskTextValue,
  } = useContext(GlobalStateContext)

  const handleAddTaskClick = () => {
    setEditTaskTextValue("")
    setEditTaskIsOpen(true)
    setCreateTaskIsActive(true)
  }

  const { data: tasks, isFetching: isTasksFetching } = useQuery<
    TaskInterface[]
  >({
    queryKey: ["tasks"],
    queryFn: async () => {
      const token = Cookies.get("access_token")
      const response = await api.get("/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
  })

  const mapUserTasks = tasks?.map((task) => (
    <Task key={task.id} taskId={task.id} taskText={task.taskText} />
  ))

  const checkTaskExists =
    tasks && tasks.length > 0
      ? mapUserTasks
      : "YOU DONT'T HAVE ANY TASK"

  const location = useLocation()
  const isHome = location.pathname === "/home"
  const sectionClassIfHome = isHome
    ? "h-full w-full"
    : "h-[calc(100%-10px)] w-[calc(100%-40px)] lg:h-[calc(100%-40px)] lg:w-[calc(100%-100px)] sm:h-[calc(100%-30px)] sm:w-[calc(100%-75px)]"

  if (isTasksFetching) {
    return <LoadingSpinner />
  }

  return (
    <section
      className={`grid grid-cols-1 content-start ${sectionClassIfHome}`}
    >
      <header className="flex h-14 w-full items-center">
        <h2
          className="font-nunitoRegular text-xl font-bold tracking-wider
        text-slate-900"
        >
          MY TASKS
        </h2>
      </header>

      <div
        className="flex h-full w-full flex-col overflow-y-auto border-y-[1px]
      border-myBlack py-2 text-center font-nunitoRegular  text-myDarkGray "
      >
        {checkTaskExists}
      </div>

      <div className="pb-5">
        <button
          className="group mt-2 flex h-10 w-20 flex-row
          items-center justify-center rounded-md border-2
          border-myOrange bg-zinc-100 transition-all
          duration-300 ease-in-out hover:h-11 hover:w-[90px]
          hover:border-transparent hover:bg-myOrange"
          onClick={handleAddTaskClick}
        >
          <img
            src={iconAddTask}
            alt=""
            className="filter-orange group-hover:filter-white h-5"
          />
        </button>
      </div>
    </section>
  )
}
