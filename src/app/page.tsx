"use client"
import { ApiResponse } from "@/@types/api"
import Filter from "../components/Filter"
import SearchInput from "../components/SearchInput"
import api from "@/libs/api"
import { useEffect, useMemo, useState } from "react"
import Card from "@/components/Card"
import CardSkeleton from "@/components/CardSkeleton"
import type { AxiosError } from "axios"
import { errorToMessage } from "@/helpers/error-helper"
import Error from "@/components/Error"

export default function Home() {
  const [games, setGames] = useState<ApiResponse>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [platform, setPlatform] = useState<string>("all")
  const [platforms, setPlatforms] = useState<string[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setIsLoading(true)
    setError("")
    api
      .get<ApiResponse>("/data")
      .then((res) => {
        setGames(res.data)

        const platforms = res.data
          .map((game) => game.platform.split(","))
          .flat()

        setPlatforms([...new Set(platforms)])
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

  function handlePlatform(value: string) {
    setPlatform(value)
  }

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      return (
        game.title.toLowerCase().includes(search.toLowerCase()) &&
        (platform === "all" || game.platform.includes(platform))
      )
    })
  }, [games, platform, search])

  const shouldShowGameNotFound =
    !error && !isLoading && filteredGames.length === 0
  const shouldShowGameList = !error && !isLoading && filteredGames.length > 0

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
          <Filter items={platforms} onChange={handlePlatform} />
        </div>
      </section>

      <section className="container my-8 grid gap-12 md:grid-cols-3">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : null}

        {shouldShowGameList
          ? filteredGames.map((game, index) => (
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
        {error && <Error message={error} />}
      </section>
    </main>
  )
}
