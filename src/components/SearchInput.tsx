import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <div className="flex h-full items-center justify-center gap-2 rounded-md bg-zinc-50 px-2">
      <Search size={24} className="text-zinc-400" />
      <input
        type="text"
        placeholder="Digite o nome do jogo"
        className="placeholder:zinc-400 flex-1 bg-transparent text-zinc-600 focus:outline-none"
      />
    </div>
  )
}
