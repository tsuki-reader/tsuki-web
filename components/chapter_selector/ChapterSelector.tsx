'use client'

import { TokenContext } from "@/contexts/token"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { MediaList } from "@/types/anilist"
import { useContext, useEffect, useState } from "react"
import { InstalledProvider } from "@/types/models"
import { ChapterSelectorLoadingState } from "./ChapterSelectorLoadingState"
import { ChapterSelectorErrorState } from "./ChapterSelectorErrorState"
import { ChapterSelectorNoProviderState } from "./ChapterSelectorNoProvidersState"

interface Props {
  mediaList: MediaList
}

// TODO: Support both manga and comics
export function ChapterSelector({ mediaList }: Props) {
  const [providers, setProviders] = useState<InstalledProvider[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const token = useContext(TokenContext)

  useEffect(() => {
    const handleStatus = (providers: InstalledProvider[]) => {
      setProviders(providers)
      setLoading(false)
    }

    const handleError = (e: {error: string}) => {
      setErrorMessage(e.error)
      setLoading(false)
    }

    // Retrieve list of providers
    const url = endpoint("/api/providers?provider_type=manga")
    sendRequest(url, token)
      .then(handleStatus)
      .catch(handleError)
  }, [token])

  if (loading) {
    return <ChapterSelectorLoadingState />
  }

  if (errorMessage) {
    return <ChapterSelectorErrorState message={errorMessage} />
  }

  if (providers.length === 0) {
    return <ChapterSelectorNoProviderState />
  }

  if (mediaList.mapping === null) {
    return (
      <div className="rounded h-96 flex justify-center items-center bg-foreground/10 border-2 border-foreground">
        <p>Choose a provider</p>
      </div>
    )
  }

  return (
    <div className="rounded h-96 p-4 w-full border-2 border-foreground bg-background">
      <h2 className="text-2xl font-bold">Chapters</h2>
    </div>
  )
}
