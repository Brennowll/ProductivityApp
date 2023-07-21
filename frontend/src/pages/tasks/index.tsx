import { useContext } from "react"

import { SingleTask } from "./SingleTask"
import { GlobalStateContext } from "../../store/GlobalStateProvider"
import iconAddTask from "/src/assets/svg/icon_add_task.svg"

export const Tasks = () => {
  const {
    userTasks,
    setEditTaskIsOpen,
    setCreateTaskIsActive,
    setEditTaskTextValue,
  } = useContext(GlobalStateContext)

  const handleAddTaskClick = () => {
    setEditTaskTextValue("")
    setEditTaskIsOpen(true)
    setCreateTaskIsActive(true)
  }

  const addTaskButtonStyle =
    "relative ml-2 mt-2 flex w-28 flex-row before:absolute before:bottom-0 \
    before:left-1/2 before:h-1px before:w-0 before:-translate-x-1/2 \
    before:transform before:bg-myBlack before:transition-all before:duration-300 \
    before:ease-in-out hover:before:w-full"

  const mapUserTasks = userTasks.map((task) => (
    <SingleTask key={task.id} taskId={task.id} taskText={task.taskText} />
  ))

  const checkTaskExists =
    userTasks.length > 0 ? mapUserTasks : "You don't have any tasks"

  return (
    <section className="flex h-[calc(100%-40px)] w-[calc(100%-100px)] flex-col">
      <header className="flex h-14 w-full items-center">
        <h2 className="font-nunitoRegular font-bold">MY TASKS</h2>
      </header>

      <div
        className="text-myDarkGrayy flex h-auto w-full flex-col border-y-2
      border-myBlack py-2 text-center font-nunitoRegular"
      >
        {checkTaskExists}
      </div>

      <div className="pb-5">
        <button className={addTaskButtonStyle} onClick={handleAddTaskClick}>
          <img src={iconAddTask} alt="" className="h-6" />
          <p className="pl-2">Add Task</p>
        </button>
      </div>
    </section>
  )
}
