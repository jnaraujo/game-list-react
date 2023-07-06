import { Star } from "lucide-react"
import { useState } from "react"

interface Props {
  onClick: (index: number) => void
  rating: number | -1
  count: number
}

export default function Rating({ count, onClick, rating = -1 }: Props) {
  const [starIndex, setStarIndex] = useState(rating)

  function handleOnClick(index: number) {
    onClick(index)
    rating = index
  }

  return (
    <div className="flex items-center gap-[1px] rounded-md bg-zinc-100 p-[3px]">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <Star
          key={index}
          color="#ffd100"
          size={20}
          strokeWidth={1.5}
          fill={index <= starIndex ? "#ffd100" : "transparent"}
          className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-125"
          onMouseEnter={() => {
            setStarIndex(index)
          }}
          onMouseLeave={() => {
            setStarIndex(rating)
          }}
          onClick={() => {
            handleOnClick(index)
          }}
        />
      ))}
    </div>
  )
}
