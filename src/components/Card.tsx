import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CardProps {
  title: string
  description: string
  image: string
  platform: string
  genre: string
  releaseDate: Date
  url: string
}

export default function Card({
  title,
  description,
  image,
  platform,
  genre,
  releaseDate,
  url,
}: CardProps) {
  return (
    <div className="group relative flex overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:flex-col">
      <Image
        src={image}
        width={500}
        height={500}
        alt={`Imagem do jogo ${title}`}
        className="h-full w-28 shrink-0 object-cover transition-all duration-300 ease-in-out group-hover:scale-105 md:h-56 md:w-full"
      />
      <span className="absolute right-1 top-1 hidden rounded-md bg-zinc-800 px-2 text-xs text-white shadow-sm md:block">
        {platform}
      </span>

      <div className="flex flex-1 flex-col justify-between p-2">
        <div>
          <span className="block text-sm text-zinc-400">
            {genre} | {releaseDate.getFullYear()}
          </span>
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
