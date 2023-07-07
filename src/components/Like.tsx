import clsx from "clsx"
import { Heart } from "lucide-react"

interface Props {
  isLiked: boolean
  onClick: (isLiked: boolean) => void
}

export default function Like({ isLiked, onClick }: Props) {
  return (
    <div
      className="cursor-pointer rounded-md bg-zinc-200 p-[6px] transition-all duration-200 ease-in-out hover:scale-110"
      onClick={() => {
        onClick(!isLiked)
      }}
    >
      <Heart
        size={24}
        strokeWidth={2}
        className={clsx("text-zinc-400", {
          "fill-red-600 !text-red-600": isLiked,
        })}
      />
    </div>
  )
}
