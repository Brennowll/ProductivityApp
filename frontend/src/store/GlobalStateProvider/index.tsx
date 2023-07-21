import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"

interface UserTask {
  id: number
  taskText: string
}

interface GlobalStateContextType {
  userTasks: UserTask[]
  setUserTasks: Dispatch<SetStateAction<UserTask[]>>
  editTaskIsOpen: boolean
  setEditTaskIsOpen: Dispatch<SetStateAction<boolean>>
  taskIdSelected: number
  setTaskIdSelected: Dispatch<SetStateAction<number>>
  editTaskTextValue: string
  setEditTaskTextValue: Dispatch<SetStateAction<string>>
  createTaskIsActive: boolean
  setCreateTaskIsActive: Dispatch<SetStateAction<boolean>>
}

export const GlobalStateContext = createContext<GlobalStateContextType>(
  {} as GlobalStateContextType
)

interface GlobalStateProviderProps {
  children: ReactNode
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}: GlobalStateProviderProps) => {
  const [userTasks, setUserTasks] = useState<UserTask[]>([
    { id: 1, taskText: "Task 1" },
    { id: 2, taskText: "Task 2" },
  ])
  const [editTaskIsOpen, setEditTaskIsOpen] = useState<boolean>(false)
  const [taskIdSelected, setTaskIdSelected] = useState<number>(0)
  const [editTaskTextValue, setEditTaskTextValue] = useState<string>("")
  const [createTaskIsActive, setCreateTaskIsActive] = useState<boolean>(false)

  return (
    <GlobalStateContext.Provider
      value={{
        userTasks,
        setUserTasks,
        editTaskIsOpen,
        setEditTaskIsOpen,
        taskIdSelected,
        setTaskIdSelected,
        editTaskTextValue,
        setEditTaskTextValue,
        createTaskIsActive,
        setCreateTaskIsActive,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
