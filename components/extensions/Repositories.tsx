'use client'

import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { Repository } from "@/types/extensions"
import { useEffect, useState } from "react"
import { RepositoryButton } from "./RepositoryButton"

export function Repositories() {
    const [repositories, setRepositories] = useState<Repository[]>([])

    const handleResponse = (repos: Repository[]) => {
        setRepositories(repos)
    }

    const renderRepositories = () => {
        return repositories.map((repository, index) => <RepositoryButton key={index} repository={repository} />)
    }

    useEffect(() => {
        const url = endpoint('/api/repositories')
        sendRequest(url)
            .then(handleResponse)
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="my-[150px] mx-12">
            <h1 className="text-3xl font-bold">Installed Repositories</h1>
            <div className="py-8 flex flex-row gap-4 flex-wrap">
                {renderRepositories()}
            </div>
        </div>
    )
}
