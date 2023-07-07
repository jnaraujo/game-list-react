"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import { useModalContext } from "@/contexts/ModalContext"
import LoginForm from "../Auth/LoginForm"
import { signOut } from "@/libs/auth"

export default function Navbar() {
  const { openModal } = useModalContext()
  const { user } = useAuthContext()

  function handleLogin() {
    openModal(<LoginForm />)
  }

  function handleLogout() {
    signOut()
  }

  return (
    <nav className="flex h-10 flex-wrap items-center justify-end bg-violet-900 px-4">
      <div>
        {user ? (
          <div className="flex items-center gap-6">
            <span className="text-zinc-200">{user.email}</span>
            <button className="text-zinc-50" onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <button className="text-zinc-50" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}
