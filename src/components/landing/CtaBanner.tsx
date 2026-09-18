import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-emerald to-emerald-dark py-20">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Ready to hire your first AI employee?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Join the growing number of South African SMEs putting AfriBox to work — no credit card required to start.
        </p>
        <Link to="/register" className="btn-gold mt-8">
          Start Free Trial
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
