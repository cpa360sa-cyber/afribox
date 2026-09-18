import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PLANS } from '../../constants/plans'
import { formatZAR } from '../../lib/utils'
import { cn } from '../../lib/utils'

export function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'relative flex flex-col rounded-3xl border p-8',
            plan.highlight
              ? 'border-emerald bg-navy text-white shadow-glow scale-[1.02]'
              : 'border-black/5 bg-white'
          )}
        >
          {plan.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-navy">
              Most Popular
            </span>
          )}
          <h3 className={cn('font-display text-xl font-bold', plan.highlight ? 'text-white' : 'text-textdark')}>
            {plan.name}
          </h3>
          <div className="mt-4 mb-6">
            {plan.priceZAR !== null ? (
              <>
                <span className="font-display text-4xl font-extrabold">{formatZAR(plan.priceZAR)}</span>
                <span className={cn('text-sm', plan.highlight ? 'text-white/60' : 'text-midgray')}>/month</span>
              </>
            ) : (
              <span className="font-display text-4xl font-extrabold">Custom</span>
            )}
          </div>
          <ul className="mb-8 flex-1 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check size={18} className={cn('mt-0.5 shrink-0', plan.highlight ? 'text-emerald-light' : 'text-emerald')} />
                <span className={plan.highlight ? 'text-white/80' : 'text-textdark'}>{f}</span>
              </li>
            ))}
          </ul>
          {plan.priceZAR !== null ? (
            <Link
              to="/register"
              className={cn(
                'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition',
                plan.highlight ? 'bg-emerald text-white hover:bg-emerald-dark' : 'bg-navy text-white hover:bg-navy/90'
              )}
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10"
            >
              Contact Us
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
