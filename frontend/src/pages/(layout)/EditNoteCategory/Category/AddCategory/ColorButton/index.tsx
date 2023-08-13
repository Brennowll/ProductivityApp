import { Dispatch, SetStateAction } from "react"

interface ColorButtonProps {
  color: string
  active: boolean
  setColorSelected: Dispatch<SetStateAction<string>>
}

export const ColorButton = (props: ColorButtonProps) => {
  const tailwindColorClass = "bg-my" + props.color
  const tailwindActiveClass = "border-2 border-myBlack"
  const isActive = props.active === true ? tailwindActiveClass : ""

  const handleColorButtonClick = () => {
    props.setColorSelected(props.color)
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        className={`h-4 w-4 rounded-full ${tailwindColorClass} ${isActive}`}
        onClick={handleColorButtonClick}
      ></button>
    </div>
  )
}
