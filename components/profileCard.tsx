'use client'

// TODO: This component is only temporarily being used on the dashboard
import { useContext } from "react"
import { ViewerContext } from "@/contexts/viewer"
import Image from "next/image"

export function ProfileCard() {
    // We always have a current viewer at this point
    const currentViewer = useContext(ViewerContext)!

    return (
        <div className="flex flex-col gap-8 items-center text-center m-4 p-16">
            <Image
                className="border-2 border-foreground rounded-full"
                src={currentViewer.avatar.large}
                alt="Avatar"
                width={125}
                height={125}
            />
            <h1 className="text-2xl font-bold">{currentViewer.name}</h1>
        </div>
    )
}