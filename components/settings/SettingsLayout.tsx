'use client'

// TODO: Settings

import React, { useState } from 'react'
import { Repositories } from '../extensions/Repositories'

export function SettingsLayout () {
  const [screen, setScreen] = useState<number>(0)

  const getScreen = () => {
    const screens = [
            <Repositories key={0} />
    ]

    return screens[screen]
  }

  const classesForScreen = (screenIndex: number) => {
    return screenIndex === screen ? 'text-foreground bg-foreground/10' : 'text-foreground/75 hover:text-foreground hover:bg-foreground/10'
  }

  return (
        <div>
            <aside className="box-border h-screen left-0 fixed top-0 w-[250px] border-r-2 border-foreground mt-[100px] px-8 py-8 flex gap-4 flex-col items-end">
                <button onClick={() => setScreen(0)} className={`rounded px-4 py-2 cursor-pointer h-fit ${classesForScreen(0)} transition duration-300 ease-in-out`}>
                    Repositories
                </button>
            </aside>
            <div className="mt-[100px] ml-[250px] p-8">
                {getScreen()}
            </div>
        </div>
  )
}
