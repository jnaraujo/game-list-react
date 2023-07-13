import { getUserLikedGames } from "@/libs/storage"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function useFavorite(userId: string | undefined) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const fetchFavorites = useCallback(() => {
    if (!userId) return

    getUserLikedGames(userId)
      .then((res) => {
        if (res === null) {
          res = {}
        }
        setFavorites(res)
      })
      .catch(() => {
        toast.error("Erro ao buscar favoritos")
      })
  }, [userId])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  return { favorites, fetchFavorites }
}
