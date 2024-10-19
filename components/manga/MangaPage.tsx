'use client'

import { useSearchParams } from "next/navigation"
import { FullscreenCenter } from "../FullscreenCenter"
import { useContext, useEffect, useState } from "react"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { TokenContext } from "@/contexts/token"
import { LoadingScreen } from "../LoadingScreen"
import { ErrorMessage } from "../ErrorMessage"
import { MediaList } from "@/types/anilist"
import { MangaHeader } from "./MangaHeader"

export function MangaPage() {
  const [mediaList, setMediaList] = useState<MediaList | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const token = useContext(TokenContext)

  useEffect(() => {
    const handleStatus = (mediaList: MediaList) => {
      setMediaList(mediaList)
    }

    const handleError = (e: {error: string}) => {
      setErrorMessage(e.error)
    }

    if (id && id.trim() !== "") {
      const url = endpoint(`/api/manga/${id}`)
      sendRequest(url, token)
        .then(handleStatus)
        .catch(handleError)
    } else {
      setErrorMessage("Manga entry not found.")
    }
  }, [id, token])

  if (mediaList === null && errorMessage === null) {
    return <LoadingScreen />
  }

  if (errorMessage) {
    return (
      <FullscreenCenter>
        <ErrorMessage message={errorMessage} />
      </FullscreenCenter>
    )
  }

  return (
    <>
      <div className="my-[150px] mx-12">
        <MangaHeader mediaList={mediaList!} />
      </div>
      {mediaList!.media.bannerImage !== "" &&
        <div className="bg-overlay fixed top-0 left-0 h-screen w-full bg-cover bg-no-repeat bg-center -z-[1]" style={{backgroundImage: `url(${mediaList!.media.bannerImage})`}}></div>
      }
    </>
  )
}
