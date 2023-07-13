"use client"
import Select from "../../components/Select"
import SearchInput from "../../components/SearchInput"
import { useCallback, useEffect, useMemo, useState } from "react"
import Error from "@/components/Error"
import Cards from "@/components/Layouts/Cards"
import FavoriteFilter from "@/components/FavoriteFilter"
import { getUserLikedGames, getUserRatedGames } from "@/libs/storage"
import SortByRating from "@/components/SortByRating"
import { useAuthContext } from "@/contexts/AuthContext"
import { filterGames, sortGames } from "@/helpers/home-helper"
import animation from "@/styles/animation.module.css"
import { toast } from "react-hot-toast"
import useGames from "@/hooks/useGames"
import useFavorite from "@/hooks/useFavorite"

type Favorites = Record<string, boolean> | null
type UserRating = Record<string, number> | null
type Sort = "asc" | "desc" | null

export default function Home() {
  const { user } = useAuthContext()
  const { error, games, genres, isLoading } = useGames()
  const { favorites, fetchFavorites } = useFavorite(user?.uid)
  const [search, setSearch] = useState<string>("")
  const [genre, setGenre] = useState<string>("all")
  const [userRating, setUserRating] = useState<UserRating>(null)
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false)
  const [sort, setSort] = useState<Sort>(null)

  const fetchRating = useCallback(
    (sort: Sort) => {
      if (!user) {
        return
      }

      getUserRatedGames(user.uid)
        .then((res) => {
          if (res === null) {
            res = {}
          }
          setUserRating(res)
          setSort(sort)
        })
        .catch(() => {
          toast.error("Erro ao buscar avaliações")
        })
    },
    [user],
  )

  function handleFilterFavorites(isChecked: boolean) {
    setFilterFavorites(isChecked)
    if (isChecked) {
      fetchFavorites()
    }
  }

  const filteredGames = useMemo(() => {
    return filterGames(games, {
      search,
      genre,
      favorites,
      shouldFilterFavorites: filterFavorites,
    })
  }, [games, genre, search, favorites, filterFavorites])

  const sortedGames = useMemo(() => {
    return sortGames(filteredGames, {
      rating: userRating,
      sort,
    })
  }, [filteredGames, sort, userRating])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section
        className={`flex w-full flex-col items-center gap-4 bg-violet-800 bg-gamepad-pattern px-4 py-16 text-white ${animation["bg-animation"]}`}
      >
        <div>
          <h1 className="text-center text-3xl font-bold text-zinc-100">
            Game Search App
          </h1>
          <p className="text-center text-lg text-zinc-200">
            Procure por jogos e veja detalhes sobre eles :)
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <SearchInput onChange={setSearch} />
          <div className="flex w-full gap-2 md:w-fit">
            <Select
              defaultValue="Todos"
              items={genres}
              onChange={setGenre}
              label="Gênero"
            />
            <FavoriteFilter onChange={handleFilterFavorites} />
            <SortByRating onChange={fetchRating} />
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
          ratedGames={userRating}
        />
      )}
    </main>
  )
}
