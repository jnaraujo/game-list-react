import { useAuthContext } from "@/contexts/AuthContext"
import { useModalContext } from "@/contexts/ModalContext"
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Filter } from "lucide-react"
import { useState } from "react"
import RequestLogin from "./RequestLogin"
import Tooltip from "./Tooltip"

type Sort = "asc" | "desc" | null

interface Props {
  onChange?: (sort: Sort) => void
}

export default function SortByStars({ onChange }: Props) {
  const { user } = useAuthContext()
  const { openModal } = useModalContext()

  const [sort, setSort] = useState<Sort>(null)

  function handleClick() {
    if (!user) {
      openModal(<RequestLogin />)
      return
    }

    const nextSort = sort === null ? "desc" : sort === "desc" ? "asc" : null
    setSort(nextSort)
    onChange?.(nextSort)
  }

  const Icon =
    sort === null
      ? Filter
      : sort === "desc"
      ? ArrowDownWideNarrow
      : ArrowUpNarrowWide

  return (
    <Tooltip
      text={
        sort === null
          ? "Ordenar por favoritos"
          : sort === "desc"
          ? "Ordenar do mais favoritado para o menos favoritado"
          : "Ordenar do menos favoritado para o mais favoritado"
      }
      placement="bottom"
    >
      <div
        className="group flex aspect-square h-9 cursor-pointer items-center justify-center rounded-md bg-zinc-50"
        onClick={handleClick}
      >
        <Icon
          size={24}
          strokeWidth={2}
          className="text-zinc-400 transition-all duration-200 ease-in-out group-hover:scale-110"
        />
      </div>
    </Tooltip>
  )
}
