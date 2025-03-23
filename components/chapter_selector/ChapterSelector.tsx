'use client'

import { TokenContext } from "@/contexts/token"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { MediaList } from "@/types/anilist"
import { useContext, useEffect, useState } from "react"
import { Chapter, InstalledProvider } from "@/types/models"
import { LoadingState } from "./LoadingState"
import { ErrorState } from "./ErrorState"
import { NoProviderState } from "./NoProvidersState"
import { NoProviderSelected } from "./NoProviderSelected"
import Select from "react-dropdown-select"
import styled from "@emotion/styled"
import { ChapterList } from "./ChapterList"

interface Props {
  mediaList: MediaList
  initialChapters: Chapter[]
}

interface AssignResponse {
    mediaList: MediaList,
    chapters: Chapter[]
}

// TODO: Support both manga and comics
export function ChapterSelector({ mediaList, initialChapters }: Props) {
  const [providers, setProviders] = useState<InstalledProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState<InstalledProvider | null>(mediaList.mapping?.installedProvider ?? null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters)

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

  const currentState = () => {
    if (loading) {
      return <LoadingState />
    }

    if (errorMessage) {
      return <ErrorState message={errorMessage} />
    }

    if (providers.length === 0) {
      return <NoProviderState />
    }

    if (selectedProvider === null) {
      return <NoProviderSelected />
    }

    return <ChapterList chapters={chapters} />
  }

  const handleAssign = (response: AssignResponse) => {
    setChapters(response.chapters)
  }

  const onProviderSelected = (newProvider: string | object | null) => {
    const p = newProvider !== null ? newProvider as InstalledProvider : null
    if (p === null) { return }
    setSelectedProvider(p)
    const url = endpoint(`/api/manga/${mediaList.media.id}/assign`)
    sendRequest(url, token, "POST", {installed_provider_id: p.id})
      .then(handleAssign)
      .catch((e: {error: string}) => setErrorMessage(e.error))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full max-w-80">
        <StyledSelect
          options={providers}
          values={selectedProvider !== null ? [selectedProvider] : []}
          onChange={(value) => onProviderSelected(value.at(0) ?? null)}
          labelField="name"
          valueField="id"
          searchBy="name"
          dropdownHandle={false}
          placeholder="Select a provider"
          color="#111427"
          dropdownHeight="150px"
        />
      </div>
      <div className="rounded h-96 bg-foreground/10 border-2 border-foreground">
        {currentState()}
      </div>
    </div>
  )
}

const StyledSelect = styled(Select)`
  border: 2px solid rgb(var(--foreground)) !important;
  border-radius: 0.25rem;
  padding: 5px 10px;
  background-color: rgba(var(--foreground-with-commas), 0.1);
  cursor: text;

  .react-dropdown-select-dropdown {
    border: 2px solid rgb(var(--foreground)) !important;
    border-radius: 0.25rem;
    background-color: rgb(var(--foreground));
    color: rgb(var(--background));
    left: -2px;
    top: 34px;
  }

  .react-dropdown-select-item-selected {
    background-color: rgb(var(--background)) !important;
    color: rgb(var(--foreground)) !important;
    font-weight: bold;
    border-bottom: none !important;
  }

  .react-dropdown-select-item {
    border-bottom: none !important;
  }

  .react-dropdown-select-input::placeholder {
    color: rgb(var(--foreground));
  }
`
