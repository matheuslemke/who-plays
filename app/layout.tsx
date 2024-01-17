import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quem joga?",
  description: "Jogos e partidas dos melhores times",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={raleway.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
