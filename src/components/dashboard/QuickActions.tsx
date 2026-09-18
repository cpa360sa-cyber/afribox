import { Link } from 'react-router-dom'
import { Bot, Target, BarChart3, Settings } from 'lucide-react'

const actions = [
  { to: '/app/agents', label: 'Manage Agents', icon: Bot },
  { to: '/app/leads', label: 'View Leads', icon: Target },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/settings', label: 'Business Settings', icon: Settings },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {actions.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          className="card-surface flex flex-col items-center gap-2 p-5 text-center transition hover:border-emerald/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <a.icon size={20} />
          </div>
          <span className="text-sm font-semibold text-textdark">{a.label}</span>
        </Link>
      ))}
    </div>
  )
}
