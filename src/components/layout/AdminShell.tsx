import { type ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Menu, X, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminShell({ children, title }: { children: ReactNode; title?: string }) {
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-offwhite">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-navy md:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Logo dark />
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white',
                  isActive && 'bg-emerald/20 text-emerald-light font-semibold'
                )
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <Link to="/app/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white">
            <ArrowLeft size={18} />
            Client View
          </Link>
        </div>
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-navy p-4">
            <div className="mb-6 flex items-center justify-between">
              <Logo dark />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white">
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
          <button onClick={() => logout()} className="flex items-center gap-1.5 text-sm font-medium text-midgray hover:text-textdark">
            <LogOut size={16} />
            Log out
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
