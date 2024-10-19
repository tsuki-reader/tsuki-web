'use client'

import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import React, { useContext, useEffect, useState } from "react";
import { AnilistLogin } from "./AnilistLogin";
import { LoadingScreen } from "../LoadingScreen";
import { Viewer } from "@/types/anilist";
import { ViewerProvider } from "@/contexts/viewer";
import { TokenContext } from "@/contexts/token";

interface Props {
  children: React.ReactNode
}

interface StatusResponse {
  authenticated: boolean
  viewer: Viewer | null
  clientId: string
}

export default function AnilistStatusWrapper({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
  const [clientId, setClientId] = useState<string>("")

  const token = useContext(TokenContext)

  const handleStatus = (json: StatusResponse) => {
    setClientId(json.clientId)
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
    const url = endpoint("/api/anilist/status")
    sendRequest(url, token, "GET")
      .then(handleStatus)
      .catch(handleError)
  }, [token])

  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  if (authenticated) {
    return (
      <ViewerProvider value={currentViewer}>
        {children}
      </ViewerProvider>
    )
  } else {
    return (
      <AnilistLogin clientId={clientId} />
    )
  }
}
