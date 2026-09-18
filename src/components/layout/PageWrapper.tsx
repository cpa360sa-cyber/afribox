import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
