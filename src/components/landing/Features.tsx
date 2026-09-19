import { MessageCircle, CalendarClock, Palette, Check } from 'lucide-react'
import { DemoChat } from './DemoChat'
import { CoreModules } from './CoreModules'

const features = [
  {
    icon: MessageCircle,
    title: 'SalesBot',
    headline: 'Never miss a WhatsApp or Facebook message again',
    copy: "AfriBox's SalesBot manages WhatsApp and Facebook messages 24/7, answering in your business's own voice and capturing every lead that comes through.",
    points: ['Trained on your business knowledge', 'Escalates to a human when needed', 'Available in English, Zulu, Sotho & Afrikaans'],
    demo: true,
  },
  {
    icon: CalendarClock,
    title: 'AdminBot',
    headline: 'The admin support you never had to hire',
    copy: 'AdminBot handles bookings, sends reminders, and follows up on unpaid invoices via WhatsApp — so cashflow stays consistent without you chasing it.',
    points: ['Automatic booking reminders', 'WhatsApp invoice follow-ups', 'Syncs with your calendar'],
  },
  {
    icon: Palette,
    title: 'BrandBot',
    headline: 'Weak branding, fixed in minutes',
    copy: 'BrandBot works with BrandBox to instantly create logos, bios, and slogans — then keeps every customer touchpoint consistent with your brand.',
    points: ['AI-generated logo concepts', 'Bios and slogans in seconds', 'Localised branding styles'],
  },
]

export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Meet Your AI Workforce</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Three AI employees. One digital co-founder.
          </h2>
        </div>

        <div className="mt-20 space-y-24">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <f.icon size={24} />
                </div>
                <span className="section-eyebrow">{f.title}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-textdark sm:text-3xl">{f.headline}</h3>
                <p className="mt-4 text-midgray">{f.copy}</p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-textdark">
                      <Check size={18} className="mt-0.5 shrink-0 text-emerald" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>{f.demo ? <DemoChat /> : <FeaturePlaceholder icon={f.icon} />}</div>
            </div>
          ))}
        </div>

        <CoreModules />
      </div>
    </section>
  )
}

function FeaturePlaceholder({ icon: Icon }: { icon: typeof MessageCircle }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-3xl border border-black/5 bg-gradient-to-br from-navy to-navy/90 shadow-lg">
      <Icon size={64} className="text-emerald/40" />
    </div>
  )
}
