import { signOut } from "@/libs/auth"
import * as DropdownMenuComp from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { forwardRef } from "react"

interface Props {
  children?: React.ReactNode
}

export default function DropdownMenu({ children }: Props) {
  function handleLogout() {
    signOut()
  }

  return (
    <DropdownMenuComp.Root>
      <DropdownMenuComp.Trigger>{children}</DropdownMenuComp.Trigger>
      <DropdownMenuComp.Portal>
        <DropdownMenuComp.Content
          className="rounded-md bg-zinc-50 shadow-md"
          side="bottom"
          align="center"
          sideOffset={5}
        >
          <DropdownMenuComp.Group className="min-w-[6rem] p-2">
            <Item asChild>
              <Link href="/profile">Seu perfil</Link>
            </Item>
            <Item asChild>
              <button onClick={handleLogout}>Sair</button>
            </Item>
          </DropdownMenuComp.Group>
        </DropdownMenuComp.Content>
      </DropdownMenuComp.Portal>
    </DropdownMenuComp.Root>
  )
}

const Item = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DropdownMenuComp.Item>
>((props, ref) => (
  <DropdownMenuComp.Item
    className="flex cursor-pointer items-center rounded-md px-6 py-1 text-zinc-600 outline-none hover:bg-zinc-100"
    ref={ref}
    {...props}
  />
))

Item.displayName = "DropdownMenuItem"
