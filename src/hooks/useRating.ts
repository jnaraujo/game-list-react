import { getUserRatedGames } from "@/libs/storage"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function useRating(userId: string | undefined) {
  const [rating, setRating] = useState<Record<string, number>>({})

  const fetchRating = useCallback(() => {
    if (!userId) {
      return
    }

    getUserRatedGames(userId)
      .then((res) => {
        if (res === null) {
          res = {}
        }
        setRating(res)
      })
      .catch(() => {
        toast.error("Erro ao buscar avaliações")
      })
  }, [userId])

  useEffect(() => {
    fetchRating()
  }, [fetchRating])

  return {
    rating,
    fetchRating,
  }
}
