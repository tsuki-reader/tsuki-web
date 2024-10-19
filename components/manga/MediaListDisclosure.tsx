import { MediaListGroup } from "@/types/anilist";
import { MangaPoster } from "./MangaPoster";

interface Props {
    list: MediaListGroup
    open?: boolean
}

export function MediaListDisclosure({ list, open }: Props) {
    return (
        <details open={open}>
            <summary className="marker:hidden list-none cursor-pointer">
                <div className="font-bold text-4xl w-fit rounded bg-background p-4 border-2 border-foreground">
                    {list.name}
                </div>
            </summary>
            <div className="pt-8 gap-6 grid grid-cols-2 min-[768px]:grid-cols-3 min-[1080px]:grid-cols-4 min-[1320px]:grid-cols-5 min-[1750px]:grid-cols-6 min-[1850px]:grid-cols-7 min-[2000px]:grid-cols-8">
                {list.entries.map((entry, key) => <MangaPoster key={key} entry={entry} />)}
            </div>
        </details>
    )
}
