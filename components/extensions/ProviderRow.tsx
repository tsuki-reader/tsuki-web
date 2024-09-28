import { Provider } from "@/types/extensions";
import Image from "next/image";

interface Props {
    provider: Provider
}

export function ProviderRow({ provider }: Props) {
    return (
        <div className="w-full flex flex-row p-2 border-2 border-foreground rounded bg-foreground/10">
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
        </div>
    )
}
