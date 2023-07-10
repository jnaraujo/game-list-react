export function errorToMessage(error: any) {
  switch (error.code) {
    case "auth/wrong-password":
      return "Senha incorreta"
    default:
      return "Erro desconhecido"
  }
}
