import { type ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { initials } from '../../lib/utils'

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const { appUser, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-offwhite">
      <Sidebar />
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-white p-4">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-navy/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            {title && <h1 className="font-display text-lg font-bold text-textdark">{title}</h1>}
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/app/settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald/10 text-sm font-bold text-emerald-dark"
            >
              {appUser?.displayName ? initials(appUser.displayName) : 'AB'}
            </Link>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 text-sm font-medium text-midgray hover:text-textdark"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
