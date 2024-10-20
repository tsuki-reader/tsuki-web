import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTableList } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export function ChapterSelectorNoProviderState() {
  return (
    <div className="rounded h-96 flex flex-col gap-4 justify-center items-center bg-foreground/10 border-2 border-foreground">
      <FontAwesomeIcon icon={faTableList} className="text-4xl" />
      <p className="text-xl">No providers available</p>
      <small>In order to read manga and comics on Tsuki, you need to install a provider. Head to the <Link href="/repositories" className="underline font-bold">repositories page</Link> to install one.</small>
    </div>
  )
}
