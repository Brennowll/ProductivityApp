import { useContext, useState } from "react"

import { GlobalStateContext } from "../../../../store/GlobalStateProvider"
import { AddCategory } from "./AddCategory"
import iconPenEdit from "/src/assets/svg/icon_pen_edit.svg"

interface CategoryProps {
  id: number
  name: string
  color: string
}

export const Category = (props: CategoryProps) => {
  const {
    setCreateCategoryIsActive,
    setCategoryIdSelected,
    setColorSelected,
    setCategoryNameValue,
  } = useContext(GlobalStateContext)

  const [editCategory, setEditCategory] = useState<boolean>(false)

  const handleEditButtonClick = () => {
    setCreateCategoryIsActive(false)
    setCategoryIdSelected(props.id)
    setCategoryNameValue(props.name)
    setColorSelected(props.color)
    setEditCategory(true)
  }

  const categoryColor = "bg-my" + props.color

  return (
    <div
      className="flex h-fit min-h-[20px] w-[90%] items-center justify-between self-center 
      border-b-2 py-1 pl-2 font-nunitoRegular"
    >
      {editCategory ? (
        <AddCategory setEditCategory={setEditCategory} />
      ) : (
        <>
          <div className="flex flex-row items-center">
            <div className={`h-4 w-4 rounded-full ${categoryColor}`}></div>
            <p className="pl-2 font-nunitoRegular">{props.name}</p>
          </div>
          <button
            className="mr-2 flex h-7 w-7 items-center justify-center
            rounded-md border-2 border-transparent transition-colors
            ease-in-out hover:border-myDarkGray hover:bg-myBgGray"
            onClick={handleEditButtonClick}
          >
            <img src={iconPenEdit} alt="" className="filter-gray h-5" />
          </button>
        </>
      )}
    </div>
  )
}
