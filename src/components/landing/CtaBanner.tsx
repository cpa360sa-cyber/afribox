import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-emerald to-emerald-dark py-20">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Ready to transform your business?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Start your 14-day free trial today. No credit card required.
        </p>
        <Link to="/register" className="btn-gold mt-8">
          Start Free Trial
          <ArrowRight size={18} />
        </Link>
        <p className="mt-8 text-sm text-white/70">
          Visit: www.afribox.ai &nbsp;·&nbsp; Email: sales@afribox.ai
        </p>
        <p className="mt-2 font-display text-sm font-bold text-white">
          Let AfriBox be your AI Operating System.
        </p>
      </div>
    </section>
  )
}
