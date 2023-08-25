import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import searchIcon from "/src/assets/svg/icon_search.svg"
import sideNavIcon from "/src/assets/svg/icon_side_nav.svg"
import userIcon from "/src/assets/svg/icon_user.svg"

export const SearchUserBar = () => {
  const { setUserIsLogged } = useContext(GlobalStateContext)

  const handleNavIconClick = () => {
    const sideNavContainer = document.getElementById(
      "side-nav-container"
    )
    sideNavContainer?.classList.toggle("hidden")
    sideNavContainer?.classList.toggle("fixed")
    sideNavContainer?.classList.toggle("flex")
  }

  const handleUserButtonClick = () => {
    const userMenu = document.getElementById("user-menu")
    userMenu?.classList.toggle("hidden")
  }

  const navigate = useNavigate()
  const handleLogoutClick = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    setUserIsLogged(false)
    navigate("/login")
  }

  return (
    <div
      className="relative flex h-16 flex-row items-center justify-between 
      rounded-xl bg-myBgWhite"
    >
      <button className="ml-5 flex h-9 w-7 active:pt-1 sm:hidden">
        <img
          src={sideNavIcon}
          alt=""
          className="filter-gray hover:filter-orange h-9 transition-all
            duration-500 ease-in-out"
          onClick={handleNavIconClick}
        />
      </button>
      <div
        className="row ml-3 flex h-9 w-52 flex-row items-center
      justify-center rounded-2xl bg-myBgLightGray"
      >
        <img
          src={searchIcon}
          alt=""
          className="filter-gray ml-2 h-5"
        />
        <input
          type="text"
          className="w-44 bg-transparent px-2 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <button
        className="mr-5 h-9 active:pt-1"
        onClick={handleUserButtonClick}
      >
        <img
          src={userIcon}
          alt=""
          className="filter-gray hover:filter-orange h-7
          transition-all duration-500 ease-in-out sm:h-9"
        />
      </button>
      <section
        id="user-menu"
        className="absolute right-4 top-16 hidden h-fit max-w-xs
        rounded-lg border-2 border-myDarkGray bg-white p-2"
      >
        <button
          className="h-[2rem] min-w-[10rem] rounded-md
          bg-myRed font-nunitoRegular text-white
          transition-all ease-in-out hover:h-9
          active:h-[2rem]"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </section>
    </div>
  )
}
