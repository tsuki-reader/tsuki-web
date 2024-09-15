'use client'

import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Login } from "./auth/login";
import { LoadingScreen } from "./loadingScreen";

interface Props {
    children: React.ReactNode
}

export default function StatusWrapper({ children }: Props) {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    const pathname = usePathname()

    const handleStatus = (json: {authenticated: boolean}) => {
        if (json.authenticated) {
            setAuthenticated(true)
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
        return children
    } else {
        return (
            <Login />
        )
    }
}