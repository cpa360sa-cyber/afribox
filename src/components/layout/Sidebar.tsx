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
  Briefcase,
  BookOpen,
  Zap,
  Users,
} from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const groups = [
  {
    label: 'Overview',
    links: [
      { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/app/agents', label: 'AI Employee Hub', icon: Bot },
    ],
  },
  {
    label: 'Core Modules',
    links: [
      { to: '/app/voice', label: 'Voice Commander', icon: Mic },
      { to: '/app/brandbox', label: 'BrandBox', icon: Palette },
      { to: '/app/aiscan', label: 'AiScan', icon: ScanSearch },
      { to: '/app/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
      { to: '/app/crm', label: 'CRM', icon: Briefcase },
      { to: '/app/bookings', label: 'Bookings & Payments', icon: CalendarClock },
      { to: '/app/automations', label: 'Automations', icon: Zap },
    ],
  },
  {
    label: 'Operations',
    links: [
      { to: '/app/inbox', label: 'Inbox', icon: Inbox },
      { to: '/app/leads', label: 'Leads', icon: Target },
      { to: '/app/team', label: 'Team', icon: Users },
      { to: '/app/analytics', label: 'Reporting', icon: BarChart3 },
    ],
  },
  {
    label: 'Account',
    links: [
      { to: '/app/billing', label: 'Billing', icon: CreditCard },
      { to: '/app/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export function Sidebar() {
  const { appUser } = useAuth()

  return (
    <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-black/5 bg-white md:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-black/5 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-5 p-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-4 text-[0.68rem] font-bold uppercase tracking-widest text-midgray/70">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={'end' in link ? link.end : false}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-textdark/70 hover:bg-emerald/10 hover:text-emerald-dark',
                      isActive && 'bg-emerald/10 text-emerald-dark font-semibold'
                    )
                  }
                >
                  <link.icon size={18} />
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
        {appUser?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl bg-navy/5 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/10',
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
