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
import { getUserLikedGames } from "@/libs/storage"

export default function Home() {
  const [games, setGames] = useState<ApiResponse>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [platform, setPlatform] = useState<string>("all")
  const [favorites, setFavorites] = useState<Record<string, boolean> | null>(
    null,
  )
  const [genres, setGenres] = useState<string[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
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

  function handleFavorite(isFavorite: boolean) {
    if (isFavorite) {
      getUserLikedGames().then((res) => {
        if (res === null) {
          res = {}
        }
        setFavorites(res)
      })
    } else {
      setFavorites(null)
    }
  }

  function handlePlatform(value: string) {
    setPlatform(value)
  }

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      return (
        game.title.toLowerCase().includes(search.toLowerCase()) &&
        (platform === "all" || game.genre.includes(platform)) &&
        (favorites === null || favorites[game.id])
      )
    })
  }, [games, platform, search, favorites])

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
            <Filter items={genres} onChange={handlePlatform} />
            <FavoriteFilter onChange={handleFavorite} />
          </div>
        </div>
      </section>

      {error ? (
        <Error message={error} />
      ) : (
        <Cards games={filteredGames} isLoading={isLoading} />
      )}
    </main>
  )
}
