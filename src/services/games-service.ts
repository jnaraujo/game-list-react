import { ApiResponse } from "@/@types/api"
import api from "@/libs/api"

export async function fetchGames() {
  const { data } = await api.get<ApiResponse>("/data")

  return data
}
