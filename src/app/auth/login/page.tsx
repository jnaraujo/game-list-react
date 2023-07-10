import LoginForm from "@/components/Layouts/Auth/LoginForm"

export default function Login() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm p-4">
        <LoginForm />
      </div>
    </main>
  )
}
