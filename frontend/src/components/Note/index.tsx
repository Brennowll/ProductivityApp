import { useContext } from "react"
import { GlobalStateContext } from "../../store/GlobalStateProvider"
import { useLocation } from "react-router-dom"
import { useQueryClient } from "react-query"

interface NoteProps {
  id: number
  title: string
  description: string
  categoryId: number
}

interface NoteCategory {
  id: number
  name: string
  color: string
}

export const Note = (props: NoteProps) => {
  const {
    setNoteIdSelected,
    setEditNoteTitleValue,
    setEditNoteDescriptionValue,
    setEditNoteCategoryId,
    setEditNoteIsOpen,
    setCreateNoteIsActive,
  } = useContext(GlobalStateContext)

  const handleButtonClick = () => {
    setCreateNoteIsActive(false)
    setNoteIdSelected(props.id)
    setEditNoteTitleValue(props.title)
    setEditNoteDescriptionValue(props.description)
    setEditNoteCategoryId(props.categoryId)
    setEditNoteIsOpen(true)
  }

  const queryClient = useQueryClient()
  const notesCategories = queryClient.getQueryData<NoteCategory[]>([
    "notesCategories",
  ])

  const getCategoryColorClass = (categoryId: number) => {
    const category = notesCategories?.find(
      (category) => category.id === categoryId
    )
    return category ? `bg-my${category.color}` : "bg-myDarkGray"
  }

  const location = useLocation()
  const isHome = location.pathname === "/home"
  const buttonClassIfHome = isHome
    ? "my-1 h-[68px] border-gray-300 rounded-xl hover:border-gray-400"
    : "shadow-md h-52 rounded-lg border-transparent hover:border-gray-400"

  return (
    <button
      className={`w-[calc(20rem + 5px)] flex flex-col items-start 
      rounded-lg border-2 bg-myLightGray p-5 
      transition-colors ease-in-out active:bg-gray-300
      ${buttonClassIfHome}`}
      onClick={handleButtonClick}
    >
      {isHome ? (
        <div className="flex h-9 w-full flex-row items-center">
          <div
            className={`mr-3 h-4 w-4 flex-shrink-0 rounded-full
                ${getCategoryColorClass(props.categoryId)}`}
          ></div>
          <h3
            className="line-clamp-1 text-start font-nunitoRegular text-base
            tracking-wide text-slate-900"
          >
            {props.title}
          </h3>
        </div>
      ) : (
        <>
          <div className="flex h-9 w-full flex-row items-center">
            <div
              className={`mr-3 h-4 w-4 flex-shrink-0 rounded-full 
          ${getCategoryColorClass(props.categoryId)}`}
            ></div>
            <h3
              className="line-clamp-1 pt-1 text-start font-nunitoRegular text-xl
          font-semibold tracking-wide text-slate-900"
            >
              {props.title}
            </h3>
          </div>
          <p
            className="line-clamp-5 h-[120px] w-full text-left font-nunitoRegular
        text-base text-slate-700"
          >
            {props.description}
          </p>
        </>
      )}
    </button>
  )
}
