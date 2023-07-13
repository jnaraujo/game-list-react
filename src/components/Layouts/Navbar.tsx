"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import Link from "next/link"
import DropdownMenu from "../DropdownMenu"

export default function Navbar() {
  const { user } = useAuthContext()

  return (
    <nav className="flex h-10 flex-wrap items-center justify-between bg-violet-900 px-4">
      <div>
        <Link href="/" className="text-zinc-50 hover:text-zinc-200">
          Game Search App
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <span className="block max-w-[100px] cursor-pointer truncate text-zinc-200 md:max-w-fit">
                {user.displayName || user.email}
              </span>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-zinc-50 hover:text-zinc-200">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
