import { capitalizeText } from "@/helpers/text"
import { Chapter } from "@/types/models"

interface Props {
    chapters: Chapter[]
}

export function ChapterList({ chapters }: Props) {
    return (
        <div className="flex flex-col">
            {chapters.map((chapter, index) => {
                return (
                    <div key={index} className="p-4 border-b-2 border-b-foreground last:border-b-0 cursor-pointer hover:bg-background transform duration-300 ease-in-out">
                        {capitalizeText(chapter.title)}
                    </div>
                )
            })}
        </div>
    )
}
