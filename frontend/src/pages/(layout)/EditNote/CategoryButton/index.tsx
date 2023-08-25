import { useContext } from "react"
import { GlobalStateContext } from "../../../../store/GlobalStateProvider"

interface CategoryButtonProps {
  id: number
  name: string
  color: string
}

export const CategoryButton = (props: CategoryButtonProps) => {
  const { setEditNoteCategoryId } = useContext(GlobalStateContext)

  const handleButtonClick = () => {
    setEditNoteCategoryId(props.id)
    const categoryOptions = document.querySelector("#categoryOptions")
    categoryOptions?.classList.toggle("hidden")
  }

  const categoryColor = "bg-my" + props.color

  return (
    <button
      type="button"
      className="flex h-7 w-full items-center border-b-2 pl-2 
      font-nunitoRegular hover:bg-zinc-100"
      onClick={handleButtonClick}
    >
      <div className={`h-3 w-3 rounded-full ${categoryColor}`}></div>
      <p className="pl-2 font-nunitoRegular">{props.name}</p>
    </button>
  )
}
