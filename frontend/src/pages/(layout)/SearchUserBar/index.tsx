import searchIcon from "/src/assets/svg/icon_search.svg"
import sideNavIcon from "/src/assets/svg/icon_side_nav.svg"
import userIcon from "/src/assets/svg/icon_user.svg"

export const SearchUserBar = () => {
  const handleNavIconClick = () => {
    const sideNavContainer = document.getElementById(
      "side-nav-container"
    )
    sideNavContainer?.classList.toggle("hidden")
    sideNavContainer?.classList.toggle("fixed")
    sideNavContainer?.classList.toggle("flex")
  }

  return (
    <div
      className="flex h-16 flex-row items-center justify-between 
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
      <button className="mr-5 h-9 active:pt-1">
        <img
          src={userIcon}
          alt=""
          className="filter-gray hover:filter-orange h-7 transition-all duration-500
            ease-in-out sm:h-9"
        />
      </button>
    </div>
  )
}
