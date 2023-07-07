import { getDatabase, ref, get, set } from "firebase/database"
import app from "./firebase"
import { getAuth } from "firebase/auth"

const db = getDatabase(app)
const auth = getAuth(app)

export async function getGameUserRating(gameId: number) {
  const userId = auth.currentUser?.uid
  const ratingRef = ref(db, `${gameId}/ratings/${userId}`)

  const snapshot = await get(ratingRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export async function setGameUserRating(gameId: number, rating: number) {
  const userId = auth.currentUser?.uid
  const ratingRef = ref(db, `${gameId}/ratings/${userId}`)

  await set(ratingRef, rating)
}
