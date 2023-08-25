import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient, useMutation } from "react-query"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { api } from "../../../store/QueryClient"
import { EditLayout } from "../EditLayout"
import { EditNoteButton } from "./EditNoteButton"
import { CategoryButton } from "./CategoryButton"
import iconArrow from "/src/assets/svg/icon_arrow_down.svg"
import { AddCategory } from "./AddCategory"

interface NoteCategory {
  id: number
  name: string
  color: string
}

const noteSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .nonempty("Title is required.")
    .min(3, "Title must have at least 3 characters.")
    .max(50, "Title exceeds character limit, Max 50.")
    .refine((value) => value.split("\n").length <= 1, {
      message: `Task text can have a maximum of ${1} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Task text cannot be only spaces."
    ),
  description: z
    .string()
    .nonempty("Description is required.")
    .min(3, "Description must have at least 3 characters.")
    .max(400, "Description exceeds character limit, Max 400.")
    .refine((value) => value.split("\n").length <= 8, {
      message: `Description can have a maximum of ${8} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Description cannot be only spaces."
    ),
  categoryId: z.number().optional(),
})

type NoteType = z.infer<typeof noteSchema>

export const EditNote = () => {
  const {
    noteIdSelected,
    setEditNoteIsOpen,
    editNoteTitleValue,
    editNoteDescriptionValue,
    editNoteCategoryId,
    createNoteIsActive,
    createCategoryIsOpen,
    setCreateCategoryIsOpen,
  } = useContext(GlobalStateContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NoteType>({
    resolver: zodResolver(noteSchema),
  })

  useEffect(() => {
    setValue("title", editNoteTitleValue)
    setValue("description", editNoteDescriptionValue)
  }, [setValue, editNoteTitleValue, editNoteDescriptionValue])

  const queryClient = useQueryClient()

  const createNoteMutation = useMutation({
    mutationFn: async (data: NoteType) => {
      const token = Cookies.get("access_token")
      const response = await api.post(
        "/notes/",
        {
          title: data.title,
          description: data.description,
          categoryId: editNoteCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"])
      setEditNoteIsOpen(false)
    },
  })

  const patchNoteMutation = useMutation({
    mutationFn: async (data: NoteType) => {
      const token = Cookies.get("access_token")
      const response = await api.patch(
        `/notes/${noteIdSelected}/`,
        {
          title: data.title,
          description: data.description,
          categoryId: editNoteCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"])
      setEditNoteIsOpen(false)
    },
  })

  const deleteNoteMutation = useMutation(
    async () => {
      const token = Cookies.get("access_token")
      await api.delete(`/notes/${noteIdSelected}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["notes"])
        setEditNoteIsOpen(false)
      },
    }
  )

  const onSubmit = (data: NoteType) => {
    if (createNoteIsActive) {
      createNoteMutation.mutate(data)
    } else {
      patchNoteMutation.mutate(data)
    }
  }

  const onDelete = () => {
    deleteNoteMutation.mutate()
  }

  const handleCancelButtonClick = () => {
    setEditNoteIsOpen(false)
  }

  const handleShowCategoryOptions = () => {
    const categoryOptions = document.querySelector("#categoryOptions")
    categoryOptions?.classList.toggle("hidden")
  }

  const notesCategories = queryClient.getQueryData<NoteCategory[]>([
    "notesCategories",
  ])

  const categoryButtonMap = notesCategories?.map((category) => (
    <CategoryButton
      key={category.id}
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

  const searchCategory = (category: NoteCategory) => {
    return category.id === editNoteCategoryId
  }

  const editNoteCategory = notesCategories?.find(searchCategory)
  const editNoteCategoryColor = editNoteCategory
    ? "bg-my" + editNoteCategory?.color
    : "bg-myDarkGray"

  return (
    <EditLayout>
      <form
        className="z-50 mx-4 flex h-full w-full flex-col rounded-lg
        py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className={`mb-1 h-8 w-full rounded-md border-2
            p-3 font-nunitoRegular focus:outline-none ${
              errors.title && "border-myRed"
            }`}
          placeholder="Put your title here.."
          {...register("title")}
        />
        {errors.title && (
          <p className="mb-1 pb-2 pl-3 font-nunitoRegular text-xs text-myRed">
            {errors.title.message}
          </p>
        )}
        <textarea
          className={`mb-1 h-full w-full resize-none rounded-md border-2
            p-3 align-text-top font-nunitoRegular
            focus:outline-none ${
              errors.description && "border-myRed"
            }`}
          placeholder="Put your description here.."
          {...register("description")}
        />
        {errors.description && (
          <p className="mb-1 pb-2 pl-3 font-nunitoRegular text-xs text-myRed">
            {errors.description.message}
          </p>
        )}
        <div
          className="relative mb-1 flex h-8 w-full flex-row items-center
          rounded-md border-2 bg-white"
        >
          <div
            className={`ml-2 h-3 w-3 rounded-full ${editNoteCategoryColor}`}
          ></div>
          <p className="h-full w-full pl-3 font-nunitoRegular">
            {editNoteCategory
              ? editNoteCategory.name
              : "Not selected"}
          </p>
          <button
            type="button"
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
              type="button"
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
              onClick={onDelete}
              backgroundColor="bg-red-500"
            />
          ) : null}
          <EditNoteButton
            isSubmit={true}
            buttonText={saveButtonText}
            backgroundColor="bg-myBlue"
          />
        </div>
      </form>
    </EditLayout>
  )
}
