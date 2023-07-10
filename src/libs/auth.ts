import app from "./firebase"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as sendPasswordResetEmailFirebase,
  updateProfile,
  User,
  verifyBeforeUpdateEmail,
  signInWithCredential as signInWithCredentialFirebase,
  EmailAuthCredential,
  reauthenticateWithCredential,
  EmailAuthProvider,
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

export async function sendPasswordResetEmail(email: string) {
  return await sendPasswordResetEmailFirebase(auth, email)
}

export async function updateUserName(user: User, name: string) {
  return updateProfile(user, {
    displayName: name,
  })
}

export async function reauthenticate(user: User, password: string) {
  return await reauthenticateWithCredential(
    user,
    EmailAuthProvider.credential(user.email!, password),
  )
}

export async function updateEmail(user: User, email: string) {
  return await verifyBeforeUpdateEmail(user, email)
}
