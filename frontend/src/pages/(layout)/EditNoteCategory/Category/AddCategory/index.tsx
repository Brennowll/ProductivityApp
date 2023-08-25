import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "react-query"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../../../../store/GlobalStateProvider"
import { api } from "../../../../../store/QueryClient"
import { ColorButton } from "./ColorButton"
import iconSingleCheck from "/src/assets/svg/icon_single_check.svg"
import iconDelete from "/src/assets/svg/icon_delete.svg"

const noteCategorySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .nonempty("The task text is required.")
    .min(3, "Task must have at least 2 characters.")
    .max(15, "Task exceeds character limit, Max 15.")
    .refine((value) => value.split("\n").length <= 1, {
      message: `Task text can have a maximum of ${1} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Task text cannot be only spaces."
    ),
  color: z.string().optional(),
})

type Category = z.infer<typeof noteCategorySchema>

interface AddCategoryProps {
  setEditCategory: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddCategory = (props: AddCategoryProps) => {
  const {
    categoryNameValue,
    colorSelected,
    setColorSelected,
    createCategoryIsActive,
    categoryIdSelected,
    setCategoryNameValue,
  } = useContext(GlobalStateContext)

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Category>({
    resolver: zodResolver(noteCategorySchema),
  })

  useEffect(() => {
    setValue("name", categoryNameValue)
  }, [categoryNameValue, setValue])

  const queryClient = useQueryClient()

  const createNoteCategoryMutation = useMutation({
    mutationFn: async (data: Category) => {
      const token = Cookies.get("access_token")
      const response = await api.post(
        "/note-categories/",
        {
          name: data.name,
          color: colorSelected,
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
      await queryClient.invalidateQueries(["notesCategories"])
      props.setEditCategory(false)
    },
  })

  const patchNoteCategoryMutation = useMutation({
    mutationFn: async (data: Category) => {
      const token = Cookies.get("access_token")
      const response = await api.patch(
        `/note-categories/${categoryIdSelected}/`,
        {
          name: data.name,
          color: colorSelected,
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
      await queryClient.invalidateQueries(["notesCategories"])
      props.setEditCategory(false)
    },
  })

  const deleteNoteCategoryMutation = useMutation(
    async () => {
      const token = Cookies.get("access_token")
      await api.delete(`/note-categories/${categoryIdSelected}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["notesCategories"])
        props.setEditCategory(false)
      },
    }
  )

  const onSubmit = (data: Category) => {
    if (createCategoryIsActive) {
      createNoteCategoryMutation.mutate(data)
    } else {
      patchNoteCategoryMutation.mutate(data)
    }
  }

  const handleCancelButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    props.setEditCategory(false)
  }

  const handleDeleteButton = () => {
    deleteNoteCategoryMutation.mutate()
  }

  const colorButtonMap = colors.map((color) => (
    <ColorButton
      key={color}
      color={color}
      active={color === colorSelected}
      setColorSelected={setColorSelected}
    />
  ))

  return (
    <form
      className={`flex h-auto min-h-[5rem] w-full flex-col items-center justify-center ${
        createCategoryIsActive ? "border-b-2" : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-10 w-full flex-row items-center justify-center">
        <input
          type="text"
          className={`h-6 w-[80%] rounded-md border-[1px] border-myBlack pl-2 focus:outline-none ${
            errors.name && "border-myRed"
          }`}
          {...register("name")}
        />
        <button
          type="button"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myDarkGray pb-[2px] font-bold text-white hover:border-myBlack"
          onClick={handleCancelButton}
        >
          x
        </button>
        <button
          type="button"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myRed hover:border-myBlack"
          onClick={handleDeleteButton}
        >
          <img src={iconDelete} alt="" className="filter-white h-4" />
        </button>
        <button
          type="submit"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myBlue hover:border-myBlack"
        >
          <img
            src={iconSingleCheck}
            alt=""
            className="filter-white h-5"
          />
        </button>
      </div>
      {errors.name && (
        <p className="self-start pl-4 font-nunitoRegular text-xs text-myRed">
          {errors.name.message}
        </p>
      )}
      <div className="flex h-10 w-full flex-row ">
        {colorButtonMap}
      </div>
    </form>
  )
}
