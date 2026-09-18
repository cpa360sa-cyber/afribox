import { PageWrapper } from '../../components/layout/PageWrapper'
import { PricingCards } from '../../components/landing/PricingCards'

export default function Pricing() {
  return (
    <PageWrapper>
      <section className="bg-navy py-20 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Simple, local pricing</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Priced in Rand, built for South African SMEs. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>
      <section className="bg-offwhite py-20">
        <div className="container-page">
          <PricingCards />
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-black/5 bg-white p-8 text-center">
            <h2 className="font-display text-xl font-bold text-textdark">Not sure which plan fits?</h2>
            <p className="mt-2 text-midgray">
              Book a free 15-minute call with the Etaerc team and we'll recommend the right setup for your business.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
