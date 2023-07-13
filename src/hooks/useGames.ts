import { Game } from "@/@types/api"
import { errorToMessage } from "@/helpers/error-helper"
import { fetchGames } from "@/services/games-service"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"

export default function useGames() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState<string>("")
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    setIsLoading(true)
    setError("")

    fetchGames()
      .then((res) => {
        setGames(res)

        const genres = res.map(({ genre }) => genre)
        setGenres([...new Set(genres)])
      })
      .catch((err: AxiosError) => {
        setError(errorToMessage(err))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { isLoading, games, error, genres }
}
