"use client"

import { useContext, useState } from "react"
import { FullscreenCenter } from "../FullscreenCenter"
import { Logo } from "../svg/Logo"
import { endpoint } from "@/helpers/endpoint"
import sendRequest from "@/helpers/request"
import { usePathname } from "next/navigation"
import { ErrorMessage } from "../ErrorMessage"
import { TokenContext } from "@/contexts/token"

interface Token {
  token: string
}

interface ErrorResponse {
  error: string
}

export function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const token = useContext(TokenContext)

  const pathname = usePathname()

  const handleStatus = (json: Token) => {
    localStorage.setItem("tsuki_token", json.token)
    window.location.href = pathname
  }

  const login = () => {
    const url = endpoint("/auth/login")
    const data = {
      username,
      password,
    }
    sendRequest(url, token, "POST", data)
      .then(handleStatus)
      .catch((e: ErrorResponse) => setErrorMessage(e.error))
  }

  return (
    <FullscreenCenter>
      <div className="flex flex-col gap-8 items-center w-full">
        <Logo width={200} height={150} className="ml-4" />
        <h1 className="text-4xl font-bold tracking-wider">Login</h1>
        <ErrorMessage message={errorMessage} />
        <div className="flex flex-col gap-4 w-full max-w-[500px] px-4">
          <label htmlFor="username">Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded p-2 text-foreground bg-foreground/25 border-2 border-foreground placeholder:text-foreground"
            id="username"
          />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-[500px] px-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded p-2 text-foreground bg-foreground/25 border-2 border-foreground placeholder:text-foreground"
            id="password"
          />
        </div>
        <div className="px-4 w-full max-w-[500px]">
          <button
            className="rounded w-full p-2 border-2 border-foreground hover:bg-foreground/10 transition duration-300 ease-in-out disabled:opacity-50"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </FullscreenCenter>
  )
}
