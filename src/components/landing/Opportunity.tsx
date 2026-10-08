import { Check, Smartphone, MessageSquare, Cloud, TrendingUp } from 'lucide-react'

const points = [
  { title: 'Affordable AI', copy: 'Solutions built for African budgets.' },
  { title: 'Mobile-First', copy: 'Designed for how Africans work.' },
  { title: 'Voice-First', copy: 'Just speak. AfriBox takes action.' },
  { title: 'WhatsApp-First', copy: 'Meet businesses where they already are.' },
  { title: 'Local Language AI', copy: 'Communicate naturally in local languages.' },
  { title: 'Built for Africa', copy: 'Understanding our markets, challenges and opportunities.' },
]

const stats = [
  { icon: Smartphone, value: '600M+', label: 'Mobile internet users in Africa and growing.' },
  { icon: MessageSquare, value: 'WhatsApp', label: 'is the #1 business communication channel.' },
  { icon: Cloud, value: 'Cloud & AI', label: 'infrastructure is mature and more accessible.' },
  { icon: TrendingUp, value: 'SMEs Are Ready', label: 'to adopt AI that helps them save time, cut costs and grow.' },
]

export function Opportunity() {
  return (
    <section className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">03 · The Opportunity</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            AI is changing business.
          </h2>
          <p className="mt-2 font-display text-xl font-bold text-orange">
            Unfortunately… Africa has largely been left behind.
          </p>
          <p className="mt-4 text-midgray">
            Current AI tools were built for large enterprises in developed markets. African SMEs need something
            different.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-soft">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-white">
                <Check size={14} />
              </span>
              <div>
                <p className="font-display font-bold text-textdark">{p.title}</p>
                <p className="mt-0.5 text-sm text-midgray">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <s.icon size={20} />
              </div>
              <p className="font-display text-lg font-extrabold text-textdark">{s.value}</p>
              <p className="mt-1 text-sm text-midgray">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-display text-xl font-bold text-textdark">
            The opportunity is massive. The timing is perfect.
          </p>
          <p className="mt-3 text-midgray">
            AfriBox is uniquely positioned to unlock the productivity and growth potential of millions of African
            businesses.
          </p>
        </div>
      </div>
    </section>
  )
}
