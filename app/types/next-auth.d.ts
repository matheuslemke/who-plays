import NextAuth, { User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User
    accessToken: string
  }
}
