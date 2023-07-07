"use client"
import { ApiResponse } from "@/@types/api"
import Filter from "../../components/Filter"
import SearchInput from "../../components/SearchInput"
import api from "@/libs/api"
import { useEffect, useMemo, useState } from "react"
import type { AxiosError } from "axios"
import { errorToMessage } from "@/helpers/error-helper"
import Error from "@/components/Error"
import Cards from "@/components/Layouts/Cards"
import FavoriteFilter from "@/components/FavoriteFilter"
import { getUserLikedGames, getUserRatedGames } from "@/libs/storage"
import SortByStars from "@/components/SortByStars"
import { get } from "http"

export default function Home() {
  const [games, setGames] = useState<ApiResponse>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [genre, setGenre] = useState<string>("all")
  const [favorites, setFavorites] = useState<Record<string, boolean> | null>(
    null,
  )
  const [ratedGames, setRatedGames] = useState<Record<string, number> | null>(
    null,
  )
  const [shouldFilterFavorites, setShouldFilterFavorites] =
    useState<boolean>(false)
  const [sort, setSort] = useState<"asc" | "desc" | null>(null)
  const [genres, setGenres] = useState<string[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    getUserLikedGames().then((res) => {
      if (res === null) {
        res = {}
      }
      setFavorites(res)
    })

    getUserRatedGames().then((res) => {
      if (res === null) {
        res = {}
      }
      setRatedGames(res)
    })

    setIsLoading(true)
    setError("")
    api
      .get<ApiResponse>("/data")
      .then((res) => {
        setGames(res.data)

        const genres = res.data.map((game) => game.genre)
        setGenres([...new Set(genres)])
      })
      .catch((err: AxiosError) => {
        setError(errorToMessage(err))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  function handleSearch(value: string) {
    setSearch(value)
  }

  function handleFavoriteFilter(isFavorite: boolean) {
    getUserLikedGames().then((res) => {
      if (res === null) {
        res = {}
      }
      setFavorites(res)
      setShouldFilterFavorites(isFavorite)
    })
  }

  function handleSortByStars(sort: "asc" | "desc" | null) {
    getUserRatedGames().then((res) => {
      if (res === null) {
        res = {}
      }
      setRatedGames(res)
      setSort(sort)
    })
  }

  function handleGenre(value: string) {
    setGenre(value)
  }

  const filteredGames = useMemo(() => {
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
  }, [games, genre, search, favorites, shouldFilterFavorites])

  const sortedGames = useMemo(() => {
    return filteredGames.sort((a, b) => {
      const aRating = ratedGames?.[a.id] ?? 0
      const bRating = ratedGames?.[b.id] ?? 0

      if (sort === "asc") {
        return aRating - bRating
      } else if (sort == "desc") {
        return bRating - aRating
      } else {
        return a.title.localeCompare(b.title)
      }
    })
  }, [filteredGames, sort, ratedGames])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex w-full flex-col items-center gap-4 bg-violet-800 px-4 py-16 text-white">
        <div>
          <h1 className="text-center text-3xl font-bold text-zinc-100">
            Game Search App
          </h1>
          <p className="text-center text-lg text-zinc-200">
            Procure por jogos e veja detalhes sobre eles :)
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <SearchInput onChange={handleSearch} />
          <div className="flex w-full gap-2 md:w-fit">
            <Filter items={genres} onChange={handleGenre} />
            <FavoriteFilter onChange={handleFavoriteFilter} />
            <SortByStars onChange={handleSortByStars} />
          </div>
        </div>
      </section>

      {error ? (
        <Error message={error} />
      ) : (
        <Cards
          games={sortedGames}
          isLoading={isLoading}
          likedGames={favorites}
          ratedGames={ratedGames}
        />
      )}
    </main>
  )
}
