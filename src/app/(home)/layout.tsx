import Footer from "@/components/Layouts/Footer"
import Navbar from "@/components/Layouts/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
