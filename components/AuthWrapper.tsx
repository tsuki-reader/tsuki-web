'use client'

import { useEffect, useState } from 'react'
import { LoadingScreen } from './LoadingScreen'
import { TokenProvider } from '@/contexts/token'
import { Login } from './auth/Login'

interface Props {
    children: React.ReactNode
}

export function AuthWrapper ({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Get the token from localStorage
    const storedToken = localStorage.getItem('tsuki_token')
    if (storedToken && storedToken !== '') {
      setToken(storedToken)
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (authenticated && token) {
    return (
            <TokenProvider value={token}>
                {children}
            </TokenProvider>
    )
  } else {
    return <Login />
  }
}
