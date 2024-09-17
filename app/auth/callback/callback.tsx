'use client'

import { FullscreenCenter } from "@/components/FullscreenCenter"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Callback() {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [message, setMessage] = useState<string>("Logging in...")
    const router = useRouter()

    useEffect(() => {
        const token = window.location.hash.replace("#access_token=", "").replace(/&.*/, "")
        setAccessToken(token)
    }, [])

    useEffect(() => {
        if (accessToken) {
            const url = endpoint('/api/auth/login')
            const data = {
                access_token: accessToken
            }
            sendRequest(url, "POST", data)
                // TODO: For some reason, using router here does not refresh status
                .then(() => window.location.href = "/")
                .catch((error) => {
                    console.error(error)
                    setMessage("Could not login to AniList")
                })
        }
    }, [accessToken, router])

    return (
        <FullscreenCenter>
            <p className="max-w-[50%] break-words">{message}</p>
        </FullscreenCenter>
    )
}
