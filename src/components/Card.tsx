import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Rating from "./Rating"
import { useAuthContext } from "@/contexts/AuthContext"
import LoginForm from "./Auth/LoginForm"
import { useModalContext } from "@/contexts/ModalContext"
import {
  setGameUserRating,
  getGameUserRating,
  setGameUserLike,
  getGameUserLike,
} from "@/libs/storage"
import { useEffect, useState } from "react"
import Like from "./Like"

interface CardProps {
  id: number
  title: string
  description: string
  image: string
  platform: string
  genre: string
  releaseDate: Date
  url: string
}

export default function Card({
  id: gameId,
  title,
  description,
  image,
  platform,
  genre,
  releaseDate,
  url,
}: CardProps) {
  const { user } = useAuthContext()
  const { openModal } = useModalContext()
  const [rating, setRating] = useState(-1)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    console.log("useEffect")

    getGameUserRating(gameId).then((rating) => {
      setRating(rating || -1)
    })

    getGameUserLike(gameId).then((liked) => {
      setLiked(liked || false)
    })
  }, [gameId])

  function onRatingClick(rating: number) {
    if (!user) {
      openModal(<LoginForm />)
      return
    }

    setGameUserRating(gameId, rating)
    setRating(rating)
  }

  function onLikeClick(isLiked: boolean) {
    if (!user) {
      openModal(<LoginForm />)
      return
    }

    setGameUserLike(gameId, isLiked)
    setLiked(isLiked)
  }

  return (
    <div className="group relative flex overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:flex-col">
      <div className="overflow-hidden">
        <Image
          src={image}
          width={500}
          height={500}
          alt={`Imagem do jogo ${title}`}
          className="h-full w-28 shrink-0 object-cover transition-all duration-300 ease-in-out group-hover:scale-105 md:h-56 md:w-full"
        />
      </div>

      <span className="absolute left-1 top-1 hidden rounded-md bg-zinc-800 px-2 text-xs text-white shadow-sm md:block">
        {platform}
      </span>

      <div className="absolute right-1 top-1">
        <Like isLiked={liked} onClick={onLikeClick} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-2">
        <div>
          <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
            <span className="block text-sm text-zinc-400">
              {genre} | {releaseDate.getFullYear()}
            </span>
            <Rating count={5} onClick={onRatingClick} rating={rating} />
          </div>
          <h3 className="mt-1 line-clamp-2 font-bold text-zinc-900">{title}</h3>
          <p className="line-clamp-4 text-sm text-zinc-500">{description}</p>
        </div>

        <Link
          href={url}
          className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-violet-800 p-1 font-medium text-zinc-50 transition-all duration-200 hover:bg-violet-600"
          target="_blank"
        >
          Ver mais <ArrowUpRight />
        </Link>
      </div>
    </div>
  )
}
