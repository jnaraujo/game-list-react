import Image from "next/image"

interface Props {
  message: string
}
export default function Error({ message }: Props) {
  return (
    <div className="absolute left-1/2 mx-auto flex min-h-[50vh] w-72 -translate-x-1/2 transform flex-col items-center justify-center gap-2 text-center">
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
    </div>
  )
}
