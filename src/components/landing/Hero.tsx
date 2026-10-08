import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, Bot, Mic, MessageSquare, Zap } from 'lucide-react'

const pills = [
  { icon: Bot, label: 'AI EMPLOYEES', copy: 'That Work 24/7' },
  { icon: Mic, label: 'VOICE-FIRST', copy: 'Tell it. Done.' },
  { icon: MessageSquare, label: 'WHATSAPP-FIRST', copy: 'Connect. Engage.' },
  { icon: Zap, label: 'AUTOMATE', copy: 'Save Time. Grow Faster.' },
]

export function Hero() {
  return (
    <section className="gradient-sunrise relative overflow-hidden pb-20 pt-16 md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-ndebele-pattern opacity-[0.15]" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-sm font-bold text-emerald-dark">
            Train Your Own AI Employee
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-textdark sm:text-5xl md:text-6xl">
            Africa's <span className="text-gradient-brand">AI Operating System</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-midgray md:text-xl">
            AfriBox helps startups and SMEs automate, grow and scale — AI Employees that work 24/7, so you don't
            have to.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register" className="btn-primary w-full sm:w-auto">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <a href="#solution" className="btn-orange w-full sm:w-auto">
              <PlayCircle size={18} />
              See How It Works
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {pills.map((p) => (
            <div key={p.label} className="card-glass flex flex-col items-center gap-1.5 rounded-2xl px-3 py-4 text-center">
              <p.icon className="text-emerald" size={20} />
              <p className="font-display text-xs font-extrabold tracking-wide text-textdark">{p.label}</p>
              <p className="text-xs text-midgray">{p.copy}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-midgray">
          www.afribox.ai &nbsp;·&nbsp; sales@afribox.ai
        </p>
      </div>
    </section>
  )
}
