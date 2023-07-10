"use client"

import * as SelectComp from "@radix-ui/react-select"
import clsx from "clsx"
import { CheckIcon, ChevronDown } from "lucide-react"
import React, { forwardRef } from "react"

interface Props {
  onChange?: (value: string) => void
  items?: string[]
  children?: React.ReactNode
  defaultValue?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "center" | "end" | "start"
  label?: string
}

export default function Select({
  onChange,
  items,
  children,
  defaultValue = "Todos",
  side,
  align,
  label,
}: Props) {
  return (
    <SelectComp.Root onValueChange={onChange} defaultValue="all">
      <SelectComp.Trigger
        className={clsx({
          "flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-50 px-2 py-1 text-zinc-500 hover:bg-zinc-100 sm:w-60 md:w-40":
            !children,
        })}
        asChild={!!children}
      >
        {children ? (
          children
        ) : (
          <>
            <SelectComp.Value placeholder={defaultValue} aria-label={label} />
            <SelectComp.Icon>
              <ChevronDown size={24} />
            </SelectComp.Icon>
          </>
        )}
      </SelectComp.Trigger>
      <SelectComp.Portal>
        <SelectComp.Content
          className="rounded-md bg-zinc-50 shadow-md"
          position="popper"
          side={side}
          align={align}
          sideOffset={5}
        >
          <SelectComp.Viewport className="min-w-[6rem] p-2">
            <SelectComp.Group>
              <SelectItem value="all">Todos</SelectItem>
              {items?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectComp.Group>
          </SelectComp.Viewport>
        </SelectComp.Content>
      </SelectComp.Portal>
    </SelectComp.Root>
  )
}

const SelectItem = forwardRef<
  any,
  {
    value: string
    children: React.ReactNode
  }
>(({ children, value }, forwardedRef) => {
  return (
    <SelectComp.Item
      className={
        "flex cursor-pointer items-center rounded-md px-6 py-1 text-zinc-600 outline-none hover:bg-zinc-100"
      }
      value={value}
      ref={forwardedRef}
    >
      <SelectComp.ItemIndicator className="absolute left-2">
        <CheckIcon size={16} />
      </SelectComp.ItemIndicator>
      <SelectComp.ItemText>{children}</SelectComp.ItemText>
    </SelectComp.Item>
  )
})

SelectItem.displayName = "SelectItem"
