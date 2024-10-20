import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage } from "../ErrorMessage"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation"

interface Props {
  message: string
}

export function ChapterSelectorErrorState({ message }: Props) {
  return (
    <div className="rounded h-96 flex flex-col gap-4 justify-center items-center bg-foreground/10 border-2 border-foreground">
      <FontAwesomeIcon icon={faTriangleExclamation} className="text-4xl" />
      <p className="text-xl">An error occurred loading providers:</p>
      <ErrorMessage message={message} />
    </div>
  )
}
