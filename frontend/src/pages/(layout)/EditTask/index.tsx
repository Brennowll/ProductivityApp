import { useContext } from "react"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"

export const EditTask = () => {
  const {
    userTasks,
    setUserTasks,
    taskIdSelected,
    setEditTaskIsOpen,
    editTaskTextValue,
    setEditTaskTextValue,
    createTaskIsActive,
  } = useContext(GlobalStateContext)

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditTaskTextValue(event.target.value)
  }

  interface UserTask {
    id: number
    taskText: string
  }

  const findTaskById = (
    taskId: number,
    tasks: UserTask[]
  ): UserTask | undefined => {
    return tasks.find((task) => task.id === taskId)
  }

  const updateTask = (
    taskId: number,
    newTaskText: string,
    tasks: UserTask[]
  ) => {
    const taskToUpdate = findTaskById(taskId, tasks)
    if (taskToUpdate) {
      taskToUpdate.taskText = newTaskText
    }
  }

  const saveTask = () => {
    const userTasksCopy = [...userTasks]

    if (createTaskIsActive) {
      const newId =
        userTasksCopy.length > 0
          ? userTasksCopy[userTasksCopy.length - 1].id + 1
          : 1
      userTasksCopy.push({
        id: newId,
        taskText: editTaskTextValue,
      })
    } else {
      updateTask(taskIdSelected, editTaskTextValue, userTasksCopy)
    }

    setUserTasks(userTasksCopy)
    setEditTaskIsOpen(false)
  }

  const cancelButtonText = "Cancel"
  const saveButtonText = createTaskIsActive ? "Create" : "Save"

  return (
    <EditLayout>
      <div
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
          py-4"
      >
        <textarea
          id="editCreateTaskTextArea"
          className="h-full w-full resize-none rounded-md border-2
          p-3 align-text-top font-nunitoRegular focus:outline-none"
          value={editTaskTextValue}
          onChange={handleTextAreaChange}
          placeholder="Put your task here.."
        />
        <div className="space flex h-16 w-full items-end justify-end">
          <button
            className="h-10 w-24 transform rounded-md bg-gray-400
            font-nunitoRegular text-white transition-all hover:scale-105
            active:scale-100"
            onClick={() => setEditTaskIsOpen(false)}
          >
            {cancelButtonText}
          </button>
          <button
            className="ml-3 h-10 w-24 transform rounded-md
            bg-myBlue font-nunitoRegular text-white transition-all
            hover:scale-105 active:scale-100"
            onClick={saveTask}
          >
            {saveButtonText}
          </button>
        </div>
      </div>
    </EditLayout>
  )
}
