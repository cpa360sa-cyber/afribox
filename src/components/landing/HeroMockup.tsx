import { LayoutDashboard, Bot, MessageCircle, Users, CheckCircle2, Sparkles } from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Bot, label: 'AI Employees' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Users, label: 'Customers' },
]

const metrics = [
  { label: 'New leads', value: '128', delta: '↑ This week' },
  { label: 'Bookings', value: '36', delta: '↑ This month' },
  { label: 'Follow-ups', value: '94%', delta: 'Automated' },
]

const activityBars = [82, 61, 73, 45]

const chatPreview = [
  { from: 'bot', text: 'Hi! How can I help today?' },
  { from: 'user', text: "I'd like to book a delivery slot." },
]

export function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-md lg:mx-0" aria-hidden="true">
      <div className="absolute inset-x-6 inset-y-8 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald/30 to-orange/20 blur-3xl" />

      <div className="rotate-1 rounded-[1.75rem] border border-white/10 bg-navy p-2.5 shadow-xl transition hover:rotate-0">
        <div className="overflow-hidden rounded-[1.25rem] bg-offwhite text-textdark">
          <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-3">
            <span className="text-[0.65rem] font-extrabold tracking-wide text-midgray">
              AFRIBOX · BUSINESS OVERVIEW
            </span>
            <span className="flex gap-1">
              <i className="h-1.5 w-1.5 rounded-full bg-black/10" />
              <i className="h-1.5 w-1.5 rounded-full bg-black/10" />
              <i className="h-1.5 w-1.5 rounded-full bg-black/10" />
            </span>
          </div>

          <div className="grid grid-cols-[76px_1fr]">
            <aside className="space-y-1 bg-navy px-2 py-3 text-white/60">
              <p className="px-1.5 pb-2 text-[0.55rem] font-extrabold uppercase tracking-wider text-white/40">
                Workspace
              </p>
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[0.6rem] font-semibold ${
                    item.active ? 'bg-emerald/20 text-white' : ''
                  }`}
                >
                  <item.icon size={11} />
                  {item.label}
                </div>
              ))}
            </aside>

            <div className="space-y-3 p-3.5">
              <p className="font-display text-xs font-bold text-textdark">Your business at a glance</p>

              <div className="grid grid-cols-3 gap-2">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-black/5 bg-white p-2">
                    <p className="text-[0.55rem] text-midgray">{m.label}</p>
                    <p className="font-display text-sm font-extrabold text-textdark">{m.value}</p>
                    <p className="text-[0.55rem] font-bold text-emerald-dark">{m.delta}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-black/5 bg-white p-2.5">
                  <p className="mb-2 text-[0.6rem] font-bold text-textdark">Workflow activity</p>
                  <div className="space-y-1.5">
                    {activityBars.map((pct, i) => (
                      <div key={i} className="h-1 rounded-full bg-black/5">
                        <div className="h-full rounded-full bg-emerald" style={{ width: `${pct}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-black/5 bg-white p-2.5">
                  <p className="mb-2 text-[0.6rem] font-bold text-textdark">AI assistant</p>
                  <div className="space-y-1.5">
                    {chatPreview.map((line, i) => (
                      <div
                        key={i}
                        className={`rounded-md px-1.5 py-1 text-[0.55rem] leading-tight ${
                          line.from === 'user' ? 'bg-emerald/10 text-emerald-dark' : 'bg-black/5 text-midgray'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-surface absolute -left-6 bottom-6 flex items-center gap-2 px-3 py-2 text-xs font-bold text-textdark sm:-left-8">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/15 text-emerald-dark">
          <CheckCircle2 size={13} />
        </span>
        Follow-ups automated
      </div>
      <div className="card-surface absolute -right-4 top-8 flex items-center gap-2 px-3 py-2 text-xs font-bold text-textdark sm:-right-6">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/15 text-orange">
          <Sparkles size={13} />
        </span>
        AI assistant active
      </div>
    </div>
  )
}
