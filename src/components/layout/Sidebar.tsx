import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  Inbox,
  BarChart3,
  Target,
  CreditCard,
  Settings,
  ShieldCheck,
  Palette,
  ScanSearch,
  CalendarClock,
  Mic,
} from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const clientLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/agents', label: 'Agents', icon: Bot },
  { to: '/app/voice', label: 'Voice Commands', icon: Mic },
  { to: '/app/brandbox', label: 'BrandBox', icon: Palette },
  { to: '/app/aiscan', label: 'AiScan', icon: ScanSearch },
  { to: '/app/bookings', label: 'Bookings', icon: CalendarClock },
  { to: '/app/inbox', label: 'Inbox', icon: Inbox },
  { to: '/app/leads', label: 'Leads', icon: Target },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/billing', label: 'Billing', icon: CreditCard },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { appUser } = useAuth()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-white md:flex">
      <div className="flex h-16 items-center border-b border-black/5 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {clientLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-textdark/70 hover:bg-emerald/10 hover:text-emerald-dark',
                isActive && 'bg-emerald/10 text-emerald-dark font-semibold'
              )
            }
            end={link.to === '/app/dashboard'}
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
        {appUser?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              cn(
                'mt-4 flex items-center gap-3 rounded-xl bg-navy/5 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/10',
                isActive && 'bg-navy/15'
              )
            }
          >
            <ShieldCheck size={18} />
            Admin Panel
          </NavLink>
        )}
      </nav>
    </aside>
  )
}
