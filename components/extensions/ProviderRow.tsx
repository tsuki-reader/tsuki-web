'use client'

import { endpoint } from "@/helpers/endpoint";
import sendRequest from "@/helpers/request";
import { Provider, Repository } from "@/types/extensions";
import { faDownload, faRotate, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

interface Props {
    provider: Provider
    repository: Repository
    providerType: string
    onProviderInstalled: (providers: Provider[], type: string) => void
}

export function ProviderRow({ provider, repository, providerType, onProviderInstalled }: Props) {
    const [loading, setLoading] = useState<boolean>(false)

    const handleResponse = (providers: Provider[]) => {
        onProviderInstalled(providers, providerType)
        setLoading(false)
    }

    const installProvider = () => {
        setLoading(true)
        const url = endpoint("/api/providers")
        const data = {
            "provider_id": provider.id,
            "repository_id": repository.id,
            "provider_type": providerType
        }
        sendRequest(url, "POST", data)
            .then(handleResponse)
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <div className="w-full flex flex-row justify-between items-center p-2 border-2 border-foreground rounded bg-foreground/10">
            <div className="flex flex-row gap-2">
                <Image
                    className="h-6 w-auto"
                    src={provider.icon}
                    alt={`${provider.name} Logo`}
                    width={0}
                    height={0}
                />
                <p>{provider.name}</p>
            </div>
            {!provider.installed && !loading &&
                <FontAwesomeIcon onClick={installProvider} className="text-lg cursor-pointer" icon={faDownload} />
            }
            {provider.installed && !loading &&
                (
                    <div className="flex flex-row gap-2">
                        <FontAwesomeIcon className="text-lg cursor-pointer" icon={faRotate} title="Update" />
                        <FontAwesomeIcon className="text-lg cursor-pointer" icon={faTrashCan} title="Uninstall" />
                    </div>
                )
            }
        </div>
    )
}
