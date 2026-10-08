import { AGENT_TEMPLATES } from '../../constants/agentTemplates'
import { agentIcons } from '../agents/agentIcons'
import { LogoMark } from '../layout/LogoMark'

export function SolutionOverview() {
  return (
    <section id="solution" className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">04 · Our Solution</span>
          <div className="mt-3 flex items-center justify-center gap-3">
            <LogoMark size={40} />
            <h2 className="font-display text-3xl font-extrabold text-textdark sm:text-4xl">Meet AfriBox AI</h2>
          </div>
          <p className="mt-2 font-display text-lg font-bold text-emerald-dark">Your AI Workforce. Working for You.</p>
          <p className="mt-4 text-midgray">
            AfriBox is Africa's AI Operating System that gives every business their own team of AI Employees to
            automate operations, delight customers and drive growth.
          </p>
          <p className="mt-4 font-display text-base font-bold text-textdark">
            You say it. AfriBox gets it done.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_TEMPLATES.map((bot) => {
            const Icon = agentIcons[bot.type]
            return (
              <div key={bot.type} className="card-surface p-6 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-textdark">{bot.name}</h3>
                <p className="mt-2 text-sm text-midgray">{bot.tagline}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
