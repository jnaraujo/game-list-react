"use client"

import AuthProvider from "@/contexts/AuthContext"
import ModalProvider from "@/contexts/ModalContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  )
}
