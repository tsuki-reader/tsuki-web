import { Repository, Provider } from '@/types/extensions'
import { Modal } from '../Modal'
import Image from 'next/image'
import { ProviderRow } from './ProviderRow'
import { endpoint } from '@/helpers/endpoint'
import sendRequest from '@/helpers/request'
import { useContext, useState } from 'react'
import { ErrorMessage } from '../ErrorMessage'
import { ErrorResponse } from '@/types/requests'
import { SuccessMessage } from '../SuccessMessage'
import { TokenContext } from '@/contexts/token'

interface Props {
    repository: Repository
    opened: boolean
    onClose: React.ReactEventHandler<HTMLDialogElement>
    onRepoUninstall: (repos: Repository[]) => void
    onRepoUpdate: (repo: Repository, idChanged: boolean, oldRepoId: string) => void
}

// TODO: Send a request to retrieve the providers
export function RepositoryModal ({ repository, opened, onClose, onRepoUninstall, onRepoUpdate }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [mangaProviders, setMangaProviders] = useState<Provider[]>(repository.manga_providers)
  const [comicProviders, setComicProviders] = useState<Provider[]>(repository.comic_providers)

  const token = useContext(TokenContext)

  const uninstall = () => {
    const url = endpoint(`/api/repositories/${repository.id}`)
    sendRequest(url, token, 'DELETE')
      .then((repos) => onRepoUninstall(repos))
      .catch((error: ErrorResponse) => setErrorMessage(error.error))
  }

  const update = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    const url = endpoint(`/api/repositories/${repository.id}`)
    sendRequest(url, token, 'PATCH')
      .then((repo: Repository) => {
        setErrorMessage(null)
        setSuccessMessage('Repository updated successfully')
        onRepoUpdate(repo, repo.id !== repository.id, repository.id)
      })
      .catch((error: ErrorResponse) => setErrorMessage(error.error))
  }

  const closeModal = (event: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    setErrorMessage(null)
    setSuccessMessage(null)
    onClose(event)
  }

  const onProviderInstalled = (providers: Provider[], type: string) => {
    if (type === 'comics') {
      setComicProviders(providers)
    } else {
      setMangaProviders(providers)
    }
  }

  const providerRows = (providers: Provider[], providerType: string) => {
    if (providers.length === 0) {
      return (
                <div className="w-full text-center">
                    No providers available
                </div>
      )
    }

    return providers.map((provider, index) => <ProviderRow key={index} provider={provider} repository={repository} providerType={providerType} onProviderInstalled={onProviderInstalled} />)
  }

  return (
        <Modal opened={opened} onClose={closeModal}>
            <div className="flex justify-center mb-8">
                <Image
                    className="h-16 w-auto"
                    src={repository.logo}
                    alt={`${repository.name} Logo`}
                    width={0}
                    height={0}
                />
            </div>
            <div className="flex flex-col w-full items-center mb-8">
                <h1 className="text-3xl font-bold">{repository.name}</h1>
                <small>{repository.id}</small>
            </div>
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-row w-full justify-center gap-4">
                    <button className="whitespace-nowrap h-fit rounded-full py-2 px-4 border-2 border-foreground hover:bg-foreground/10 transition duration-300 ease-in-out"
                        onClick={update}
                    >
                        Update
                    </button>
                    <button className="whitespace-nowrap h-fit rounded-full py-2 px-4 border-2 border-red-500 hover:bg-red-500/10 text-red-500 transition duration-300 ease-in-out"
                        onClick={uninstall}
                    >
                        Uninstall
                    </button>
                </div>
                <ErrorMessage message={errorMessage} />
                <SuccessMessage message={successMessage} />
            </div>
            <div className="flex flex-col w-full gap-8">
                <details open>
                    <summary className="font-bold text-xl cursor-pointer">Manga providers</summary>
                    <div className="mt-4 flex flex-col gap-2">
                        {providerRows(mangaProviders, 'manga')}
                    </div>
                </details>

                <details>
                    <summary className="font-bold text-xl cursor-pointer">Comic providers</summary>
                    <div className="mt-4 flex flex-col gap-2">
                        {providerRows(comicProviders, 'comics')}
                    </div>
                </details>
            </div>
        </Modal>
  )
}
