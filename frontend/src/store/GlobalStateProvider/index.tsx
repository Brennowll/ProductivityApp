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

interface UserNoteCategory {
  id: number
  name: string
  color: string
}

interface UserNote {
  id: number
  title: string
  description: string
  categoryId: number
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

  userNotesCategories: UserNoteCategory[]
  setUserNotesCategories: Dispatch<SetStateAction<UserNoteCategory[]>>
  notesCategorySelected: string
  setNotesCategorySelected: Dispatch<SetStateAction<string>>

  userNotes: UserNote[]
  setUserNotes: Dispatch<SetStateAction<UserNote[]>>
  editNoteIsOpen: boolean
  setEditNoteIsOpen: Dispatch<SetStateAction<boolean>>
  noteIdSelected: number
  setNoteIdSelected: Dispatch<SetStateAction<number>>

  editNoteDescriptionValue: string
  setEditNoteDescriptionValue: Dispatch<SetStateAction<string>>
  editNoteTitleValue: string
  setEditNoteTitleValue: Dispatch<SetStateAction<string>>
  editNoteCategoryId: number
  setEditNoteCategoryId: Dispatch<SetStateAction<number>>

  createNoteIsActive: boolean
  setCreateNoteIsActive: Dispatch<SetStateAction<boolean>>

  createCategoryIsOpen: boolean
  setCreateCategoryIsOpen: Dispatch<SetStateAction<boolean>>

  editNoteCategoryIsOpen: boolean
  setEditNoteCategoryIsOpen: Dispatch<SetStateAction<boolean>>

  createCategoryIsActive: boolean
  setCreateCategoryIsActive: Dispatch<SetStateAction<boolean>>
  categoryIdSelected: number
  setCategoryIdSelected: Dispatch<SetStateAction<number>>
  colorSelected: string
  setColorSelected: Dispatch<SetStateAction<string>>
  categoryNameValue: string
  setCategoryNameValue: Dispatch<SetStateAction<string>>
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
  const [userTasks, setUserTasks] = useState<UserTask[]>([])
  const [editTaskIsOpen, setEditTaskIsOpen] = useState<boolean>(false)
  const [taskIdSelected, setTaskIdSelected] = useState<number>(0)
  const [editTaskTextValue, setEditTaskTextValue] = useState<string>("")
  const [createTaskIsActive, setCreateTaskIsActive] = useState<boolean>(false)

  const [userNotesCategories, setUserNotesCategories] = useState<
    UserNoteCategory[]
  >([
    { id: 1, name: "family", color: "Red" },
    { id: 2, name: "work", color: "Green" },
  ])
  const [notesCategorySelected, setNotesCategorySelected] =
    useState<string>("all")

  const [userNotes, setUserNotes] = useState<UserNote[]>([
    { id: 1, title: "Titulo", description: "Description", categoryId: 1 },
    { id: 2, title: "Titulo", description: "Description", categoryId: 1 },
    { id: 3, title: "Titulo", description: "Description", categoryId: 1 },
    { id: 4, title: "Titulo", description: "Description", categoryId: 2 },
    { id: 5, title: "Titulo", description: "Description", categoryId: 2 },
    { id: 6, title: "Titulo", description: "Description", categoryId: 2 },
  ])
  const [editNoteIsOpen, setEditNoteIsOpen] = useState<boolean>(false)
  const [noteIdSelected, setNoteIdSelected] = useState<number>(0)

  const [editNoteTitleValue, setEditNoteTitleValue] = useState<string>("")
  const [editNoteDescriptionValue, setEditNoteDescriptionValue] =
    useState<string>("")
  const [editNoteCategoryId, setEditNoteCategoryId] = useState<number>(0)
  const [createNoteIsActive, setCreateNoteIsActive] = useState<boolean>(false)

  const [createCategoryIsOpen, setCreateCategoryIsOpen] =
    useState<boolean>(false)

  const [editNoteCategoryIsOpen, setEditNoteCategoryIsOpen] =
    useState<boolean>(false)

  const [createCategoryIsActive, setCreateCategoryIsActive] =
    useState<boolean>(false)
  const [categoryIdSelected, setCategoryIdSelected] = useState<number>(0)
  const [colorSelected, setColorSelected] = useState<string>("")
  const [categoryNameValue, setCategoryNameValue] = useState<string>("")

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

        userNotesCategories,
        setUserNotesCategories,
        notesCategorySelected,
        setNotesCategorySelected,

        userNotes,
        setUserNotes,
        editNoteIsOpen,
        setEditNoteIsOpen,
        noteIdSelected,
        setNoteIdSelected,
        editNoteTitleValue,
        setEditNoteTitleValue,
        editNoteDescriptionValue,
        setEditNoteDescriptionValue,
        editNoteCategoryId,
        setEditNoteCategoryId,
        createNoteIsActive,
        setCreateNoteIsActive,

        createCategoryIsOpen,
        setCreateCategoryIsOpen,

        editNoteCategoryIsOpen,
        setEditNoteCategoryIsOpen,

        createCategoryIsActive,
        setCreateCategoryIsActive,
        categoryIdSelected,
        setCategoryIdSelected,
        colorSelected,
        setColorSelected,
        categoryNameValue,
        setCategoryNameValue,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
