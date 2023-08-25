import { ColorRing } from "react-loader-spinner"

export const LoadingSpinner = () => {
  return (
    <ColorRing
      height={60}
      width={60}
      colors={["#FF6600", "#FF6600", "#FF6600", "#FF6600", "#FF6600"]}
    />
  )
}
