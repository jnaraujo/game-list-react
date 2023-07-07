import clsx from "clsx"
import { Heart } from "lucide-react"
import { useState } from "react"

interface Props {
  onChange?: (isFavorite: boolean) => void
}

export default function FavoriteFilter({ onChange }: Props) {
  const [isFavorite, setIsFavorite] = useState(false)

  function handleIsFavorite() {
    setIsFavorite((prev) => !prev)
    onChange?.(!isFavorite)
  }

  return (
    <div
      className="group flex aspect-square h-9 cursor-pointer items-center justify-center rounded-md bg-zinc-50"
      onClick={handleIsFavorite}
    >
      <Heart
        size={24}
        strokeWidth={2}
        className={clsx(
          "text-zinc-400 transition-all duration-200 ease-in-out group-hover:scale-110",
          {
            "!fill-red-500 text-red-500": isFavorite,
          },
        )}
      />
    </div>
  )
}
