import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  Mic,
  Brain,
  ScanSearch,
  Palette,
  MessageCircle,
  CalendarDays,
  Users2,
  Briefcase,
  Megaphone,
  Globe,
  Zap,
  ClipboardList,
  Users,
  Wallet,
  FileText,
  BarChart3,
  Plug,
  CreditCard,
  Settings,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'

const groups = [
  {
    label: null,
    links: [{ to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'AI Command Center',
    links: [
      { to: '/app/agents', label: 'AI Employees', icon: Bot },
      { to: '/app/voice', label: 'Voice Commander', icon: Mic },
      { to: '/app/ai-memory', label: 'AI Memory', icon: Brain },
      { to: '/app/aiscan', label: 'AiScan (Brand Scan)', icon: ScanSearch },
      { to: '/app/brandbox', label: 'BrandBox', icon: Palette },
      { to: '/app/whatsapp', label: 'WhatsApp Center', icon: MessageCircle },
      { to: '/app/calendar', label: 'Calendar', icon: CalendarDays },
    ],
  },
  {
    label: 'Business',
    links: [
      { to: '/app/customers', label: 'Customers', icon: Users2 },
      { to: '/app/sales', label: 'Sales', icon: Briefcase },
      { to: '/app/marketing', label: 'Marketing', icon: Megaphone },
      { to: '/app/website', label: 'Website', icon: Globe },
    ],
  },
  {
    label: 'Operations',
    links: [
      { to: '/app/automations', label: 'Automations', icon: Zap },
      { to: '/app/tasks', label: 'Tasks', icon: ClipboardList },
      { to: '/app/hr', label: 'HR', icon: Users },
      { to: '/app/finance', label: 'Finance', icon: Wallet },
      { to: '/app/documents', label: 'Documents', icon: FileText },
    ],
  },
  {
    label: 'Insights',
    links: [
      { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/app/integrations', label: 'Integrations', icon: Plug },
    ],
  },
  {
    label: 'System',
    links: [
      { to: '/app/billing', label: 'Billing', icon: CreditCard },
      { to: '/app/settings', label: 'Settings', icon: Settings },
      { to: '/app/help', label: 'Help Center', icon: HelpCircle },
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
        {groups.map((group, i) => (
          <div key={group.label ?? `group-${i}`}>
            {group.label && (
              <p className="mb-1.5 px-4 text-[0.68rem] font-bold uppercase tracking-widest text-midgray/70">
                {group.label}
              </p>
            )}
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
                  <link.icon size={18} className="shrink-0" />
                  <span className="truncate">{link.label}</span>
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
      <div className="m-4 rounded-2xl bg-navy p-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">{(appUser?.planId ?? 'starterbot').replace(/^./, (c) => c.toUpperCase())} Plan</p>
          <span className="rounded-full bg-emerald/20 px-2 py-0.5 text-[10px] font-bold text-emerald-light">Active</span>
        </div>
        <p className="mt-1 text-xs text-white/50">Renews on 1st of next month</p>
        <a href="/app/billing" className="mt-3 block rounded-xl bg-white/10 py-2 text-center text-xs font-semibold hover:bg-white/15">
          Manage Plan
        </a>
      </div>
    </aside>
  )
}
