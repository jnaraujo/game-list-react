"use client"
import Button from "@/components/Button"
import { useAuthContext } from "@/contexts/AuthContext"
import { errorToMessage } from "@/helpers/profile-helper"
import {
  reauthenticate,
  sendPasswordResetEmail,
  updateEmail,
  updateUserName,
} from "@/libs/auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

type FormValues = {
  name: string
  email: string
  password: string
}

export default function UpdateProfile() {
  const Router = useRouter()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>()

  const name = watch("name")
  const email = watch("email")

  useEffect(() => {
    if (user === undefined) return
    if (user === null) {
      Router.push("/auth/login")
      return
    }

    setValue("name", user.displayName || "")
    setValue("email", user.email || "")
  }, [Router, setValue, user])

  const doesDisplayNameChanged = name !== user?.displayName
  const doesEmailChanged = email !== user?.email

  const doesUserDataChanged = doesDisplayNameChanged || doesEmailChanged

  function handlePasswordReset() {
    sendPasswordResetEmail(user?.email!)
    toast("Link de redefinição de senha enviado para o seu e-mail!", {
      icon: "📧",
    })
  }

  async function onSubmit(data: FormValues) {
    if (!user || !user.email) return

    setLoading(true)

    try {
      if (doesDisplayNameChanged) {
        await updateUserName(user, data.name)
        toast.success("Perfil atualizado com sucesso!", {
          icon: "🎉",
        })
      }
      if (doesEmailChanged) {
        await reauthenticate(user, data.password)
        await updateEmail(user, data.email)
        toast("Link de verificação de e-mail enviado para o seu e-mail!", {
          icon: "📧",
        })
      }
    } catch (error: any) {
      const message = errorToMessage(error)

      if (message === "Senha incorreta") {
        setError("password", {
          type: "manual",
          message: "Senha incorreta.",
        })
      }

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="my-4 flex w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="font-bold">
          Nome
        </label>
        <input
          id="name"
          className="rounded-md border border-gray-300 p-2"
          type="text"
          placeholder="Nome"
          {...register("name")}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="font-bold">
          E-mail
        </label>
        <input
          id="email"
          className="flex-1 rounded-md border border-gray-300 p-2"
          type="email"
          placeholder="E-mail"
          {...register("email", {
            required: "O e-mail é obrigatório.",
          })}
        />
      </div>

      {doesEmailChanged && (
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold">
            Digite sua senha para confirmar a alteração de e-mail
          </label>
          <input
            id="password"
            className={clsx("flex-1 rounded-md border border-gray-300 p-2", {
              "!border-red-500 outline-none": errors.password,
            })}
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: "A senha é obrigatória.",
            })}
          />
        </div>
      )}

      <div className="flex flex-col items-start">
        <span className="font-bold">Precisa mudar de senha?</span>
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={handlePasswordReset}
        >
          Enviar link de redefinição de senha.
        </button>
      </div>

      <Button
        disabled={!doesUserDataChanged}
        loading={loading}
        className="w-60 self-end"
      >
        Salvar
      </Button>
    </form>
  )
}
