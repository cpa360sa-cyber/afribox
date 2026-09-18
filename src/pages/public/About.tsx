import { PageWrapper } from '../../components/layout/PageWrapper'
import { Target, Eye, Users } from 'lucide-react'

export default function About() {
  return (
    <PageWrapper>
      <section className="bg-navy py-20 text-white">
        <div className="container-page text-center">
          <span className="section-eyebrow text-gold-light">About AfriBox</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Built in Pretoria, for African business.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            AfriBox is developed by Etaerc AI Agency to give resource-constrained African SMEs access to the
            same AI-powered efficiency that large enterprises take for granted.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              copy: 'Give every African SME an affordable AI employee — a 24/7 teammate that never sleeps.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              copy: 'A pan-African economy where AI is a growth tool for the many, not a luxury for the few.',
            },
            {
              icon: Users,
              title: 'Our People',
              copy: 'A Pretoria-based team of engineers and operators who\'ve run and grown SMEs themselves.',
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                <item.icon size={26} />
              </div>
              <h3 className="font-display text-xl font-bold text-textdark">{item.title}</h3>
              <p className="mt-2 text-midgray">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-textdark">Etaerc AI Agency</h2>
          <p className="mt-4 text-midgray">
            Etaerc AI Agency builds practical AI products for the South African market. AfriBox is our flagship
            platform, targeting the 5.5 million+ SME market across South Africa before expanding pan-Africa.
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}
