import { Link, useLocation } from "react-router-dom"

interface NotesNavButtonProps {
  categoryName: string
  categoryColor: string
}

export const NotesNavButton = (props: NotesNavButtonProps) => {
  const location = useLocation()
  const buttonEndPoint = "/notes/" + props.categoryName
  const isButtonLocation = location.pathname === buttonEndPoint

  return (
    <Link to={"/notes/" + props.categoryName} className="h-full">
      <button
        className={`mr-2 h-8 w-fit min-w-[80px] rounded-md px-3 uppercase ${
          isButtonLocation
            ? `bg-my${props.categoryColor}  text-myLightGray`
            : `text-myBlack hover:underline`
        }`}
      >
        {props.categoryName}
      </button>
    </Link>
  )
}
