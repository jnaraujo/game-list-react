import Link from "next/link"
import Button from "./Button"
import { useModalContext } from "@/contexts/ModalContext"

export default function RequestLogin() {
  const { closeModal } = useModalContext()

  return (
    <section>
      <div className="mb-4 space-y-2">
        <h2 className="max-w-[250px] text-2xl font-semibold">
          Oooooops! Você precisa estar logado.
        </h2>
        <p className="text-gray-600">
          Você precisa estar logado para poder utilizar essa funcionalidade.
          <br />
          Caso não tenha uma conta, você pode criar uma gratuitamente.
        </p>
      </div>
      <div className="flex w-full gap-2">
        <Button asChild className="flex-1" secondary>
          <Link href="/auth/register" onClick={closeModal}>
            Crie uma conta
          </Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/auth/login" onClick={closeModal}>
            Fazer login
          </Link>
        </Button>
      </div>
    </section>
  )
}
