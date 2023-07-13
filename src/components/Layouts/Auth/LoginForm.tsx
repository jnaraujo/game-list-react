"use client"

import { useForm } from "react-hook-form"
import Button from "../../Button"
import { signIn } from "@/libs/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface FormData {
  email: string
  password: string
}

interface Props {
  onRegisterClick: () => void
}

export default function LoginForm({ onRegisterClick }: Props) {
  const [loading, setLoading] = useState(false)
  const Router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    setError(null)
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      Router.push("/")
    } catch (_) {
      setError("Usuário não encontrado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="max-w-[250px] text-2xl font-semibold">
        Faça login para continuar 👋
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ex: luiz@exemplo.com"
            className="rounded-md border border-gray-300 p-2"
            {...register("email", {
              required: "O endereço de email é obrigatório",
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="***********"
            className="rounded-md border border-gray-300 p-2"
            {...register("password", {
              required: "A senha é obrigatória",
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {error && <span className="text-red-500">{error}</span>}

        <Button className="mt-2" loading={loading}>
          Entrar
        </Button>
      </form>

      <p className="text-sm">
        Não tem uma conta?{" "}
        <button className="text-blue-500" onClick={onRegisterClick}>
          Crie uma agora.
        </button>
      </p>
    </div>
  )
}
