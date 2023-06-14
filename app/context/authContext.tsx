'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function AuthContext({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>
}