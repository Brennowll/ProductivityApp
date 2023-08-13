import { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { GlobalStateContext } from "../../../../store/GlobalStateProvider"
import { ColorButton } from "./ColorButton"
import iconSingleCheck from "/src/assets/svg/icon_single_check.svg"

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

export const AddCategory = () => {
  const {
    setCreateCategoryIsOpen,
    userNotesCategories,
    setUserNotesCategories,
  } = useContext(GlobalStateContext)

  const [colorSelected, setColorSelected] = useState<string>("")
  const [categoryNameValue, setCategoryNameValue] = useState<string>("")

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
      color={color}
      active={color === colorSelected ? true : false}
      setColorSelected={setColorSelected}
    />
  ))

  const onSubmit = (data: Category) => {
    const userNotesCategoriesCopy = [...userNotesCategories]
    const newId = userNotesCategoriesCopy.length + 1
    userNotesCategoriesCopy.push({
      id: newId,
      name: data.name,
      color: colorSelected,
    })
    setUserNotesCategories(userNotesCategoriesCopy)
    setCreateCategoryIsOpen(false)
  }

  const handleCancelButton = () => {
    setColorSelected("")
    setCategoryNameValue("")
    setCreateCategoryIsOpen(false)
  }

  return (
    <form
      className="flex h-fit min-h-[5rem] w-full flex-col items-center justify-center border-b-2"
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
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myRed pb-1 font-bold text-white hover:border-myBlack"
          onClick={handleCancelButton}
          type="button"
        >
          x
        </button>
        <button
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-myBlue hover:border-myBlack"
          type="submit"
        >
          <img src={iconSingleCheck} alt="" className="filter-white h-5" />
        </button>
      </div>
      {errors.name && (
        <p className="self-start pl-8 font-nunitoRegular text-xs text-myRed">
          {errors.name.message}
        </p>
      )}
      <div className="flex h-10 w-full flex-row ">{colorButtonMap}</div>
    </form>
  )
}
