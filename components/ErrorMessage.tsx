interface Props {
    message: string | null
}

export function ErrorMessage({ message }: Props) {
    if (message === null) {
        return <></>
    }

    return (
        <p className="text-red-500">{message}</p>
    )
}
