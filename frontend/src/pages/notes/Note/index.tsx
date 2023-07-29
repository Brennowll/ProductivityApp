import { useContext } from "react"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"

interface NoteProps {
  id: number
  title: string
  description: string
  categoryId: number
}

interface UserNoteCategory {
  id: number
  name: string
  color: string
}

export const Note = (props: NoteProps) => {
  const {
    userNotesCategories,
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

  const searchCategoryColor = (category: UserNoteCategory) => {
    return category.id === props.categoryId
  }
  const category = userNotesCategories.find(searchCategoryColor)
  const categoryColorClass = category ? `bg-my${category.color}` : "bg-myBlue"

  return (
    <button
      className="h-52 w-52 rounded-lg border-2 border-transparent bg-myLightGray p-5 
      hover:border-myBlue active:bg-gray-300"
      onClick={handleButtonClick}
    >
      <div className="flex h-9 w-full flex-row items-center">
        <div
          className={`mr-3 h-4 w-4 flex-shrink-0 rounded-full ${categoryColorClass}`}
        ></div>
        <h3 className="line-clamp-1 pb-1 text-start text-2xl">{props.title}</h3>
      </div>
      <p className="h-full w-full text-left">{props.description}</p>
    </button>
  )
}
