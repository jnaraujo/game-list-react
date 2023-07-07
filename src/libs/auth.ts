import app from "./firebase"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"

const auth = getAuth(app)

export async function signUp(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )

  return userCredential.user
}

export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  return userCredential.user
}

export async function signOut() {
  return await auth.signOut()
}
