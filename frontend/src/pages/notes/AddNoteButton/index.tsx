import { useContext } from "react"
import { useLocation } from "react-router-dom"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import iconMore from "/src/assets/svg/icon_more.svg"

interface UserNoteCategory {
  id: number
  name: string
  color: string
}

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

  const searchCategoryByName = (category: UserNoteCategory) => {
    return category.name === categoryPathName
  }
  const category = userNotesCategories.find(searchCategoryByName)
  const categoryIdValue = category ? category.id : 0

  const handleButtonClick = () => {
    setEditNoteTitleValue("")
    setEditNoteDescriptionValue("")
    setEditNoteCategoryId(categoryIdValue)
    setCreateNoteIsActive(true)
    setEditNoteIsOpen(true)
  }

  return (
    <button
      className="flex h-52 w-52 items-center justify-center rounded-lg border-2 
      border-transparent bg-myLightGray p-5 hover:border-myBlue active:bg-gray-300"
      onClick={handleButtonClick}
    >
      <div className="h-1/2 w-1/2 items-center justify-center rounded-lg bg-myGray">
        <img src={iconMore} alt="" className="filter-light-gray h-full" />
      </div>
    </button>
  )
}
