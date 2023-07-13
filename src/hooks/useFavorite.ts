import { listenToUserLikedGames } from "@/libs/storage"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function useFavorite(userId: string | undefined) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let unsubscribe = () => {}
    async function fetch() {
      if (!userId) return

      try {
        unsubscribe = await listenToUserLikedGames(userId, (games) => {
          if (games === null) {
            games = {}
          }
          setFavorites(games)
        })
      } catch (error) {
        toast.error("Erro ao buscar favoritos")
      }
    }

    fetch()

    return () => {
      unsubscribe()
    }
  }, [userId])

  return { favorites }
}
