import React, { useContext } from "react"
import { GlobalStateContext } from "../../../../../store/GlobalStateProvider"
import { ColorButton } from "./ColorButton"
import iconSingleCheck from "/src/assets/svg/icon_single_check.svg"
import iconDelete from "/src/assets/svg/icon_delete.svg"

interface AddCategoryProps {
  setEditCategory: React.Dispatch<React.SetStateAction<boolean>>
}

interface Category {
  id: number
  name: string
  color: string
}

export const AddCategory = (props: AddCategoryProps) => {
  const context = useContext(GlobalStateContext)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setCategoryNameValue(event.target.value)
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
      key={color}
      color={color}
      active={color === context.colorSelected}
      setColorSelected={context.setColorSelected}
    />
  ))

  const searchCategory = (category: Category) => {
    return category.id === context.categoryIdSelected
  }

  const handleSaveButton = () => {
    const userNotesCategoriesCopy = [...context.userNotesCategories]
    if (context.createCategoryIsActive) {
      const newId = userNotesCategoriesCopy.length + 1
      userNotesCategoriesCopy.push({
        id: newId,
        name: context.categoryNameValue,
        color: context.colorSelected,
      })
    } else {
      const categoryIndex = userNotesCategoriesCopy.findIndex(searchCategory)
      if (categoryIndex !== -1) {
        userNotesCategoriesCopy[categoryIndex] = {
          ...userNotesCategoriesCopy[categoryIndex],
          name: context.categoryNameValue,
          color: context.colorSelected,
        }
      }
    }
    context.setUserNotesCategories(userNotesCategoriesCopy)
    props.setEditCategory(false)
  }

  const handleCancelButton = () => {
    context.setColorSelected("")
    context.setCategoryNameValue("")
    props.setEditCategory(false)
  }

  const handleDeleteButton = () => {
    const userNotesCategoriesCopy = [...context.userNotesCategories]
    const categoryIndex = userNotesCategoriesCopy.findIndex(
      (category) => category.id === context.categoryIdSelected
    )
    if (categoryIndex !== -1) {
      userNotesCategoriesCopy.splice(categoryIndex, 1)
      context.setUserNotesCategories(userNotesCategoriesCopy)
      props.setEditCategory(false)
    }
  }

  return (
    <div
      className={`flex h-20 w-full flex-col items-center justify-center ${
        context.createCategoryIsActive ? "border-b-2" : ""
      }`}
    >
      <div className="flex h-1/2 w-full flex-row items-center justify-center">
        <input
          type="text"
          className="h-6 w-[80%] rounded-md border-[1px] border-myBlack pl-2 focus:outline-none"
          value={context.categoryNameValue}
          onChange={handleInputChange}
        />
        <button
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myDarkGray pb-[2px] font-bold text-white hover:border-myBlack"
          onClick={handleCancelButton}
        >
          x
        </button>
        <button
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myRed hover:border-myBlack"
          onClick={handleDeleteButton}
        >
          <img src={iconDelete} alt="" className="filter-white h-4" />
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
