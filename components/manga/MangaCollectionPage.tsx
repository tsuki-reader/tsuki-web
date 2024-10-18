'use client'

import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "../LoadingScreen";
import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import { FullscreenCenter } from "../FullscreenCenter";
import { MediaListDisclosure } from "./MediaListDisclosure";
import { MediaList } from "@/types/anilist";

export function MangaCollectionPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [lists, setLists] = useState<MediaList[]>([])
    const [reading, setReading] = useState<MediaList | null>(null)

    const bgRef = useRef<HTMLDivElement>(null)
    const interval = useRef<NodeJS.Timeout | null>(null)

    const handleError = () => {
        setLoading(false)
        setError(true)
    }

    const setRandomBackground = (backgrounds: string[]) => {
        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        const img = new Image();
        img.src = randomBackground;

        img.onload = () => {
            if (bgRef.current) {
                bgRef.current.style.backgroundImage = `url(${randomBackground})`;
            }
        };
    }

    useEffect(() => {
        const handleStatus = (lists: MediaList[]) => {
            setLoading(false)
            const reading = lists.find((list) => list.status === 'CURRENT')
            const newLists = lists.filter((list) => !["CURRENT", "COMPLETED"].includes(list.status) && !list.isCustomList)
            setLists(newLists)
            if (reading !== undefined && interval.current === null) {
                setReading(reading)
                const banners = reading
                    .entries
                    .map((entry) => entry.media.bannerImage)
                    .filter((banner) => banner !== "")
                setRandomBackground(banners)
                interval.current = setInterval(() => {
                    setRandomBackground(banners)
                }, 60000)
            }
        }

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
        <>
            <div className="my-[150px] mx-12">
                <div className="flex flex-col gap-16">
                    {reading !== null &&
                        <MediaListDisclosure list={reading} open />
                    }
                    {lists.map((list, key) => <MediaListDisclosure key={key} list={list} />)}
                </div>
            </div>
            <div className="bg-overlay fixed top-0 left-0 h-screen w-full bg-cover bg-no-repeat bg-center -z-[1]" ref={bgRef}></div>
        </>
    )
}
