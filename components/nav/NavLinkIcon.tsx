'use client'

import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"
import { MouseEventHandler } from "react"

interface Props {
    icon: IconProp
    href?: string | undefined
    onClick?: MouseEventHandler<SVGSVGElement> | undefined
}

export function NavLinkIcon({icon, href, onClick}: Props) {
    const pathname = usePathname()

    const classes = () => {
        return pathname === href ? "text-foreground bg-foreground/10" : "text-foreground/75 hover:text-foreground hover:bg-foreground/10"
    }

    return (
        <FontAwesomeIcon onClick={onClick} className={`rounded px-4 py-2 cursor-pointer ${classes()} transition duration-300 ease-in-out`} icon={icon} />
    )
}
