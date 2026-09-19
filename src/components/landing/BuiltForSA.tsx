import { MessageSquare, Mic, CreditCard, Palette, Smartphone, Users } from 'lucide-react'

const points = [
  { icon: MessageSquare, label: 'WhatsApp-first engagement' },
  { icon: Mic, label: 'Voice commands in local dialects' },
  { icon: CreditCard, label: 'Paystack / Yoco / SnapScan integration' },
  { icon: Palette, label: 'Localised branding styles' },
  { icon: Smartphone, label: 'Mobile-first design' },
  { icon: Users, label: 'Support for township & rural entrepreneurs' },
]

export function BuiltForSA() {
  return (
    <section className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">🇿🇦 Built For South Africa</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Not a translated template — built here, for here
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-[#8a6f1f]">
                <p.icon size={20} />
              </div>
              <p className="font-semibold text-textdark">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
