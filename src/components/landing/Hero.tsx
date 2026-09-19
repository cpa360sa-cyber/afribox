import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-24 pt-20 text-white md:pb-32 md:pt-28">
      <div className="absolute inset-0 bg-ndebele-pattern opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-emerald/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald-light">
            AI Platform for South African Startups
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Your Digital Co-Founder is <span className="text-emerald-light">Ready.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
            From admin and branding to customer engagement and reporting, AfriBox is the all-in-one AI platform
            that solves the real problems South African startups face — no tech team required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register" className="btn-primary w-full sm:w-auto">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn-secondary w-full sm:w-auto">
              <PlayCircle size={18} />
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
