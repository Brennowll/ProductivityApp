import { useContext } from "react"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"
import { Category } from "./Category"
import { AddCategory } from "./Category/AddCategory"

export const EditNoteCategory = () => {
  const {
    userNotesCategories,
    setEditNoteCategoryIsOpen,
    setColorSelected,
    setCategoryNameValue,
    setCreateCategoryIsActive,
    createCategoryIsActive,
  } = useContext(GlobalStateContext)

  const categoryMap = userNotesCategories.map((noteCategory) => (
    <Category
      id={noteCategory.id}
      name={noteCategory.name}
      color={noteCategory.color}
    />
  ))

  const handleCloseButton = () => {
    setEditNoteCategoryIsOpen(false)
  }

  const handleAddCategoryButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    setCreateCategoryIsActive(true)
  }

  return (
    <EditLayout>
      <div className="z-50 mx-4 flex h-full w-full flex-col py-4">
        <div className="flex h-full w-full flex-col">
          <h2
            className="pl-5 font-nunitoRegular font-semibold
              tracking-wide"
          >
            CATEGORIES
          </h2>
          <span
            className="mb-2 mt-1 h-[1px] w-[95%] self-center
              bg-myBlack"
          ></span>
          {categoryMap}
          <div className="h-fit min-h-[20px] w-[95%] self-center">
            {createCategoryIsActive ? (
              <AddCategory setEditCategory={setCreateCategoryIsActive} />
            ) : (
              <button
                className="mt-1 flex h-fit w-full
                  items-center border-b-2 pb-1 pl-2
                  font-nunitoRegular"
                onClick={handleAddCategoryButton}
              >
                +
              </button>
            )}
          </div>
        </div>
        <div className="flex w-full justify-end">
          <button
            className={`mx-1 h-10 w-24 transform
              rounded-md bg-myDarkGray font-nunitoRegular text-white
              transition-all hover:scale-105 active:scale-100`}
            onClick={handleCloseButton}
          >
            Close
          </button>
        </div>
      </div>
    </EditLayout>
  )
}
