import { ReactNode } from "react"

interface EditLayoutProps {
  children: ReactNode
}

export const EditLayout = ({ children }: EditLayoutProps) => {
  return (
    <div
      className="absolute right-0 top-0 z-50 flex h-screen w-screen
      items-center justify-center bg-black bg-opacity-40"
    >
      <div
        className="relative flex h-96 min-w-[200px] max-w-[400px]
        items-center rounded-lg bg-myLightGray opacity-100
        sm:min-w-[500px] sm:max-w-none md:min-w-[600px]"
      >
        <div
          className="absolute -left-3 -top-3 h-3/5 w-4/5
        rounded-tl-lg border-l-2 border-t-2 border-myLightGray"
        ></div>
        <div
          className="absolute -bottom-3 -right-3 h-3/5 w-4/5
        rounded-br-lg border-b-2 border-r-2 border-myLightGray"
        ></div>
        {children}
      </div>
    </div>
  )
}
