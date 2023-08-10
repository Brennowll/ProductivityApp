import { Link, useLocation } from "react-router-dom"

interface Props {
  buttonName: string
  href: string
  imgSrc: string
}

export const NavButton = (props: Props) => {
  const location = useLocation()
  const isButtonLocation = location.pathname.startsWith(props.href)

  const isActiveButtonClass = isButtonLocation
    ? ` border-r-4 border-myOrange bg-gradient-to-r
        from-transparent to-orange-100 `
    : ""

  const isActiveIconClass = isButtonLocation ? "filter-orange" : "filter-gray"

  const isActiveTextClass = isButtonLocation
    ? "text-myOrange"
    : "text-myDarkGray"

  return (
    <button
      className={`items-middle h-14 w-full justify-center
      transition-all ease-in-out hover:bg-myBgGray
      ${isActiveButtonClass}`}
    >
      <Link to={props.href}>
        <div
          className="ml-3 flex flex-row items-center
          justify-start text-myDarkGray"
        >
          <img
            src={props.imgSrc}
            alt=""
            className={`mx-3 h-9 transition-all duration-700
            ease-in-out ${isActiveIconClass}`}
          />
          <p
            className={`p-3 font-nunitoXBold uppercase
            transition-all duration-700 ease-in-out
            ${isActiveTextClass}`}
          >
            {props.buttonName}
          </p>
        </div>
      </Link>
    </button>
  )
}
