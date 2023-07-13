import { Game } from "@/@types/api"

interface FilterGameParams {
  search: string
  genre: string
  shouldFilterFavorites: boolean
  favorites: Record<string, boolean> | null
}

export function filterGames(
  games: Game[],
  { search, genre, shouldFilterFavorites, favorites }: FilterGameParams,
) {
  return games.filter((game) => {
    const doesTitleIncludesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const doesGameGenreIncludesGenre =
      genre === "all" || game.genre.toLowerCase() === genre.toLowerCase()

    const isFavorite = favorites?.[game.id]
    const shouldShowFavorite = !shouldFilterFavorites || isFavorite

    return (
      doesTitleIncludesSearch &&
      doesGameGenreIncludesGenre &&
      shouldShowFavorite
    )
  })
}

interface SortGamesParams {
  rating: Record<string, number> | null
  sort: "asc" | "desc" | null
}

export function sortGames(games: Game[], { rating, sort }: SortGamesParams) {
  return games.sort((a, b) => {
    const aRating = rating?.[a.id] ?? 0
    const bRating = rating?.[b.id] ?? 0

    // Jogos sem avaliação devem ser mostrados por último
    if (aRating === 0) {
      return 1
    } else if (bRating === 0) {
      return -1
    }

    if (sort === "asc") {
      return aRating - bRating
    } else if (sort == "desc") {
      return bRating - aRating
    }

    return a.title.localeCompare(b.title)
  })
}
