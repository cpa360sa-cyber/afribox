import { Zap, Receipt, CalendarCheck, GitBranch, Star, RotateCcw, BarChart3 } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'
import { useAutomations } from '../../hooks/useAutomations'
import { AUTOMATION_TEMPLATES } from '../../constants/agentTemplates'
import { formatRelativeTime } from '../../lib/utils'

const ICONS: Record<string, typeof Zap> = { Receipt, CalendarCheck, GitBranch, Star, RotateCcw, BarChart3 }

export default function Automations() {
  const { business } = useBusiness()
  const { automations, loading, enableAutomation, toggleAutomation, removeAutomation } = useAutomations(business?.id)

  const activeIds = new Set(automations.map((a) => a.templateId))

  return (
    <AppShell title="Automations">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-textdark">Build workflows. Automate anything.</h2>
        <p className="text-sm text-midgray">{automations.length} active automation{automations.length === 1 ? '' : 's'}</p>
      </div>

      {automations.length > 0 && (
        <div className="mb-8 card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Automation</th>
                <th className="px-5 py-3 font-semibold">Runs</th>
                <th className="px-5 py-3 font-semibold">Last run</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {automations.map((a) => (
                <tr key={a.id}>
                  <td className="px-5 py-3 font-semibold text-textdark">{a.name}</td>
                  <td className="px-5 py-3 text-midgray">{a.runCount}</td>
                  <td className="px-5 py-3 text-midgray">{a.lastRunAt ? formatRelativeTime(a.lastRunAt) : 'Never'}</td>
                  <td className="px-5 py-3">
                    <Badge tone={a.status === 'active' ? 'emerald' : 'gray'}>{a.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => toggleAutomation(a.id, a.status === 'active' ? 'paused' : 'active')}
                      className="mr-3 text-sm font-semibold text-emerald hover:text-emerald-dark"
                    >
                      {a.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                    <button onClick={() => removeAutomation(a.id)} className="text-sm font-semibold text-midgray hover:text-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h3 className="mb-4 font-display text-lg font-bold text-textdark">Templates</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AUTOMATION_TEMPLATES.map((t) => {
          const Icon = ICONS[t.icon] ?? Zap
          const active = activeIds.has(t.id)
          return (
            <Card key={t.id} className="flex flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <Icon size={20} />
              </div>
              <p className="mt-3 font-display font-bold text-textdark">{t.name}</p>
              <p className="mt-1 flex-1 text-sm text-midgray">{t.description}</p>
              <Button
                size="sm"
                variant={active ? 'outline' : 'primary'}
                disabled={active || loading || !business}
                onClick={() => business && enableAutomation(business.id, t.id, t.name)}
                className="mt-4"
              >
                {active ? 'Enabled' : 'Enable'}
              </Button>
            </Card>
          )
        })}
      </div>
    </AppShell>
  )
}
