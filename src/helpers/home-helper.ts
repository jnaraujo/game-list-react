import { Game } from "@/@types/api"
import { useState } from "react"

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
    const doesGameTitleIncludesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const doesGameGenreIncludesGenre =
      genre === "all" || game.genre.includes(genre)

    const doesGameIsFavorite = !shouldFilterFavorites || favorites?.[game.id]

    return (
      doesGameTitleIncludesSearch &&
      doesGameGenreIncludesGenre &&
      doesGameIsFavorite
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

    if (sort === "asc") {
      return aRating - bRating
    } else if (sort == "desc") {
      return bRating - aRating
    } else {
      return a.title.localeCompare(b.title)
    }
  })
}
