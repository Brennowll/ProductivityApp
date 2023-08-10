import { useContext } from "react"
import { useLocation } from "react-router-dom"

import { GlobalStateContext } from "../../store/GlobalStateProvider"
import { NotesNavButton } from "./NotesNavButton"
import { Note } from "../../components/Note"
import { AddNoteButton } from "./AddNoteButton"
import iconThreeDots from "/src/assets/svg/icon_three_dots.svg"

export const Notes = () => {
  const { userNotesCategories, userNotes, setEditNoteCategoryIsOpen } =
    useContext(GlobalStateContext)

  const notesNavButtonsMap = userNotesCategories.map((category) => (
    <NotesNavButton
      categoryName={category.name}
      categoryColor={category.color}
    />
  ))

  const location = useLocation()
  const pathParts = location.pathname.split("/")
  const secondEndPoint = pathParts[2]
  const category = userNotesCategories.find(
    (noteCategory) => noteCategory.name === secondEndPoint
  )

  const filteredNotes = category
    ? userNotes.filter((note) => note.categoryId === category.id)
    : userNotes

  const mapFilteredNotes = filteredNotes.map((note) => (
    <Note
      key={note.id}
      id={note.id}
      title={note.title}
      description={note.description}
      categoryId={note.categoryId}
    />
  ))

  const handleEditNoteCategoriesButton = () => {
    setEditNoteCategoryIsOpen(true)
  }

  return (
    <section className="h-[calc(100%-40px)] w-[calc(100%-100px)]">
      <div className="grid h-full w-full grid-cols-1 content-start">
        <nav
          className="mb-4 flex h-8 w-full flex-row items-center
          justify-between"
        >
          <div>
            <NotesNavButton categoryName="all" categoryColor="DarkGray" />
            {notesNavButtonsMap}
          </div>
          <div className="h-5">
            <button
              className="rounded-md border-2 border-transparent
              transition-colors ease-in-out hover:border-myDarkGray"
              onClick={handleEditNoteCategoriesButton}
            >
              <img src={iconThreeDots} alt="" className="filter-gray h-5" />
            </button>
          </div>
        </nav>
        <div className="w-full border-b-[1px] border-myBlack"></div>
        <div className="mt-4 grid h-full w-full grid-cols-4 gap-x-16 gap-y-5">
          {mapFilteredNotes}
          <AddNoteButton />
        </div>
      </div>
    </section>
  )
}
