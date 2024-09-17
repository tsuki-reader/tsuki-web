'use client'

import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Login } from "./auth/login";
import { LoadingScreen } from "./loadingScreen";
import { Viewer } from "@/types/anilist";
import { ViewerProvider } from "@/contexts/viewer";

interface Props {
    children: React.ReactNode
}

interface StatusResponse {
    authenticated: boolean
    viewer: Viewer | null
}

export default function StatusWrapper({ children }: Props) {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)

    const pathname = usePathname()

    const handleStatus = (json: StatusResponse) => {
        if (json.authenticated && json.viewer !== null) {
            setAuthenticated(true)
            setCurrentViewer(json.viewer)
        } else {
            setAuthenticated(false)
        }
        setLoading(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = (error: any) => {
        console.error(error)
        setAuthenticated(false)
        setLoading(false)
    }

    useEffect(() => {
        const url = endpoint("/api/auth/status")
        sendRequest(url, "GET")
            .then(handleStatus)
            .catch(handleError)
    }, [])

    if (pathname === "/auth/callback") return children

    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    // TODO: Show settings on first boot?

    if (authenticated) {
        return (
            <ViewerProvider value={currentViewer}>
                {children}
            </ViewerProvider>
        )
    } else {
        return (
            <Login />
        )
    }
}