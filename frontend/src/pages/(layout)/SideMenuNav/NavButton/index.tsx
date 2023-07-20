import { useContext } from "react"
import { GlobalStateContext } from "../../../../store/GlobalStateProvider"

interface Props {
  text: string
  imgSrc: string
  buttonName: string
}

export const NavButton = (props: Props) => {
  const globalContext = useContext(GlobalStateContext)

  const buttonActived = globalContext.navButtonActive === props.buttonName

  return (
    <button
      className={`items-middle h-14 w-full justify-center transition-all ease-in-out hover:bg-myBgGray
        ${buttonActived ? " border-r-4 border-myOrange" : ""}`}
      onClick={() => globalContext.setNavButtonActive(props.buttonName)}
    >
      <div className="ml-3 flex flex-row items-center justify-start text-myDarkGray">
        <img
          src={props.imgSrc}
          alt=""
          className={`mx-3 h-9 transition-all duration-700 ease-in-out ${
            buttonActived ? "filter-orange" : "filter-gray"
          }`}
        />
        <p
          className={`p-3 font-nunitoXBold transition-all duration-700 ease-in-out ${
            buttonActived ? "text-myOrange" : "text-myDarkGray"
          }`}
        >
          {props.text}
        </p>
      </div>
    </button>
  )
}
