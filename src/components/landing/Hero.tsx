import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="gradient-sunrise relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="absolute inset-0 bg-ndebele-pattern opacity-[0.15]" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-1.5 text-sm font-bold text-emerald-dark">
            <Sparkles size={14} />
            Train Your Own AI Employee
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-textdark sm:text-5xl md:text-6xl">
            Your Digital Co-Founder
            <br />
            is <span className="text-gradient-brand">Ready.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-midgray md:text-xl">
            From admin and branding to customer engagement and reporting, AfriBox is the all-in-one AI platform
            that solves the real problems South African startups face — no tech team required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register" className="btn-primary w-full sm:w-auto">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn-orange w-full sm:w-auto">
              <PlayCircle size={18} />
              See How It Works
            </a>
          </div>
        </div>

        <div className="card-glass mx-auto mt-16 flex max-w-xl items-center gap-4 rounded-2xl p-5 text-left">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald text-white">
            <span className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-emerald/40" />
            <Sparkles size={18} className="relative" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-textdark">Zanele · SalesBot</p>
            <p className="truncate text-sm text-midgray">Replied to 14 WhatsApp messages in the last hour</p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald/10 px-3 py-1 text-xs font-bold text-emerald-dark">Active</span>
        </div>
      </div>
    </section>
  )
}
