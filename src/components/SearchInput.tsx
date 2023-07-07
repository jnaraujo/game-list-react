import { Search } from "lucide-react"

interface SearchInputProps {
  onChange?: (value: string) => void
}

export default function SearchInput({ onChange }: SearchInputProps) {
  return (
    <div className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-zinc-50 px-2 md:w-96">
      <Search size={24} className="text-zinc-400" />
      <input
        type="text"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Digite o nome do jogo"
        className="placeholder:zinc-400 w-full bg-transparent text-zinc-600 focus:outline-none"
      />
    </div>
  )
}
