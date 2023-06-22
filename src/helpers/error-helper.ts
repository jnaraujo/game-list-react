import { AxiosError } from "axios"

const TIMEOUT_CODE = "ECONNABORTED"
const SERVER_ERROR_STATUS = [500, 502, 503, 504, 507, 508, 509]

export function errorToMessage(error: AxiosError) {
  if (error.code === TIMEOUT_CODE) {
    return "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
  } else if (
    error.response?.status &&
    SERVER_ERROR_STATUS.includes(error.response.status)
  ) {
    return "O servidor fahou em responder, tente recarregar a página"
  }

  return "O servidor demorou para responder, tente mais tarde"
}
