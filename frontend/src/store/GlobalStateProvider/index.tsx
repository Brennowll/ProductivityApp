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
  navButtonActive: string
  setNavButtonActive: Dispatch<SetStateAction<string>>
  userTasks: UserTask[]
  setUserTasks: Dispatch<SetStateAction<UserTask[]>>
  editCreateTaskIsOpen: boolean
  setEditCreateTaskIsOpen: Dispatch<SetStateAction<boolean>>
  taskIdSelected: number
  setTaskIdSelected: Dispatch<SetStateAction<number>>
  editCreateTaskTextValue: string
  setEditCreateTaskTextValue: Dispatch<SetStateAction<string>>
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
  const [navButtonActive, setNavButtonActive] = useState<string>("HOME")
  const [userTasks, setUserTasks] = useState<UserTask[]>([
    { id: 1, taskText: "Task 1" },
    { id: 2, taskText: "Task 2" },
  ])
  const [editCreateTaskIsOpen, setEditCreateTaskIsOpen] =
    useState<boolean>(false)
  const [taskIdSelected, setTaskIdSelected] = useState<number>(0)
  const [editCreateTaskTextValue, setEditCreateTaskTextValue] =
    useState<string>("")
  const [createTaskIsActive, setCreateTaskIsActive] = useState<boolean>(false)

  return (
    <GlobalStateContext.Provider
      value={{
        navButtonActive,
        setNavButtonActive,
        userTasks,
        setUserTasks,
        editCreateTaskIsOpen,
        setEditCreateTaskIsOpen,
        taskIdSelected,
        setTaskIdSelected,
        editCreateTaskTextValue,
        setEditCreateTaskTextValue,
        createTaskIsActive,
        setCreateTaskIsActive,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
