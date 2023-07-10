import app from "@/libs/firebase"
import { User, getAuth } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

const auth = getAuth(app)

interface AuthContextInterface {
  user: User | null | undefined
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
)

export const useAuthContext = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
