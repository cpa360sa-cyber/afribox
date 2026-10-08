import { PricingCards } from './PricingCards'

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">07 · Pricing Plans</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Choose the AfriBox plan that grows with you.
          </h2>
          <p className="mt-4 text-lg text-midgray">
            Simple. Affordable. Powerful. All plans include AI Employees, Voice Commander, Automations and more.
          </p>
        </div>
        <div className="mt-16">
          <PricingCards />
        </div>
        <p className="mt-10 text-center text-sm font-semibold text-midgray">
          Start your 14-day free trial today. No credit card required. No lock-in contracts. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
