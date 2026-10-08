import { Smartphone, MessageSquare, Mic, Sparkles, Bot, ScanSearch, Palette, BookOpen, Briefcase, BarChart3, CreditCard, CalendarClock, Zap } from 'lucide-react'

const pillars = [
  { icon: Smartphone, title: 'Mobile-First', copy: 'Powerful on any device, anywhere.' },
  { icon: MessageSquare, title: 'WhatsApp-First', copy: 'Meet your customers where they are.' },
  { icon: Mic, title: 'Voice-First', copy: 'Speak your business into action.' },
  { icon: Sparkles, title: 'AI-Powered', copy: 'Intelligence that learns and improves.' },
]

const stats = [
  { value: '10+', label: 'Core Modules' },
  { value: '6+', label: 'AI Employees' },
  { value: '100+', label: 'Automations' },
  { value: 'Unlimited', label: 'Possibilities' },
]

const integrations = ['WhatsApp', 'Stripe', 'Paystack', 'Yoco', 'Google Calendar', 'Outlook']

const modules = [
  { icon: Bot, title: 'AI Employee Hub', copy: 'Hire, train and manage your AI Employees.' },
  { icon: ScanSearch, title: 'AISCAN', copy: 'Scan your business. Get insights. Get ahead.' },
  { icon: Mic, title: 'Voice Commander', copy: 'Talk or type. AfriBox understands and acts.' },
  { icon: Palette, title: 'BrandBox', copy: 'Create your brand with AI in minutes.' },
  { icon: BookOpen, title: 'Knowledge Base', copy: 'Store, organize and access your business knowledge.' },
  { icon: Briefcase, title: 'CRM', copy: 'Manage leads, deals, pipelines and customers.' },
  { icon: BarChart3, title: 'Reporting', copy: 'Real-time dashboards. Make data-driven decisions.' },
  { icon: CreditCard, title: 'Payments', copy: 'Accept payments. Get paid faster.' },
  { icon: CalendarClock, title: 'Bookings', copy: 'Smart scheduling, reminders and calendars.' },
  { icon: Zap, title: 'Automations', copy: 'Build workflows. Automate anything.' },
]

export function ProductEcosystem() {
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">06 · Product Ecosystem</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Everything You Need. All in One Platform.
          </h2>
          <p className="mt-4 text-midgray">
            AfriBox brings together all the tools, AI and automations African businesses need to operate, grow
            and scale.
          </p>
        </div>

        <div className="mt-14">
          <p className="mb-5 text-center section-eyebrow">Built for African Businesses</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-black/5 bg-offwhite p-5 text-center">
                <p.icon className="mx-auto mb-2 text-emerald" size={22} />
                <p className="font-display text-sm font-bold text-textdark">{p.title}</p>
                <p className="mt-1 text-xs text-midgray">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl bg-navy px-6 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-gold-light">{s.value}</p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="section-eyebrow">Seamless Integrations</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-midgray">
            {integrations.map((name, i) => (
              <span key={name} className="flex items-center gap-6">
                {name}
                {i < integrations.length - 1 && <span className="text-black/15">•</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((m) => (
            <div key={m.title} className="rounded-2xl border border-black/5 bg-offwhite p-5 transition hover:border-orange/30 hover:shadow-soft">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <m.icon size={18} />
              </div>
              <h4 className="font-display text-sm font-bold text-textdark">{m.title}</h4>
              <p className="mt-1.5 text-xs text-midgray">{m.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
