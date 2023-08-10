interface EditEventButtonProps {
  buttonText: string
  onClick: () => void
  backgroundColor: string
}

export const EditEventButton = (props: EditEventButtonProps) => {
  return (
    <button
      className={`mx-1 h-10 w-24 transform rounded-md
        font-nunitoRegular text-white transition-all hover:scale-105
        active:scale-100 ${props.backgroundColor}`}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  )
}
