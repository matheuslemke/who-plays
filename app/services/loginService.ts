import { Session } from "next-auth"
import { getSession, signIn } from "next-auth/react"

export const login = async (): Promise<Session | null> => {
  const session = await getSession()

  if (!session) {
    await signIn()
    return null
  }
  return session
}
