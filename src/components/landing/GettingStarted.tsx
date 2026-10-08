import { UserPlus, Users, Bot, Link2, LineChart, Rocket } from 'lucide-react'

const steps = [
  { icon: UserPlus, title: 'Sign Up', copy: 'Create your AfriBox account in less than 2 minutes.' },
  { icon: Users, title: 'Onboard Your Team', copy: 'Invite your team and set roles & permissions.' },
  { icon: Bot, title: 'Set Up Your AI Employees', copy: 'Choose AI Employees that match your business needs.' },
  { icon: Link2, title: 'Connect & Automate', copy: 'Connect your tools and let AfriBox do the heavy lifting.' },
  { icon: LineChart, title: 'Track & Optimize', copy: 'Monitor performance, get insights and optimize.' },
  { icon: Rocket, title: 'Grow & Scale', copy: 'Focus on what matters. AfriBox scales with you.' },
]

const stats = [
  { value: '14+', label: 'Businesses Onboarded' },
  { value: '50,000+', label: 'AI Tasks Automated Daily' },
  { value: '1M+', label: 'Hours Saved For Our Users' },
  { value: 'R100M+', label: 'Projected Revenue For Our Customers' },
]

export function GettingStarted() {
  return (
    <section id="how-it-works" className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">08 · Getting Started</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Get Started in Minutes. Grow From Day One.
          </h2>
          <p className="mt-4 text-midgray">
            AfriBox makes it easy to get started, onboard your team and start seeing results — fast.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                <step.icon size={28} />
              </div>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 font-display text-6xl font-extrabold text-black/5">
                {i + 1}
              </span>
              <h3 className="relative font-display text-lg font-bold text-textdark">{step.title}</h3>
              <p className="relative mt-2 text-sm text-midgray">{step.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl bg-white p-8 shadow-soft sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-emerald-dark sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-midgray">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
