import { GraduationCap, HeartHandshake, Languages, Building2 } from 'lucide-react'

const programmes = [
  {
    icon: GraduationCap,
    title: 'AfriBox Academy',
    copy: 'Free AI literacy workshops for township entrepreneurs and small business owners.',
  },
  {
    icon: HeartHandshake,
    title: '1-for-1 Programme',
    copy: 'For every 10 paid subscriptions, we deploy a free AI employee for a qualifying NPO.',
  },
  {
    icon: Languages,
    title: 'Local Language AI',
    copy: 'Investing in Zulu, Sotho, and Xhosa language models so no business is left behind.',
  },
  {
    icon: Building2,
    title: 'Kasi Incubator Partnerships',
    copy: 'Partnering with township business incubators to give founders a head start with AI.',
  },
]

export function CommunityGiveback() {
  return (
    <section id="community" className="bg-navy py-24 text-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow text-gold-light">Ubuntu in Action</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Technology that lifts the community with it
          </h2>
          <p className="mt-4 text-lg text-white/60">
            "I am because we are." AfriBox reinvests in the entrepreneurs and communities it serves.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p.icon className="mb-4 text-gold-light" size={26} />
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
