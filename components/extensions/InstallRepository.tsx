import { ChangeEvent, useState } from "react"
import { Modal } from "../Modal"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"

interface Props {
    opened: boolean
    onRepoInstalled: () => void
    onClose: React.ReactEventHandler<HTMLDialogElement>
}

export function InstallRepository({ opened, onRepoInstalled, onClose }: Props) {
    const [valid, setValid] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const isValidUrl = (url: string) => {
        try {
          new URL(url);
          return true;
        } catch (err) {
          return false;
        }
      }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue)
        if (isValidUrl(newValue)) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const handleResponse = () => {
        onRepoInstalled()
        setValue('')
    }

    const install = () => {
        const url = endpoint('/api/repositories')
        const data = {
            'url': value
        }
        sendRequest(url, 'POST', data)
            .then(handleResponse)
            .catch((error) => {
                // TODO: Report error to frontend
                console.log(error)
            })
    }

    return (
        <Modal opened={opened} onClose={onClose}>
            <div className="flex flex-col gap-4 text-center">
                <h1 className="font-bold text-3xl">Install from url</h1>
                <p>Install a repository by providing the URL to the remote repository file.</p>
                <input value={value}
                    onChange={onChange}
                    placeholder="https://example.com/repo.json"
                    className="rounded p-2 text-foreground bg-foreground/25 border-2 border-foreground placeholder:text-foreground"
                />
                <button disabled={!valid}
                    className="rounded p-2 border-2 border-foreground hover:bg-foreground/10 transition duration-300 ease-in-out disabled:opacity-50"
                    onClick={install}
                >
                    Install
                </button>
            </div>
        </Modal>
    )
}
