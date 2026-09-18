import { FileWarning, UserX, Wallet } from 'lucide-react'

const problems = [
  {
    icon: FileWarning,
    title: 'Drowning in admin?',
    copy: 'Invoices, follow-ups, and repetitive tasks eat hours you don\'t have.',
  },
  {
    icon: UserX,
    title: 'Missing leads?',
    copy: 'Every unanswered message is a customer who found your competitor instead.',
  },
  {
    icon: Wallet,
    title: 'Can\'t afford more staff?',
    copy: 'Hiring is expensive and slow — your business needs help today.',
  },
]

export function ProblemBar() {
  return (
    <section className="bg-navy pb-20">
      <div className="container-page grid gap-5 sm:grid-cols-3">
        {problems.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-gold/20 bg-white/5 p-6 backdrop-blur transition hover:border-gold/50"
          >
            <p.icon className="mb-4 text-gold" size={28} />
            <h3 className="mb-2 font-display text-lg font-bold text-white">{p.title}</h3>
            <p className="text-sm text-white/60">{p.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
