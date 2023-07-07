import RegisterForm from "@/components/Auth/RegisterForm"

export default function Register() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm p-4">
        <RegisterForm />
      </div>
    </main>
  )
}
