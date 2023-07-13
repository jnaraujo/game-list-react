import { listenToUserRatedGames } from "@/libs/storage"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function useRating(userId: string | undefined) {
  const [rating, setRating] = useState<Record<string, number>>({})

  useEffect(() => {
    let unsubscribe = () => {}

    async function fetch() {
      if (!userId) return

      try {
        unsubscribe = await listenToUserRatedGames(userId, (games) => {
          if (games === null) {
            games = {}
          }
          setRating(games)
        })
      } catch (error) {
        toast.error("Erro ao buscar avaliações")
      }
    }

    fetch()

    return () => {
      console.log(unsubscribe)

      unsubscribe()
    }
  }, [userId])

  return {
    rating,
  }
}
