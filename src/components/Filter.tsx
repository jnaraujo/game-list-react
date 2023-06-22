"use client"

import * as Select from "@radix-ui/react-select"
import clsx from "clsx"
import { CheckIcon, SlidersHorizontal } from "lucide-react"
import React, { forwardRef } from "react"

export default function Filter() {
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <Select.Root onValueChange={setSelected}>
      <Select.Trigger
        className={clsx(
          "flex h-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-1 text-zinc-500 hover:bg-zinc-100",
        )}
        aria-label="Food"
      >
        <Select.Icon className="SelectValue">
          <SlidersHorizontal size={24} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="rounded-md bg-zinc-50 shadow-md"
          position="popper"
        >
          <Select.Viewport className="min-w-[6rem] p-2">
            <Select.Group>
              <SelectItem value="all" defaultChecked>
                Todos
              </SelectItem>
              <SelectItem value="pc">PC</SelectItem>
              <SelectItem value="playstation">Playstation</SelectItem>
              <SelectItem value="xbox">Xbox</SelectItem>
              <SelectItem value="nintendo">Nintendo</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = forwardRef<
  any,
  {
    value: string
    defaultChecked?: boolean
    children: React.ReactNode
  }
>(({ children, value, defaultChecked }, forwardedRef) => {
  return (
    <Select.Item
      className={
        "flex cursor-pointer items-center rounded-md px-6 py-1 text-zinc-600 outline-none hover:bg-zinc-100"
      }
      value={value}
      ref={forwardedRef}
    >
      <Select.ItemIndicator className="absolute left-2" defaultChecked>
        <CheckIcon size={16} />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
})

SelectItem.displayName = "SelectItem"
