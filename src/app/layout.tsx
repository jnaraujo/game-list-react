import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Game Search App",
  description: "Um app para buscar jogos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-zinc-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
