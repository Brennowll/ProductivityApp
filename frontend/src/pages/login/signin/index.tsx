import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required.")
      .min(3, "Username must have at least 3 characters.")
      .max(30, "Username exceeds character limit, Max 30.")
      .refine((value) => value.split("\n").length <= 1, {
        message: `Username can have a maximum of ${1} lines.`,
      })
      .refine(
        (value) => value.trim() !== "",
        "Task text cannot be only spaces."
      ),
    email: z
      .string()
      .nonempty("Email is required.")
      .min(3, "Email must have at least 3 characters.")
      .max(40, "Email exceeds character limit, Max 40.")
      .email("Email is not valid")
      .refine((value) => value.split("\n").length <= 1, {
        message: `Email can have a maximum of ${1} lines.`,
      })
      .refine(
        (value) => value.trim() !== "",
        "Email cannot be only spaces."
      ),
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
      )
      .refine((value) => {
        // Verificar complexidade da senha (exemplo simples)
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasDigits = /\d/.test(value)
        const hasSpecialChars = /[^A-Za-z0-9]/.test(value)
        return (
          hasUpperCase && hasLowerCase && hasDigits && hasSpecialChars
        )
      }, "Password must include uppercase, lowercase, digits, and special characters."),
    confirmPassword: z
      .string()
      .nonempty("Confirm password is required."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      })
    }
  })

type User = z.infer<typeof userSchema>

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = (data: User) => {
    console.log(data)
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
          errors.username && "border-myRed"
        }`}
        placeholder="Username"
        {...register("username")}
      />
      {errors.username && (
        <p
          className="mb-1 pb-2 pl-3 font-nunitoRegular
          text-xs text-myRed"
        >
          {errors.username.message}
        </p>
      )}
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
      <input
        type="password"
        className={`mb-1 h-8 w-full rounded-md border-2
        p-3 font-nunitoRegular focus:outline-none ${
          errors.confirmPassword && "border-myRed"
        }`}
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p
          className="mb-1 pb-2 pl-3 font-nunitoRegular
          text-xs text-myRed"
        >
          {errors.confirmPassword.message}
        </p>
      )}
      <button
        type="submit"
        className="mb-1 mt-4 h-10 w-full rounded-md border-2
        bg-myOrange font-nunitoRegular text-myWhite
        transition-all ease-in-out hover:h-12"
      >
        SIGN IN
      </button>
      <div className="my-1 h-[1px] w-full bg-myBlack"></div>
      <button
        type="button"
        className="my-1 h-10 w-full rounded-md border-2
        border-gray-300 bg-myWhite font-nunitoRegular
        text-myBlack transition-all ease-in-out hover:h-12"
      >
        LOGIN
      </button>
    </form>
  )
}
