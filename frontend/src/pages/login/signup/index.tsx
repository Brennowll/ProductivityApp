import { useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import axios from "axios"

import { GlobalStateContext } from "../../../store/GlobalStateProvider"
import { api } from "../../../store/QueryClient"

const userSchema = z.object({
  email: z.string().nonempty("Email is required."),
  // .email("Email is not valid"),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must have at least 8 characters.")
    .max(40, "Password exceeds character limit, Max 40.")
    .refine((value) => value.split("\n").length <= 1, {
      message: `Password can have a maximum of ${1} lines.`,
    })
    .refine(
      (value) => value.trim() !== "",
      "Password cannot be only spaces."
    ),
})

type User = z.infer<typeof userSchema>

const fetchLogin = async (email: string, password: string) => {
  const response = await api.post("/token/", {
    username: email,
    password: password,
  })

  const token = response.data.access
  const refreshToken = response.data.refresh

  Cookies.set("access_token", token)
  Cookies.set("refresh_token", refreshToken)

  return response.data
}

export const SignUp = () => {
  const { setUserIsLogged } = useContext(GlobalStateContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = (data: User) => {
    fetchLogin(data.email, data.password)
    setUserIsLogged(true)
  }

  return (
    <form
      className="min-h-fit w-full p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className={`mb-1 h-8 w-full rounded-md border-2
        p-3 font-nunitoRegular focus:outline-none ${
          errors.email && "border-myRed"
        }`}
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && (
        <p
          className="mb-1 pb-2 pl-3 font-nunitoRegular
          text-xs text-myRed"
        >
          {errors.email.message}
        </p>
      )}
      <input
        type="password"
        className={`mb-1 h-8 w-full rounded-md border-2
        p-3 font-nunitoRegular focus:outline-none ${
          errors.password && "border-myRed"
        }`}
        placeholder="Password"
        {...register("password")}
      />
      {errors.password && (
        <p
          className="mb-1 pb-2 pl-3 font-nunitoRegular
          text-xs text-myRed"
        >
          {errors.password.message}
        </p>
      )}
      <button
        type="submit"
        className="mb-1 mt-4 h-10 w-full rounded-md border-2
        bg-myOrange font-nunitoRegular text-myWhite
        transition-all ease-in-out hover:h-12"
      >
        SIGN UP
      </button>
      <div className="my-1 h-[1px] w-full bg-myBlack"></div>
      <button
        type="button"
        className="my-1 h-10 w-full rounded-md border-2
        border-gray-300 bg-myWhite font-nunitoRegular
        text-myBlack transition-all ease-in-out hover:h-12"
      >
        SIGN IN
      </button>
    </form>
  )
}
