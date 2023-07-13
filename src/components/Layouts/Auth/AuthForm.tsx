"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  function changeForm() {
    setIsRegistering(!isRegistering)
  }

  return (
    <>
      {isRegistering ? (
        <RegisterForm onLoginClick={changeForm} />
      ) : (
        <LoginForm onRegisterClick={changeForm} />
      )}
    </>
  )
}
