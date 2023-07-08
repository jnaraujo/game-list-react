"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import { signOut } from "@/libs/auth"
import Link from "next/link"
import Select from "../Select"
import DropdownMenu from "../DropdownMenu"

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
            <DropdownMenu>
              <span className="cursor-pointer text-zinc-200">{user.email}</span>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-zinc-50 hover:text-zinc-200"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="text-zinc-50 hover:text-zinc-200"
            >
              Criar conta
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
