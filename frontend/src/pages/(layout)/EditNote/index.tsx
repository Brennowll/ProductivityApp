import { useContext } from "react"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { EditLayout } from "../EditLayout"
import { EditNoteButton } from "./EditNoteButton"
import { CategoryButton } from "./CategoryButton"
import iconArrow from "/src/assets/svg/icon_arrow_down.svg"
import { AddCategory } from "./AddCategory"

interface UserNote {
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

export const EditNote = () => {
  const {
    userNotes,
    setUserNotes,
    noteIdSelected,
    setEditNoteIsOpen,
    editNoteTitleValue,
    setEditNoteTitleValue,
    editNoteDescriptionValue,
    setEditNoteDescriptionValue,
    editNoteCategoryId,
    createNoteIsActive,
    userNotesCategories,
    createCategoryIsOpen,
    setCreateCategoryIsOpen,
  } = useContext(GlobalStateContext)

  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditNoteTitleValue(event.target.value)
  }

  const handleDescriptionAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditNoteDescriptionValue(event.target.value)
  }

  const findNoteById = (
    noteId: number,
    notes: UserNote[]
  ): UserNote | undefined => {
    return notes.find((note) => note.id === noteId)
  }

  const updateNote = (
    noteId: number,
    newNoteTitle: string,
    newNoteDescription: string,
    newNoteCategoryId: number,
    notes: UserNote[]
  ) => {
    const noteToUpdate = findNoteById(noteId, notes)
    if (noteToUpdate) {
      noteToUpdate.title = newNoteTitle
      noteToUpdate.description = newNoteDescription
      noteToUpdate.categoryId = newNoteCategoryId
    }
  }

  const handleSaveButtonClick = () => {
    const userNotesCopy = [...userNotes]

    if (createNoteIsActive) {
      const newId =
        userNotesCopy.length > 0
          ? userNotesCopy[userNotesCopy.length - 1].id + 1
          : 1
      userNotesCopy.push({
        id: newId,
        title: editNoteTitleValue,
        description: editNoteDescriptionValue,
        categoryId: editNoteCategoryId,
      })
    } else {
      updateNote(
        noteIdSelected,
        editNoteTitleValue,
        editNoteDescriptionValue,
        editNoteCategoryId,
        userNotesCopy
      )
    }

    setUserNotes(userNotesCopy)
    setEditNoteIsOpen(false)
  }

  const handleShowCategoryOptions = () => {
    const categoryOptions = document.querySelector("#categoryOptions")
    categoryOptions?.classList.toggle("hidden")
  }

  const handleCancelButtonClick = () => {
    setEditNoteIsOpen(false)
  }

  const handleDeleteButtonClick = () => {
    const userNotesCopy = [...userNotes]
    for (
      let notePosition = 0;
      notePosition < userNotesCopy.length;
      notePosition++
    ) {
      if (userNotesCopy[notePosition].id === noteIdSelected) {
        userNotesCopy.splice(notePosition, 1)
        break
      }
    }
    setUserNotes(userNotesCopy)
  }

  const categoryButtonMap = userNotesCategories.map((category) => (
    <CategoryButton
      id={category.id}
      name={category.name}
      color={category.color}
    />
  ))

  const cancelButtonText = "Cancel"
  const saveButtonText = createNoteIsActive ? "Create" : "Save"

  const handleCreateCategoryButtonClick = () => {
    setCreateCategoryIsOpen(true)
  }

  const searchCategory = (category: UserNoteCategory) => {
    return category.id === editNoteCategoryId
  }

  const editNoteCategory = userNotesCategories.find(searchCategory)
  const editNoteCategoryColor = editNoteCategory
    ? "bg-my" + editNoteCategory?.color
    : "bg-myDarkGray"

  return (
    <EditLayout>
      <div
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
          py-4"
      >
        <input
          type="text"
          className="mb-1 h-8 w-full rounded-md border-2
            p-3 font-nunitoRegular focus:outline-none"
          value={editNoteTitleValue}
          onChange={handleTitleInputChange}
          placeholder="Put your title here.."
        />
        <textarea
          className="mb-1 h-full w-full resize-none rounded-md border-2
            p-3 align-text-top font-nunitoRegular
            focus:outline-none"
          value={editNoteDescriptionValue}
          onChange={handleDescriptionAreaChange}
          placeholder="Put your description here.."
        />
        <div
          className="relative mb-1 flex h-8 w-full flex-row items-center
            rounded-md border-2 bg-white"
        >
          <div
            className={`ml-2 h-3 w-3 rounded-full ${editNoteCategoryColor}`}
          ></div>
          <p className="h-full w-full pl-3 font-nunitoRegular">
            {editNoteCategory ? editNoteCategory.name : "Not selected"}
          </p>
          <button
            className="flex h-full w-10 items-center
              justify-center border-l-2 hover:bg-slate-100"
            onClick={handleShowCategoryOptions}
          >
            <img src={iconArrow} alt="" className="filter-gray h-6" />
          </button>
          <div
            id="categoryOptions"
            className="absolute top-[26px] z-50 hidden w-full flex-col border-2
              border-t-0 border-myGray bg-white last:border-b-0"
          >
            {categoryButtonMap}
            {createCategoryIsOpen ? <AddCategory /> : null}
            <button
              className="flex h-7 w-full items-center border-b-2 pl-2 
                font-nunitoRegular hover:bg-zinc-100"
              onClick={handleCreateCategoryButtonClick}
            >
              +
            </button>
          </div>
        </div>
        <div className="space flex h-16 w-full items-end justify-end">
          <EditNoteButton
            buttonText={cancelButtonText}
            onClick={handleCancelButtonClick}
            backgroundColor="bg-gray-400"
          />
          {createNoteIsActive === false ? (
            <EditNoteButton
              buttonText="Delete"
              onClick={handleDeleteButtonClick}
              backgroundColor="bg-red-500"
            />
          ) : null}
          <EditNoteButton
            buttonText={saveButtonText}
            onClick={handleSaveButtonClick}
            backgroundColor="bg-myBlue"
          />
        </div>
      </div>
    </EditLayout>
  )
}
