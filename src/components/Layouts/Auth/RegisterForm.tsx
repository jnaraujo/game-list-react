"use client"

import { useForm } from "react-hook-form"
import Button from "../../Button"
import { signUp } from "@/libs/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConfettiContext } from "@/contexts/ConfettiContext"

interface FormData {
  email: string
  password: string
}

interface Props {
  onLoginClick: () => void
}

export default function RegisterForm({ onLoginClick }: Props) {
  const Router = useRouter()
  const { confetti } = useConfettiContext()
  const [loading, setLoading] = useState(false)
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
      await signUp(data.email, data.password)
      confetti(3000)
      Router.push("/")
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email já cadastrado.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="max-w-[250px] text-2xl font-semibold">
        Crie sua conta 👋
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
              minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {error && <span className="text-red-500">{error}</span>}

        <Button className="mt-2" loading={loading}>
          Criar conta
        </Button>
      </form>

      <p className="text-sm">
        Já tem uma conta?{" "}
        <button className="text-blue-500" onClick={onLoginClick}>
          Faça login.
        </button>
      </p>
    </div>
  )
}
