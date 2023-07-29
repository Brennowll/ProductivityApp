import { useState, useContext } from "react"
import { GlobalStateContext } from "../../../../store/GlobalStateProvider"
import { ColorButton } from "./ColorButton"
import iconSingleCheck from "/src/assets/svg/icon_single_check.svg"

export const AddCategory = () => {
  const {
    setCreateCategoryIsOpen,
    userNotesCategories,
    setUserNotesCategories,
  } = useContext(GlobalStateContext)

  const [colorSelected, setColorSelected] = useState<string>("")
  const [categoryNameValue, setCategoryNameValue] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNameValue(event.target.value)
  }

  const colors = [
    "Green",
    "Blue",
    "Orange",
    "Red",
    "Purple",
    "Yellow",
    "Pink",
    "Teal",
    "Zinc",
    "Brown",
  ]

  const colorButtonMap = colors.map((color) => (
    <ColorButton
      color={color}
      active={color === colorSelected ? true : false}
      setColorSelected={setColorSelected}
    />
  ))

  const handleSaveButton = () => {
    const userNotesCategoriesCopy = [...userNotesCategories]
    const newId = userNotesCategoriesCopy.length + 1
    userNotesCategoriesCopy.push({
      id: newId,
      name: categoryNameValue,
      color: colorSelected,
    })
    setUserNotesCategories(userNotesCategoriesCopy)
    setCreateCategoryIsOpen(false)
  }

  const handleCancelButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    setCreateCategoryIsOpen(false)
  }

  return (
    <div className="flex h-20 w-full flex-col items-center justify-center border-b-2">
      <div className="flex h-1/2 w-full flex-row items-center justify-center">
        <input
          type="text"
          className="h-6 w-[80%] rounded-md border-[1px] border-myBlack pl-2 focus:outline-none"
          onChange={handleInputChange}
        />
        <button
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myRed pb-1 font-bold text-white hover:border-myBlack"
          onClick={handleCancelButton}
        >
          x
        </button>
        <button
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myBlue hover:border-myBlack"
          onClick={handleSaveButton}
        >
          <img src={iconSingleCheck} alt="" className="filter-white h-5" />
        </button>
      </div>
      <div className="flex h-1/2 w-full flex-row ">{colorButtonMap}</div>
    </div>
  )
}
