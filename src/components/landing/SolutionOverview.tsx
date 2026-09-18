import { MessageCircle, Target, Phone, Workflow } from 'lucide-react'

const agents = [
  { icon: MessageCircle, label: 'ChatBot', angle: -135 },
  { icon: Target, label: 'SalesBot', angle: -45 },
  { icon: Phone, label: 'Voice AI', angle: 45 },
  { icon: Workflow, label: 'Workflows', angle: 135 },
]

export function SolutionOverview() {
  return (
    <section className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">The Platform</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            One hub. Four AI employees.
          </h2>
          <p className="mt-4 text-lg text-midgray">
            AfriBox is the command center for your AI workforce — configure once, and each agent works
            around the clock in your business's voice.
          </p>
        </div>

        <div className="relative mx-auto mt-16 flex h-80 max-w-md items-center justify-center sm:h-96">
          <div className="absolute h-64 w-64 rounded-full border-2 border-dashed border-emerald/25 sm:h-80 sm:w-80" />
          <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-navy text-white shadow-glow sm:h-32 sm:w-32">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald text-sm font-extrabold">
              AB
            </span>
            <span className="mt-2 font-display text-sm font-bold">AfriBox</span>
          </div>
          {agents.map((agent) => {
            const rad = (agent.angle * Math.PI) / 180
            const radius = 150
            const x = Math.cos(rad) * radius
            const y = Math.sin(rad) * radius
            return (
              <div
                key={agent.label}
                className="absolute flex flex-col items-center gap-1.5"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald/30 bg-white text-emerald shadow-sm">
                  <agent.icon size={22} />
                </div>
                <span className="text-xs font-semibold text-textdark">{agent.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
