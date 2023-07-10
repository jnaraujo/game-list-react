import UpdateProfile from "@/components/Layouts/UpdateProfileForm"
export default function Profile() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container my-8 flex max-w-[600px] flex-col items-center">
        <h1 className="self-start text-2xl font-bold">Seu perfil</h1>
        <UpdateProfile />
      </section>
    </main>
  )
}
