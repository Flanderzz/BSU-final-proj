import type { ReactNode } from "react"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

export const metadata = {
  title: "Bowie State Student Hub",
  description: "Campus events, clubs, marketplace and more.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
``
