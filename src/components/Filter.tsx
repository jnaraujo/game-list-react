"use client"

import * as Select from "@radix-ui/react-select"
import clsx from "clsx"
import { CheckIcon, ChevronDown } from "lucide-react"
import React, { forwardRef } from "react"

interface FilterProps {
  onChange?: (value: string) => void
  items?: string[]
}

export default function Filter({ onChange, items }: FilterProps) {
  return (
    <Select.Root onValueChange={onChange} defaultValue="all">
      <Select.Trigger
        className={clsx(
          "flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-50 px-2 py-1 text-zinc-500 hover:bg-zinc-100 sm:w-60 md:w-40",
        )}
        aria-label="Food"
      >
        <Select.Value placeholder="Todos" />
        <Select.Icon>
          <ChevronDown size={24} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="rounded-md bg-zinc-50 shadow-md"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="min-w-[6rem] p-2">
            <Select.Group>
              <SelectItem value="all">Todos</SelectItem>
              {items?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
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
