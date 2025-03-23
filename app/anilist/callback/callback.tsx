'use client'

import { FullscreenCenter } from '@/components/FullscreenCenter'
import { TokenContext } from '@/contexts/token'
import { endpoint } from '@/helpers/endpoint'
import sendRequest from '@/helpers/request'
import { useContext, useEffect, useState } from 'react'

export default function Callback () {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('Logging in...')

  const token = useContext(TokenContext)

  useEffect(() => {
    const token = window.location.hash.replace('#access_token=', '').replace(/&.*/, '')
    setAccessToken(token)
  }, [])

  useEffect(() => {
    if (accessToken) {
      const url = endpoint('/api/anilist/login')
      const data = {
        access_token: accessToken
      }
      sendRequest(url, token, 'POST', data)
        .then(() => window.location.href = '/manga')
        .catch((error) => {
          console.error(error)
          setMessage('Could not login to AniList')
        })
    }
  }, [accessToken, token])

  return (
    <FullscreenCenter>
      <p className="max-w-[50%] break-words">{message}</p>
    </FullscreenCenter>
  )
}
