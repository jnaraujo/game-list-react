"use client"
import Select from "../../components/Select"
import SearchInput from "../../components/SearchInput"
import { useMemo, useState, useTransition } from "react"
import Error from "@/components/Error"
import Cards from "@/components/Layouts/Cards"
import FavoriteFilter from "@/components/FavoriteFilter"
import SortByRating from "@/components/SortByRating"
import { useAuthContext } from "@/contexts/AuthContext"
import { filterGames, sortGames } from "@/helpers/home-helper"
import animation from "@/styles/animation.module.css"
import useGames from "@/hooks/useGames"
import useFavorite from "@/hooks/useFavorite"
import useRating from "@/hooks/useRating"

type Sort = "asc" | "desc" | null

export default function Home() {
  const [_, startTransition] = useTransition()

  const { user } = useAuthContext()
  const { error, games, genres, isLoading } = useGames()
  const { favorites } = useFavorite(user?.uid)
  const { rating } = useRating(user?.uid)

  const [search, setSearch] = useState<string>("")
  const [genre, setGenre] = useState<string>("all")
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false)
  const [sort, setSort] = useState<Sort>(null)

  function handleSearch(value: string) {
    startTransition(() => {
      setSearch(value)
    })
  }

  function handleFilterFavorites(isChecked: boolean) {
    setFilterFavorites(isChecked)
  }

  function handleRatingChange(sort: Sort) {
    setSort(sort)
  }

  const filteredGames = useMemo(() => {
    console.time("filter")
    const g = filterGames(games, {
      search,
      genre,
      favorites,
      shouldFilterFavorites: filterFavorites,
    })
    console.timeEnd("filter")

    return g
  }, [games, genre, search, favorites, filterFavorites])

  const sortedGames = useMemo(() => {
    console.time("sort")
    const s = sortGames(filteredGames, {
      rating,
      sort,
    })
    console.timeEnd("sort")

    return s
  }, [filteredGames, sort, rating])

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
          <SearchInput onChange={handleSearch} />
          <div className="flex w-full gap-2 md:w-fit">
            <Select
              defaultValue="Todos"
              items={genres}
              onChange={setGenre}
              label="Gênero"
            />
            <FavoriteFilter onChange={handleFilterFavorites} />
            <SortByRating onChange={handleRatingChange} />
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
          ratedGames={rating}
        />
      )}
    </main>
  )
}
