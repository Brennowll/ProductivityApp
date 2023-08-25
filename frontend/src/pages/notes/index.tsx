import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../store/GlobalStateProvider"
import { api } from "../../store/QueryClient"
import { NotesNavButton } from "./NotesNavButton"
import { Note } from "../../components/Note"
import { AddNoteButton } from "./AddNoteButton"
import iconThreeDots from "/src/assets/svg/icon_three_dots.svg"
import { LoadingSpinner } from "../../components/LoadingSpinner"

interface NoteCategory {
  id: number
  name: string
  color: string
}

interface NoteInterface {
  id: number
  title: string
  description: string
  categoryId: number
}

export const Notes = () => {
  const { setEditNoteCategoryIsOpen } = useContext(GlobalStateContext)

  const { data: notesCategories, isFetching: isCategoriesFetching } =
    useQuery<NoteCategory[]>({
      queryKey: ["notesCategories"],
      queryFn: async () => {
        const token = Cookies.get("access_token")
        const response = await api.get("/note-categories/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        return response.data
      },
    })

  const { data: notes, isFetching: isNotesFetching } = useQuery<
    NoteInterface[]
  >({
    queryKey: ["notes"],
    queryFn: async () => {
      const token = Cookies.get("access_token")
      const response = await api.get("/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
  })

  const notesNavButtonsMap = notesCategories?.map((category) => (
    <NotesNavButton
      key={category.id}
      categoryName={category.name}
      categoryColor={category.color}
    />
  ))

  const location = useLocation()
  const pathParts = location.pathname.split("/")
  const secondEndPoint = pathParts[2]
  const category = notesCategories?.find(
    (noteCategory) => noteCategory.name === secondEndPoint
  )

  const filteredNotes = category
    ? notes?.filter((note) => note.categoryId === category.id)
    : notes

  const mapFilteredNotes = filteredNotes?.map((note) => (
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

  const isHome = location.pathname === "/home"
  const sectionClassIfHome = isHome
    ? "h-full w-full"
    : `h-[calc(100%-10px)] w-[calc(100%-40px)] lg:h-[calc(100%-40px)]
      lg:w-[calc(100%-100px)] sm:h-[calc(100%-30px)] sm:w-[calc(100%-75px)]`

  const notesContainerClassIfHome = isHome
    ? "grid-cols-1 py-2"
    : `mt-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-3
      xl:grid-cols-4 lg:gap-x-8 2xl:gap-x-16 gap-y-5`

  if (isNotesFetching || isCategoriesFetching) {
    return <LoadingSpinner />
  }

  return (
    <section className={sectionClassIfHome}>
      <div className="grid h-[calc(100%-20px)] w-full grid-cols-1 content-start">
        {isHome ? (
          <header className="flex h-14 w-full items-center">
            <h2
              className="font-nunitoRegular text-xl font-bold tracking-wider
                text-slate-900"
            >
              MY NOTES
            </h2>
          </header>
        ) : (
          <>
            <nav
              className="mb-4 mt-2 flex h-8 w-full flex-row items-center
              justify-between"
            >
              <div>
                <NotesNavButton
                  categoryName="all"
                  categoryColor="DarkGray"
                />
                {notesNavButtonsMap}
              </div>
              <div className="h-5">
                <button
                  className="rounded-md border-2 border-transparent
                  transition-colors ease-in-out hover:border-myDarkGray"
                  onClick={handleEditNoteCategoriesButton}
                >
                  <img
                    src={iconThreeDots}
                    alt=""
                    className="filter-gray h-5"
                  />
                </button>
              </div>
            </nav>
          </>
        )}
        <div className="w-full border-b-[1px] border-myBlack"></div>
        <div
          className={`grid h-full w-full overflow-y-auto ${notesContainerClassIfHome}`}
        >
          {mapFilteredNotes}
          <AddNoteButton />
        </div>
      </div>
    </section>
  )
}
