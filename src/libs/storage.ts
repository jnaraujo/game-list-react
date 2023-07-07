import { getDatabase, ref, get, set, remove } from "firebase/database"
import app from "./firebase"

const db = getDatabase(app)

export async function getGameUserRating(gameId: number, userId: string) {
  const ratingRef = ref(db, `ratings/${userId}/${gameId}`)

  const snapshot = await get(ratingRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export async function getUserRatedGames(userId: string) {
  const ratingRef = ref(db, `ratings/${userId}`)

  const snapshot = await get(ratingRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export async function setGameUserRating(
  gameId: number,
  rating: number,
  userId: string,
) {
  const ratingRef = ref(db, `ratings/${userId}/${gameId}`)

  await set(ratingRef, rating)
}

export async function getGameUserLike(gameId: number, userId: string) {
  const likeRef = ref(db, `likes/${userId}/${gameId}`)

  const snapshot = await get(likeRef)

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export async function setGameUserLike(
  gameId: number,
  like: boolean,
  userId: string,
) {
  const likeRef = ref(db, `likes/${userId}/${gameId}`)

  if (!like) {
    return await remove(likeRef)
  }

  await set(likeRef, like)
}

export async function getUserLikedGames(userId: string) {
  const likeRef = ref(db, `likes/${userId}`)
  const snapshot = await get(likeRef)
  if (snapshot.exists()) {
    return snapshot.val()
  }
  return null
}
