import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "dev-email-address": process.env.NEXT_PUBLIC_DEV_EMAIL_ADDRESS,
  },
  timeout: 5000,
})

export default api
