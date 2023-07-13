import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Rating from "./Rating"
import { useAuthContext } from "@/contexts/AuthContext"
import { useModalContext } from "@/contexts/ModalContext"
import { setGameUserRating, setGameUserLike } from "@/libs/storage"
import { useEffect, useState } from "react"
import Like from "./Like"
import RequestLogin from "./RequestLogin"
import { toast } from "react-hot-toast"

interface CardProps {
  id: number
  title: string
  description: string
  image: string
  platform: string
  genre: string
  releaseDate: Date
  url: string
  isLiked?: boolean
  rating?: number
}

export default function Card({
  id,
  title,
  description,
  image,
  platform,
  genre,
  releaseDate,
  url,
  isLiked = false,
  rating: initialRating = -1,
}: CardProps) {
  const { user } = useAuthContext()
  const { openModal } = useModalContext()
  const [rating, setRating] = useState(initialRating)
  const [liked, setLiked] = useState(isLiked)

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  useEffect(() => {
    setLiked(isLiked)
  }, [isLiked])

  function onRatingClick(rating: number) {
    if (!user) {
      openModal(<RequestLogin />)
      return
    }

    setGameUserRating(id, rating, user.uid)
      .then(() => {
        setRating(rating)
      })
      .catch(() => {
        toast.error("Erro ao avaliar o jogo")
      })
  }

  function onLikeClick(isLiked: boolean) {
    if (!user) {
      openModal(<RequestLogin />)
      return
    }

    setGameUserLike(id, isLiked, user.uid)
      .then(() => {
        setLiked(isLiked)
      })
      .catch(() => {
        toast.error("Erro ao curtir o jogo")
      })
  }

  return (
    <div className="group relative flex h-[200px] w-full animate-fadeIn overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:h-[400px] md:flex-col">
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
          <p className="line-clamp-3 text-sm text-zinc-500">{description}</p>
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
