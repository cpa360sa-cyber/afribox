import {
  UserX,
  MessageSquareOff,
  FileWarning,
  Palette,
  TrendingDown,
  Repeat,
  Lock,
  CircleDollarSign,
} from 'lucide-react'

const problems = [
  { icon: UserX, title: 'Limited Staff', copy: 'Not enough hands to get everything done.' },
  { icon: MessageSquareOff, title: 'Poor Customer Response', copy: 'Slow replies mean lost customers.' },
  { icon: FileWarning, title: 'Administrative Overload', copy: 'Too much manual work, too little time.' },
  { icon: Palette, title: 'Weak Branding', copy: 'Lack of professional branding and online presence.' },
  { icon: TrendingDown, title: 'Lost Sales', copy: 'Leads are missed, follow-ups fall through.' },
  { icon: Repeat, title: 'No Automation', copy: 'Repetitive tasks drain time and energy.' },
  { icon: Lock, title: 'Limited Access to AI', copy: 'Expensive tools built for large enterprises.' },
  { icon: CircleDollarSign, title: 'High Software Costs', copy: 'Most solutions are too expensive or too complex.' },
]

const stats = [
  { value: '90%+', label: 'of businesses in Africa are SMEs' },
  { value: '<30%', label: 'use any form of business automation' },
  { value: '70%+', label: 'of business owners spend more time on operations than growth' },
]

export function ProblemBar() {
  return (
    <section className="bg-navy py-20">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-eyebrow text-gold-light">02 · The Problem</span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Running a business in Africa is harder than it should be.
          </h2>
          <p className="mt-4 text-white/60">
            Over 90% of African businesses are SMEs. Yet most struggle every day with the same challenges that
            slow growth and limit potential.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-orange/40">
              <p.icon className="mb-3 text-orange-light" size={22} />
              <p className="font-display text-sm font-bold text-white">{p.title}</p>
              <p className="mt-1.5 text-sm text-white/55">{p.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-emerald-light">{s.value}</p>
              <p className="mt-1.5 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-display text-xl italic text-white/90 sm:text-2xl">
            "African entrepreneurs are resilient, resourceful and ambitious. They just need the right tools to
            compete and scale."
          </p>
        </blockquote>
        <p className="mx-auto mt-6 max-w-xl text-center text-base font-semibold text-white">
          Most founders spend more time working in their business than growing it. They don't need more software.
          They need AI Employees.
        </p>
      </div>
    </section>
  )
}
