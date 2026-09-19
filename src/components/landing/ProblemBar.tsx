import { FileWarning, MessageSquareOff, Palette, TrendingDown, Laptop, Smartphone, PiggyBank, ArrowRight } from 'lucide-react'

const pairs = [
  { icon: FileWarning, problem: 'Lack of admin support', solution: 'AI AdminBot handles bookings, emails, reminders' },
  { icon: MessageSquareOff, problem: 'Poor communication', solution: 'AI SalesBot manages WhatsApp and Facebook messages' },
  { icon: Palette, problem: 'Weak branding', solution: 'BrandBox creates logos, bios, and content' },
  { icon: TrendingDown, problem: 'Inconsistent cashflow', solution: 'Auto-invoicing and follow-ups via WhatsApp' },
  { icon: Laptop, problem: 'No tech team', solution: 'DIY dashboard with AI support' },
  { icon: Smartphone, problem: 'Low digital literacy', solution: 'Voice-first, mobile-friendly interface' },
  { icon: PiggyBank, problem: 'No capital for staff', solution: 'Affordable AI employees from R999/mo' },
]

export function ProblemBar() {
  return (
    <section className="bg-navy pb-20">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="section-eyebrow text-gold-light">Real Startup Problems</span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Every problem below has an AfriBox solution
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pairs.map((p) => (
            <div
              key={p.problem}
              className="rounded-2xl border border-gold/20 bg-white/5 p-5 backdrop-blur transition hover:border-gold/50"
            >
              <p.icon className="mb-3 text-gold" size={22} />
              <p className="font-display text-sm font-bold text-white/60 line-through decoration-red-400/60">{p.problem}</p>
              <div className="mt-2 flex items-start gap-1.5">
                <ArrowRight size={15} className="mt-0.5 shrink-0 text-emerald-light" />
                <p className="text-sm font-medium text-white">{p.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
