'use client'

import { useEffect, useState } from "react";
import { LoadingScreen } from "../LoadingScreen";
import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import { FullscreenCenter } from "../FullscreenCenter";

interface Media {
    id: number
    title: AnilistTitle
    startDate: AnilistDate
    status: string
    chapters: number
    volumes: number
    coverImage: AnilistCoverImage
    bannerImage: string
    description: string
    genres: string[]
}

interface AnilistDate {
    year: number
    month: number
    day: number
}

interface AnilistTitle {
    romaji: string
    english: string
}

interface AnilistCoverImage {
    large: string
    medium: string
    color: string
}

interface ProgressEntry {
    progress: number
    completedAt: AnilistDate
    startedAt: AnilistDate
    notes: string
    score: number
    status: string
    media: Media
}

interface MediaList {
    name: string
    isCustomList: boolean
    isSplitCompletedList: boolean
    status: string
    entries: ProgressEntry[]
}

export function MangaCollectionPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [lists, setLists] = useState<MediaList[]>([])

    const handleStatus = (lists: MediaList[]) => {
        setLists(lists)
        setLoading(false)
        const firstList = lists[0]
        const banners = firstList.entries.map((entry) => entry.media.bannerImage)
        console.log(banners)
    }

    const handleError = () => {
        setLoading(false)
        setError(true)
    }

    const listNames = () => {
        return lists.map((list, index) => <p key={index}>{list.name}</p>)
    }

    useEffect(() => {
        const url = endpoint("/api/manga")
        sendRequest(url)
            .then(handleStatus)
            .catch(handleError)
    }, [])

    if (loading) {
        return <LoadingScreen />
    }

    if (error) {
        return (
            <FullscreenCenter>
                <p>An error occurred. Please refresh the page.</p>
            </FullscreenCenter>
        )
    }

    return (
        <FullscreenCenter>
            {listNames()}
        </FullscreenCenter>
    )
}