import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { Loader2 } from "lucide-react"

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: React.ReactNode
  children: React.ReactNode
  loading?: boolean
}

export default function Button({
  asChild,
  children,
  className,
  loading,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      disabled={loading}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg bg-violet-800 font-medium text-zinc-50 transition-all duration-200 hover:bg-violet-600",
        className,
        {
          "cursor-not-allowed opacity-50": loading,
        },
      )}
      {...props}
    >
      {loading ? <Loader2 size={22} className="animate-spin" /> : children}
    </Component>
  )
}
