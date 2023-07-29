import { useContext } from "react"
import { GlobalStateContext } from "../../../store/GlobalStateProvider"
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

  const handleAddTaskButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    setCreateCategoryIsActive(true)
  }

  return (
    <div
      className="absolute right-0 top-0 z-50 flex h-screen w-screen
        items-center justify-center bg-black bg-opacity-40"
    >
      <div className="relative flex h-96 w-1/3 items-center bg-myLightGray opacity-100">
        <div className="absolute -left-4 h-9/10 w-[2px] bg-myLightGray"></div>
        <div className="absolute -right-4 h-9/10 w-[2px] bg-myLightGray"></div>
        <div className="mx-4 flex h-full w-full flex-col py-4">
          <div className="flex h-full w-full flex-col">
            <h2 className="pl-5 font-nunitoRegular font-semibold">
              CATEGORIES
            </h2>
            <span className="mb-2 h-[1px] w-[95%] self-center bg-myBlack"></span>
            {categoryMap}
            <div className="h-fit min-h-[20px] w-[90%] self-center">
              {createCategoryIsActive ? (
                <AddCategory setEditCategory={setCreateCategoryIsActive} />
              ) : (
                <button
                  className="flex h-fit w-full items-center
                  justify-between self-center border-b-2 py-1 pl-2 font-nunitoRegular"
                  onClick={handleAddTaskButton}
                >
                  +
                </button>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              className={`self mx-1 h-10 w-24 transform
              rounded-md bg-myDarkGray font-nunitoRegular text-white
              transition-all hover:scale-105 active:scale-100`}
              onClick={handleCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
