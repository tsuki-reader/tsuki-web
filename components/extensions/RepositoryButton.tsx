import { Repository } from "@/types/extensions";
import Image from "next/image";

interface Props {
    repository: Repository
}

export function RepositoryButton({ repository }: Props) {
    return (
        <div className="flex flex-col p-6 items-center h-fit w-fit gap-4 hover:bg-foreground/10 rounded cursor-pointer transition duration-300 ease-in-out">
            <Image
                className="h-16 w-auto"
                src={repository.logo}
                alt={`${repository.name} Logo`}
                width={0}
                height={0}
            />
            <div className="text-center">
                <p className="font-bold mb-2">{repository.name}</p>
                <small className="font-thin">{repository.id}</small>
            </div>
        </div>
    )
}