import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { useQueryClient } from "react-query"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import iconMore from "/src/assets/svg/icon_more.svg"

interface NoteCategory {
  id: number
  name: string
  color: string
}

export const AddNoteButton = () => {
  const {
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

  const queryClient = useQueryClient()
  const noteCategoriesQuery = queryClient.getQueryData<
    NoteCategory[]
  >(["notesCategories"])

  const getCategoryById = (categoryId: string) => {
    const category = noteCategoriesQuery?.find(
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

  const isHome = location.pathname === "/home"
  const buttonClassIfHome = isHome
    ? "w-full h-[68px] my-1 rounded-xl border-gray-300"
    : "h-52 w-[calc(20rem + 5px)] rounded-lg  border-transparent"
  const divClassIfHome = isHome ? "h-12" : "h-1/2 bg-zinc-300"
  const imgClassIfHome = isHome
    ? "filter-medium-gray"
    : "filter-light-gray "

  return (
    <button
      className={`flex items-center
      justify-center border-2 bg-myLightGray
      p-5 transition-colors ease-in-out
      hover:border-gray-400 active:bg-gray-300
      ${buttonClassIfHome}`}
      onClick={handleButtonClick}
    >
      <div
        className={`flex w-1/2 items-center
        justify-center rounded-lg ${divClassIfHome}`}
      >
        <img
          src={iconMore}
          alt=""
          className={`h-full ${imgClassIfHome}`}
        />
      </div>
    </button>
  )
}
