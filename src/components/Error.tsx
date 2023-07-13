import Image from "next/image"
import Button from "./Button"

interface Props {
  message: string
}
export default function Error({ message }: Props) {
  function handleReload() {
    if (typeof window === "undefined") return
    window.location.reload()
  }
  return (
    <div className="m-4 flex w-72 flex-col items-center justify-center gap-2 text-center">
      <Image
        src="/cat.svg"
        alt="Gato comendo a página"
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-bold text-zinc-800">
        Ooops... Parece que o gato comeu a página!
      </h2>
      <p className="text-lg text-zinc-600">{message}</p>
      <Button onClick={handleReload} className="px-4">
        Recarregar a página
      </Button>
    </div>
  )
}
