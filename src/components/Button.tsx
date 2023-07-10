import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { Loader2 } from "lucide-react"

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: React.ReactNode
  children: React.ReactNode
  loading?: boolean
  secondary?: boolean
  disabled?: boolean
}

export default function Button({
  asChild,
  children,
  className,
  loading,
  secondary,
  disabled,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      disabled={loading || disabled}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg  font-medium  transition-all duration-200",
        className,
        {
          "cursor-not-allowed opacity-50": loading || disabled,
          "bg-violet-800 text-zinc-50 hover:bg-violet-600": !secondary,
          "border-2 border-violet-600 bg-transparent text-violet-600 hover:bg-zinc-100":
            secondary,
        },
      )}
      {...props}
    >
      {loading ? <Loader2 size={22} className="animate-spin" /> : children}
    </Component>
  )
}
