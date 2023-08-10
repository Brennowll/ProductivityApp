import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import iconMore from "/src/assets/svg/icon_more.svg"

export const AddNoteButton = () => {
  const {
    userNotesCategories,
    setEditNoteTitleValue,
    setEditNoteDescriptionValue,
    setEditNoteCategoryId,
    setCreateNoteIsActive,
    setEditNoteIsOpen,
  } = useContext(GlobalStateContext)

  const location = useLocation()
  const locationPaths = location.pathname.split("/")
  const categoryPathName =
    locationPaths[2] === "all" ? "Not Selected" : locationPaths[2]

  const getCategoryById = (categoryId: string) => {
    const category = userNotesCategories.find(
      (category) => category.name === categoryId
    )
    return category ? category.id : 0
  }

  const categoryIdValue = getCategoryById(categoryPathName)

  const handleButtonClick = () => {
    setEditNoteTitleValue("")
    setEditNoteDescriptionValue("")
    setEditNoteCategoryId(categoryIdValue)
    setCreateNoteIsActive(true)
    setEditNoteIsOpen(true)
  }

  return (
    <button
      className="flex h-52 w-80 items-center justify-center
      rounded-lg border-2 border-transparent bg-myLightGray
      p-5 transition-colors ease-in-out
      hover:border-slate-500 active:bg-gray-300 "
      onClick={handleButtonClick}
    >
      <div
        className="flex h-1/2 w-1/2 items-center justify-center
        rounded-lg bg-zinc-300"
      >
        <img src={iconMore} alt="" className="filter-light-gray h-full" />
      </div>
    </button>
  )
}
