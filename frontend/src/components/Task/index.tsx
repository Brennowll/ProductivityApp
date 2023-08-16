import { useContext } from "react"

import { GlobalStateContext } from "../../store/GlobalStateProvider"
import iconCheck from "/src/assets/svg/icon_check.svg"
import iconThreeDots from "/src/assets/svg/icon_three_dots.svg"
import { useLocation } from "react-router-dom"

interface SingleTaskProps {
  taskId: number
  taskText: string
}

export const Task = (props: SingleTaskProps) => {
  const {
    userTasks,
    setUserTasks,
    setEditTaskIsOpen,
    setTaskIdSelected,
    setEditTaskTextValue,
    setCreateTaskIsActive,
  } = useContext(GlobalStateContext)

  const handleShowTaskOptions = () => {
    const taskOptions = document.getElementById(specificTaskOptionsId)
    taskOptions?.classList.toggle("hidden")
  }

  const handleDeleteTask = () => {
    const userTasksCopy = [...userTasks]
    for (
      let taskNumber = 0;
      taskNumber < userTasksCopy.length;
      taskNumber++
    ) {
      if (userTasksCopy[taskNumber].id === props.taskId) {
        userTasksCopy.splice(taskNumber, 1)
        break
      }
    }
    setUserTasks(userTasksCopy)
  }

  const handleEditTask = () => {
    setEditTaskTextValue(props.taskText)
    setTaskIdSelected(props.taskId)
    setCreateTaskIsActive(false)
    setEditTaskIsOpen(true)
  }

  const specificTaskOptionsId = `taskOptions${props.taskId}`

  const location = useLocation()
  const isHome = location.pathname === "/home"
  const containerClassIfHome = isHome
    ? "my-1 border-2 border-gray-300"
    : "my-2 shadow-md"

  const buttonCheckClassIfHome = isHome
    ? "my-4 mx-2 sm:mx-2 2xl:mx-5"
    : "m-4"
  const optionsClassIfHome = isHome ? "mx-2 sm:mx-2 2xl:mx-5" : "mx-5"

  return (
    <div
      className={`flex h-auto min-h-16 w-full flex-row items-start
        rounded-xl bg-myBgLightGray ${containerClassIfHome}`}
    >
      <button
        className={`h-8 w-5 shrink-0 rounded-full active:pt-1 2xl:h-8 2xl:w-6
        ${buttonCheckClassIfHome}`}
        onClick={handleDeleteTask}
      >
        <img
          src={iconCheck}
          alt=""
          className="filter-orange hover:filter-green h-6 transition-all
          duration-700 ease-in-out"
        />
      </button>

      <div className="flex h-auto min-h-16 w-full items-center py-2">
        <p
          className="line-clamp-4 break-all text-left
        font-nunitoRegular text-base text-slate-900"
        >
          {props.taskText}
        </p>
      </div>

      <div className="relative">
        <button
          className={`my-5 h-6 w-6 rounded-md active:bg-zinc-300
          ${optionsClassIfHome}`}
        >
          <img
            src={iconThreeDots}
            alt=""
            className="filter-gray h-6 rounded border-2 border-transparent
            transition-colors ease-in-out hover:border-gray-300
            "
            onClick={handleShowTaskOptions}
          />
        </button>
        <div
          id={specificTaskOptionsId}
          className="absolute -top-2 right-3/4 hidden h-20 w-32
          rounded-md border-2 border-myDarkGray bg-myBgWhite"
        >
          <button
            className="group flex h-1/2 w-full items-center 
            rounded-t-md border-b-2 border-transparent px-4 transition-all
            hover:border-myBlue hover:bg-zinc-100"
            onClick={handleEditTask}
          >
            <p
              className="pt-1 font-nunitoRegular transition-all
            group-hover:text-myBlue"
            >
              Edit
            </p>
          </button>
          <button
            className="group flex h-1/2 w-full items-center rounded-b-md
            border-t-2 border-transparent px-4 transition-all
            hover:border-red-500 hover:bg-zinc-100"
            onClick={handleDeleteTask}
          >
            <p
              className="pb-1 font-nunitoRegular
            transition-all group-hover:text-red-500"
            >
              Delete
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
