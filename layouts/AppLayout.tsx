import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Head from "next/head"
import { ReactNode } from "react"

interface AppLayoutProps {
  title?: string
  children: ReactNode
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <div className="h-screen flex-col">
      <Head>
        <title>TheSphere | {title}</title>
        <meta name="description" content="Keeping you in your sphere" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-2 px-md-8 pb-2 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout