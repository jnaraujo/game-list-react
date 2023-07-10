"use client"

import AuthProvider from "@/contexts/AuthContext"
import ConfettiProvider from "@/contexts/ConfettiContext"
import ModalProvider from "@/contexts/ModalContext"
import { Toaster } from "react-hot-toast"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <ConfettiProvider>
          {children}

          <Toaster
            toastOptions={{
              duration: 5000,
              style: {
                fontFamily: "var(--font-sans)",
              },
            }}
            position="top-center"
          />
        </ConfettiProvider>
      </ModalProvider>
    </AuthProvider>
  )
}
