import CardSkeleton from "../CardSkeleton"
import type { ApiResponse } from "@/@types/api"
import Card from "../Card"

interface Props {
  games: ApiResponse
  isLoading: boolean
}

export default function Cards({ games, isLoading }: Props) {
  const shouldShowGameNotFound = !isLoading && games.length === 0
  const shouldShowGameList = !isLoading && games.length > 0

  return (
    <section className="container my-8 grid gap-12 md:grid-cols-3">
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : null}

      {shouldShowGameList
        ? games.map((game, index) => (
            <Card
              key={index}
              title={game.title}
              description={game.short_description}
              genre={game.genre}
              image={game.thumbnail}
              platform={game.platform}
              releaseDate={new Date(game.release_date)}
              url={game.freetogame_profile_url}
            />
          ))
        : null}

      {shouldShowGameNotFound ? (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-lg text-zinc-800">
          Nenhum jogo encontrado :(
        </p>
      ) : null}
    </section>
  )
}
