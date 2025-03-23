'use client'

import { MediaList } from '@/types/anilist'
import { Chapter } from '@/types/models'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

interface Props {
  mediaList: MediaList
  currentChapter: Chapter | undefined
  setCurrentChapter: (chapter: Chapter | undefined) => void
}

export default function Reader ({ mediaList, currentChapter, setCurrentChapter }: Props) {
  const [open, setOpen] = useState<boolean | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(10)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        closeReader()
        break
      case 'ArrowLeft':
        setCurrentPage(prev => Math.max(1, prev - 1))
        break
      case 'ArrowRight':
        setCurrentPage(prev => Math.min(pageCount, prev + 1))
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (currentChapter) {
      if (containerRef.current) containerRef.current.style.visibility = 'visible'
      setOpen(true)
      setCurrentPage(1)
      document.body.style.overflow = 'hidden'
      // TODO: Fetch chapter pages
    } else {
      setOpen(false)
      document.body.style.overflow = 'auto'
    }
  }, [currentChapter])

  const closeReader = () => {
    setCurrentChapter(undefined)
  }

  return (
    <div ref={containerRef} data-open={open} style={{ visibility: 'hidden' }} className='bg-black fixed left-0 inset-y-0 z-50 h-dvh w-full flex flex-col data-[open=true]:pointer-events-auto data-[open=false]:pointer-events-none data-[open=true]:animate-in data-[open=true]:slide-in-from-left data-[open=false]:animate-out data-[open=false]:slide-out-to-left transition fill-mode-forwards duration-300 ease-in-out'>
      <div className='w-full flex gap-2 bg-background'>
        <h2 className='m-2 font-bold'>{mediaList.media.title.english} - {currentChapter?.title}</h2>
      </div>
      <div className='w-full h-full'></div>
      <div className='w-full flex gap-2 bg-background'>
        <FontAwesomeIcon icon={faCircleXmark} onClick={closeReader} className='text-2xl cursor-pointer m-4' />

        <div className='w-full m-4 ml-0 bg-foreground/25 h-2 my-auto rounded-full'>
          <div className='h-full bg-foreground rounded-full' style={{ width: `${currentPage / pageCount * 100}%` }}></div>
        </div>

        <FontAwesomeIcon icon={faGear} className='text-2xl cursor-pointer m-4' />
      </div>
    </div>
  )
}
