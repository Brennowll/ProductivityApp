import { useContext } from "react"
import { StateGlobalContext } from "../StateGlobalProvider"

import iconCheck from "/src/assets/svg/icon_check.svg"
import iconThreeDots from "/src/assets/svg/icon_three_dots.svg"

interface SingleTaskProps {
  taskId: number
  taskText: string
}

const SingleTask = (props: SingleTaskProps) => {
  const {
    userTasks,
    setUserTasks,
    setEditCreateTaskIsOpen,
    setTaskIdSelected,
    setEditCreateTaskTextValue,
    setCreateTaskIsActive,
  } = useContext(StateGlobalContext)
  const specificTaskOptionsId = `taskOptions${props.taskId}`

  const handleShowTaskOptions = () => {
    const taskOptions = document.getElementById(specificTaskOptionsId)
    taskOptions?.classList.toggle("hidden")
  }

  const handleDeleteTask = () => {
    const userTasksCopy = [...userTasks]
    for (let taskNumber = 0; taskNumber < userTasksCopy.length; taskNumber++) {
      if (userTasksCopy[taskNumber].id === props.taskId) {
        userTasksCopy.splice(taskNumber, 1)
        break
      }
    }
    setUserTasks(userTasksCopy)
  }

  const handleEditTask = () => {
    setCreateTaskIsActive(false)
    setEditCreateTaskTextValue(props.taskText)
    setEditCreateTaskIsOpen(true)
    setTaskIdSelected(props.taskId)
  }

  return (
    <div
      className="relative my-1 flex h-auto min-h-16 w-full flex-row items-start
        rounded-xl bg-myBgLightGray"
    >
      <button
        className="m-4 h-8 w-8 rounded-full active:pt-1"
        onClick={handleDeleteTask}
      >
        <img
          src={iconCheck}
          alt=""
          className="filter-gray bg hover:filter-green h-6"
        />
      </button>
      <div className="flex h-auto min-h-16 w-full items-center py-2 font-nunitoRegular">
        <p>{props.taskText}</p>
      </div>
      <div className="relative">
        <button className="mx-4 my-5 h-6 w-7">
          <img
            src={iconThreeDots}
            alt=""
            className="filter-gray active:filter-blue h-6 rounded border-2
                border-transparent hover:border-myDarkGray"
            onClick={handleShowTaskOptions}
          />
        </button>
        <div
          id={specificTaskOptionsId}
          className="absolute -top-2 right-3/4 hidden h-20 w-32
                rounded-sm border-2 border-myDarkGray bg-myBgWhite"
        >
          <button
            className="group flex h-1/2 w-full items-center px-4 
              transition-all hover:bg-slate-100"
            onClick={handleEditTask}
          >
            <p className="font-nunitoRegular transition-all group-hover:text-myBlue ">
              Edit
            </p>
          </button>
          <button
            className="group flex h-1/2 w-full items-center px-4 
              transition-all hover:bg-slate-100"
            onClick={handleDeleteTask}
          >
            <p className="font-nunitoRegular transition-all group-hover:text-red-500">
              Delete
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleTask
