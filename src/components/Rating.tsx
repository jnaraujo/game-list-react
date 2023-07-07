import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
  onClick: (index: number) => void
  rating: number | -1
  count: number
}

export default function Rating({ count, onClick, rating }: Props) {
  const [starIndex, setStarIndex] = useState(-1)

  function handleOnClick(index: number) {
    onClick(index + 1)
  }

  useEffect(() => {
    setStarIndex(rating - 1)
  }, [rating])

  return (
    <div className="flex w-fit items-center gap-1 rounded-md">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <Star
          key={index}
          color="#ffd100"
          size={22}
          strokeWidth={1.5}
          fill={index <= starIndex ? "#ffd100" : "transparent"}
          className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-125"
          onMouseEnter={() => {
            setStarIndex(index)
          }}
          onMouseLeave={() => {
            setStarIndex(rating - 1)
          }}
          onClick={() => {
            handleOnClick(index)
          }}
        />
      ))}
    </div>
  )
}
