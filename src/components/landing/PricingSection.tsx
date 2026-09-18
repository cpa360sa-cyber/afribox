import { PricingCards } from './PricingCards'

export function PricingSection() {
  return (
    <section id="pricing" className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Simple, Local Pricing</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Pricing that scales with your business
          </h2>
          <p className="mt-4 text-lg text-midgray">Priced in Rand. No hidden fees. Cancel anytime.</p>
        </div>
        <div className="mt-16">
          <PricingCards />
        </div>
      </div>
    </section>
  )
}
