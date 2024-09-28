'use client'

import React, { useEffect, useRef } from "react"

interface Props {
    opened: boolean
    children: React.ReactNode
    onClose?: React.ReactEventHandler<HTMLDialogElement> | undefined
}

export function Modal({ opened, children, onClose }: Props) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = ref.current
        if (opened) {
            if (dialog) {
                dialog.showModal()
            }
            document.body.classList.add('overflow-hidden')
        } else {
            if (dialog) {
                dialog.close()
            }
            document.body.classList.add('overflow-hidden')
        }
    }, [opened])

    const onClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        if (ref.current !== null && event.target === ref.current) {
            ref.current.close()
        }
    }

    return (
        <dialog ref={ref}
            onClick={onClick}
            onClose={onClose}
            className="backdrop:backdrop-blur-sm bg-transparent text-foreground focus:outline-none max-w-[750px] w-full"
        >
            <div className="p-8 rounded border-2 border-foreground bg-background max-h-[500px] overflow-x-hidden m-4">
                {children}
            </div>
        </dialog>
    )
}
