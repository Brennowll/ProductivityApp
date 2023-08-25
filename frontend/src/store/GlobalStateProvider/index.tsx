import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"

interface UserData {
  username: string
  email: string
}

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

interface CalendarEvent {
  id: number
  start: Date
  end: Date
  title: string
}

interface GlobalStateContextType {
  userIsLogged: boolean | null
  setUserIsLogged: Dispatch<SetStateAction<boolean | null>>
  userData: UserData | null
  setUserData: Dispatch<SetStateAction<UserData | null>>

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

  myCalendarEvents: CalendarEvent[]
  setMyCalendarEvents: Dispatch<SetStateAction<CalendarEvent[]>>
  eventSelected: CalendarEvent
  setEventSelected: Dispatch<SetStateAction<CalendarEvent>>
  editEventIsOpen: boolean
  setEditEventIsOpen: Dispatch<SetStateAction<boolean>>
  createEventIsActived: boolean
  setCreateEventIsActived: Dispatch<SetStateAction<boolean>>
}

export const GlobalStateContext =
  createContext<GlobalStateContextType>({} as GlobalStateContextType)

interface GlobalStateProviderProps {
  children: ReactNode
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}: GlobalStateProviderProps) => {
  const [userIsLogged, setUserIsLogged] = useState<boolean | null>(
    null
  )
  const [userData, setUserData] = useState<UserData | null>(null)

  const [userTasks, setUserTasks] = useState<UserTask[]>([])
  const [editTaskIsOpen, setEditTaskIsOpen] = useState<boolean>(false)
  const [taskIdSelected, setTaskIdSelected] = useState<number>(0)
  const [editTaskTextValue, setEditTaskTextValue] =
    useState<string>("")
  const [createTaskIsActive, setCreateTaskIsActive] =
    useState<boolean>(false)

  const [userNotesCategories, setUserNotesCategories] = useState<
    UserNoteCategory[]
  >([])
  const [notesCategorySelected, setNotesCategorySelected] =
    useState<string>("all")

  const [userNotes, setUserNotes] = useState<UserNote[]>([])
  const [editNoteIsOpen, setEditNoteIsOpen] = useState<boolean>(false)
  const [noteIdSelected, setNoteIdSelected] = useState<number>(0)

  const [editNoteTitleValue, setEditNoteTitleValue] =
    useState<string>("")
  const [editNoteDescriptionValue, setEditNoteDescriptionValue] =
    useState<string>("")
  const [editNoteCategoryId, setEditNoteCategoryId] =
    useState<number>(0)
  const [createNoteIsActive, setCreateNoteIsActive] =
    useState<boolean>(false)

  const [createCategoryIsOpen, setCreateCategoryIsOpen] =
    useState<boolean>(false)

  const [editNoteCategoryIsOpen, setEditNoteCategoryIsOpen] =
    useState<boolean>(false)

  const [createCategoryIsActive, setCreateCategoryIsActive] =
    useState<boolean>(false)
  const [categoryIdSelected, setCategoryIdSelected] =
    useState<number>(0)
  const [colorSelected, setColorSelected] = useState<string>("")
  const [categoryNameValue, setCategoryNameValue] =
    useState<string>("")

  const [myCalendarEvents, setMyCalendarEvents] = useState<
    CalendarEvent[]
  >([])
  const [eventSelected, setEventSelected] = useState<CalendarEvent>({
    id: 0,
    start: new Date(),
    end: new Date(),
    title: "",
  })
  const [editEventIsOpen, setEditEventIsOpen] =
    useState<boolean>(false)
  const [createEventIsActived, setCreateEventIsActived] =
    useState<boolean>(false)

  return (
    <GlobalStateContext.Provider
      value={{
        userIsLogged,
        setUserIsLogged,
        userData,
        setUserData,

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

        myCalendarEvents,
        setMyCalendarEvents,
        eventSelected,
        setEventSelected,
        editEventIsOpen,
        setEditEventIsOpen,
        createEventIsActived,
        setCreateEventIsActived,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
