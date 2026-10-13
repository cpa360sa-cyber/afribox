import { type ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, Settings, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { useBusiness } from '../../hooks/useBusiness'
import { useNotifications } from '../../hooks/useNotifications'
import { initials, formatRelativeTime, cn } from '../../lib/utils'

interface PrimaryAction {
  label: string
  onClick: () => void
  icon?: ReactNode
}

export function AppShell({
  children,
  title,
  subtitle,
  primaryAction,
}: {
  children: ReactNode
  title?: string
  subtitle?: string
  primaryAction?: PrimaryAction
}) {
  const { appUser, logout } = useAuth()
  const { business } = useBusiness()
  const { notifications, unreadCount, markAllRead } = useNotifications(business?.id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

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
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div>
              {title && <h1 className="font-display text-lg font-bold text-textdark">{title}</h1>}
              {subtitle && <p className="text-sm text-midgray">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {business && (
              <span className="hidden items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-textdark sm:flex">
                {business.name}
              </span>
            )}
            {primaryAction && (
              <button onClick={primaryAction.onClick} className="btn-primary text-sm">
                {primaryAction.icon}
                {primaryAction.label}
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen((o) => !o)
                  setProfileOpen(false)
                }}
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-midgray hover:bg-black/5 hover:text-textdark"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border border-black/5 bg-white p-2 shadow-soft">
                  <div className="flex items-center justify-between px-3 py-2">
                    <p className="text-sm font-bold text-textdark">Notifications</p>
                    {unreadCount > 0 && business && (
                      <button
                        onClick={() => markAllRead(business.id)}
                        className="text-xs font-semibold text-emerald hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-3 py-6 text-center text-sm text-midgray">You're all caught up.</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={cn('rounded-xl px-3 py-2.5', !n.read && 'bg-emerald/5')}>
                          <p className="text-sm font-semibold text-textdark">{n.title}</p>
                          {n.body && <p className="text-xs text-midgray">{n.body}</p>}
                          <p className="mt-0.5 text-[11px] text-midgray/70">{formatRelativeTime(n.createdAt)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen((o) => !o)
                  setNotifOpen(false)
                }}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-black/5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-xs font-bold text-emerald-dark">
                  {appUser?.displayName ? initials(appUser.displayName) : 'AB'}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold leading-tight text-textdark">
                    {appUser?.displayName || 'My Account'}
                  </span>
                  <span className="block text-xs capitalize leading-tight text-midgray">{appUser?.role}</span>
                </span>
                <ChevronDown size={14} className="hidden text-midgray sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 z-30 mt-2 w-48 rounded-2xl border border-black/5 bg-white p-1.5 shadow-soft">
                  <Link
                    to="/app/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textdark hover:bg-black/5"
                  >
                    <Settings size={15} />
                    Settings
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-textdark hover:bg-black/5"
                  >
                    <LogOut size={15} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
