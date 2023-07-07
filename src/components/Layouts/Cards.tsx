import CardSkeleton from "../CardSkeleton"
import type { ApiResponse } from "@/@types/api"
import Card from "../Card"
import { AutoSizer, List, WindowScroller } from "react-virtualized"
import Breakpoints from "@/constants/breakpoints"

interface Props {
  games: ApiResponse
  isLoading: boolean
  likedGames?: Record<string, boolean> | null
  ratedGames?: Record<string, number> | null
}

export default function Cards({
  games,
  isLoading,
  ratedGames,
  likedGames,
}: Props) {
  const shouldShowGameNotFound = !isLoading && games.length === 0
  const shouldShowGameList = !isLoading && games.length > 0

  return (
    <section className="container my-8 flex">
      {isLoading ? (
        <div className="grid w-full gap-8 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : null}

      {shouldShowGameList ? (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => {
                const PADDING = 32

                const ITEM_HEIGHT =
                  (width > Breakpoints.md ? 400 : 200) + PADDING
                const ITEMS_COUNT = games.length

                const itemsPerRow = width > Breakpoints.lg ? 3 : 1
                const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow)

                return (
                  <List
                    autoHeight
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    width={width}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={ITEM_HEIGHT}
                    offs
                    rowRenderer={({ index, key, style }) => {
                      const items = []

                      for (
                        let i = index * itemsPerRow;
                        i < Math.min(itemsPerRow * (index + 1), ITEMS_COUNT);
                        i++
                      ) {
                        items.push(games[i])
                      }

                      return (
                        <div
                          key={key}
                          style={style}
                          className="grid gap-16 lg:grid-cols-3"
                        >
                          {items.map((game) => (
                            <Card
                              key={game.id}
                              id={game.id}
                              title={game.title}
                              description={game.short_description}
                              image={game.thumbnail}
                              platform={game.platform}
                              genre={game.genre}
                              releaseDate={new Date(game.release_date)}
                              url={game.freetogame_profile_url}
                              isLiked={likedGames?.[game.id] ?? false}
                              rating={ratedGames?.[game.id] ?? -1}
                            />
                          ))}
                        </div>
                      )
                    }}
                  />
                )
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      ) : null}

      {shouldShowGameNotFound ? (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-lg text-zinc-800">
          Nenhum jogo encontrado :(
        </p>
      ) : null}
    </section>
  )
}
