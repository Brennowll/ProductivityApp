import { useContext } from "react"
import { GlobalStateContext } from "../../store/GlobalStateProvider"

interface NoteProps {
  id: number
  title: string
  description: string
  categoryId: number
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

  const getCategoryColorClass = (categoryId: number) => {
    const category = userNotesCategories.find(
      (category) => category.id === categoryId
    )
    return category ? `bg-my${category.color}` : "bg-myDarkGray"
  }

  return (
    <button
      className="w-[calc(20rem + 5px)] flex h-52 flex-col items-start rounded-lg 
      border-2 border-gray-300 bg-myLightGray p-5 shadow-lg
      transition-colors ease-in-out hover:border-gray-500 active:bg-gray-300"
      onClick={handleButtonClick}
    >
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
    </button>
  )
}
