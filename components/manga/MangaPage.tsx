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
import { ChapterSelector } from "../chapter_selector/ChapterSelector"
import { Chapter } from "@/types/models"

interface MangaShowResponse {
    mediaList: MediaList
    chapters: Chapter[]
}

export function MangaPage() {
  const [mediaList, setMediaList] = useState<MediaList | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const token = useContext(TokenContext)

  useEffect(() => {
    const handleStatus = (response: MangaShowResponse) => {
      setMediaList(response.mediaList)
      setChapters(response.chapters)
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
        <ChapterSelector mediaList={mediaList!} initialChapters={chapters} />
      </div>
      {mediaList!.media.bannerImage !== "" &&
        <div className="bg-overlay fixed top-0 left-0 h-screen w-full bg-cover bg-no-repeat bg-center -z-[1]" style={{backgroundImage: `url(${mediaList!.media.bannerImage})`}}></div>
      }
    </>
  )
}
