import { Link, useLocation } from "react-router-dom"

interface Props {
  buttonName: string
  href: string
  imgSrc: string
}

export const NavButton = (props: Props) => {
  const location = useLocation()
  const isButtonLocation = location.pathname.startsWith(props.href)

  return (
    <button
      className={`items-middle h-14 w-full justify-center transition-all ease-in-out hover:bg-myBgGray
        ${isButtonLocation ? " border-r-4 border-myOrange" : ""}`}
    >
      <Link to={props.href}>
        <div className="ml-3 flex flex-row items-center justify-start text-myDarkGray">
          <img
            src={props.imgSrc}
            alt=""
            className={`mx-3 h-9 transition-all duration-700 ease-in-out ${
              isButtonLocation ? "filter-orange" : "filter-gray"
            }`}
          />
          <p
            className={`p-3 font-nunitoXBold uppercase transition-all duration-700 ease-in-out ${
              isButtonLocation ? "text-myOrange" : "text-myDarkGray"
            }`}
          >
            {props.buttonName}
          </p>
        </div>
      </Link>
    </button>
  )
}
