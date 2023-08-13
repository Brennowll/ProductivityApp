import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { GlobalStateContext } from "../../../../../store/GlobalStateProvider"
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
    .refine((value) => value.trim() !== "", "Task text cannot be only spaces."),
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
    userNotesCategories,
    setUserNotesCategories,
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

  const colorButtonMap = colors.map((color) => (
    <ColorButton
      key={color}
      color={color}
      active={color === colorSelected}
      setColorSelected={setColorSelected}
    />
  ))

  const searchCategory = (category: Category) => {
    return category.id === categoryIdSelected
  }

  const onSubmit = (data: Category) => {
    const userNotesCategoriesCopy = [...userNotesCategories]
    if (createCategoryIsActive) {
      const newId = userNotesCategoriesCopy.length + 1
      userNotesCategoriesCopy.push({
        id: newId,
        name: data.name,
        color: colorSelected,
      })
    } else {
      const categoryIndex = userNotesCategoriesCopy.findIndex(searchCategory)
      if (categoryIndex !== -1) {
        userNotesCategoriesCopy[categoryIndex] = {
          ...userNotesCategoriesCopy[categoryIndex],
          name: data.name,
          color: colorSelected,
        }
      }
    }
    setUserNotesCategories(userNotesCategoriesCopy)
    props.setEditCategory(false)
  }

  const handleCancelButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    props.setEditCategory(false)
  }

  const handleDeleteButton = () => {
    const userNotesCategoriesCopy = [...userNotesCategories]
    const categoryIndex = userNotesCategoriesCopy.findIndex(
      (category) => category.id === categoryIdSelected
    )
    if (categoryIndex !== -1) {
      userNotesCategoriesCopy.splice(categoryIndex, 1)
      setUserNotesCategories(userNotesCategoriesCopy)
      props.setEditCategory(false)
    }
  }

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
          type="submit"
        >
          <img src={iconSingleCheck} alt="" className="filter-white h-5" />
        </button>
      </div>
      {errors.name && (
        <p className="self-start pl-4 font-nunitoRegular text-xs text-myRed">
          {errors.name.message}
        </p>
      )}
      <div className="flex h-10 w-full flex-row ">{colorButtonMap}</div>
    </form>
  )
}
