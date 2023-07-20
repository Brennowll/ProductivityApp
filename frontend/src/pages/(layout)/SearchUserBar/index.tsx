import searchIcon from "/src/assets/svg/icon_search.svg"
import userIcon from "/src/assets/svg/icon_user.svg"

export const SearchUserBar = () => {
  return (
    <div
      className="mb-4 flex h-16 flex-row items-center justify-between 
    rounded-xl bg-myBgWhite"
    >
      <div
        className="row ml-3 flex h-9 w-52 flex-row items-center
      justify-center rounded-2xl bg-myBgLightGray"
      >
        <img src={searchIcon} alt="" className="filter-gray ml-2 h-5" />
        <input
          type="text"
          className="w-44 bg-transparent px-2 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="mr-5 h-9">
        <button className="active:pt-1">
          <img
            src={userIcon}
            alt=""
            className="filter-gray hover:filter-orange h-9 transition-all
            duration-500 ease-in-out"
          />
        </button>
      </div>
    </div>
  )
}
