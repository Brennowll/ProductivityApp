import React from "react"
import { useLocation } from "react-router-dom"

import iconLogo from "/src/assets/svg/icon_logo.svg"
import { SignUp } from "./signup"
import { SignIn } from "./signin"

export const Login = () => {
  const location = useLocation()
  const isSignUp = location.pathname === "/login"

  return (
    <div
      className="flex h-screen w-screen
      items-center justify-center bg-myBgLightGray"
    >
      <section
        className="m-4 flex min-h-fit
        w-[30rem] flex-col items-center justify-center
        rounded-lg bg-myGray shadow-lg"
      >
        <img
          src={iconLogo}
          alt=""
          className="filter-orange mt-8 h-14"
        />
        {isSignUp ? <SignUp /> : <SignIn />}
      </section>
    </div>
  )
}
