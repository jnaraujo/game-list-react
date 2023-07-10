"use client"

import AuthProvider from "@/contexts/AuthContext"
import ModalProvider from "@/contexts/ModalContext"
import { Toaster } from "react-hot-toast"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
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
      </ModalProvider>
    </AuthProvider>
  )
}
