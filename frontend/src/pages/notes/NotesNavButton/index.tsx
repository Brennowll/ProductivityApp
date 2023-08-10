import { Link, useLocation } from "react-router-dom"

interface NotesNavButtonProps {
  categoryName: string
  categoryColor: string
}

export const NotesNavButton = (props: NotesNavButtonProps) => {
  const location = useLocation()
  const buttonEndPoint = `/notes/${props.categoryName}`
  const isButtonLocation = location.pathname === buttonEndPoint
  const isActiveClass = isButtonLocation
    ? `bg-my${props.categoryColor} text-myLightGray`
    : "text-myBlack hover:underline"

  const buttonStyles = `mr-2 h-8 w-fit min-w-[80px] rounded-md px-3 
        font-nunitoRegular text-sm font-semibold uppercase
        tracking-wider transition-colors duration-300 ease-in-out
        ${isActiveClass}`

  return (
    <Link to={buttonEndPoint} className="h-full">
      <button className={buttonStyles}>{props.categoryName}</button>
    </Link>
  )
}
