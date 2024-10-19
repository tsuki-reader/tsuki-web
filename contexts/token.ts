import { createContext } from "react"

export const TokenContext = createContext<string>("")

export const TokenProvider = TokenContext.Provider
