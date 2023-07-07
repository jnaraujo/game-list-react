"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import { signOut } from "@/libs/auth"
import Link from "next/link"

export default function Navbar() {
  const { user } = useAuthContext()

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
          <Link className="text-zinc-50" href="/auth/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
