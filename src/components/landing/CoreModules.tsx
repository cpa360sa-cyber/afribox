import { Bot, Mic, Palette, ScanSearch, CalendarClock, MessageSquare, Filter, BarChart3 } from 'lucide-react'

const modules = [
  { icon: Bot, title: 'AI Employee Hub', copy: 'Deploy SalesBot, AdminBot, and BrandBot to handle tasks automatically.' },
  { icon: Mic, title: 'Voice Command Center', copy: 'Control your business with voice — like Siri, but for startups.' },
  { icon: Palette, title: 'BrandBox', copy: 'Create logos, bios, and slogans instantly using AI.' },
  { icon: ScanSearch, title: 'AiScan', copy: 'Scan and audit your online presence, get AI-powered improvements.' },
  { icon: CalendarClock, title: 'Bookings & Payments', copy: 'Accept bookings and payments using Paystack, Yoco, or SnapScan.' },
  { icon: MessageSquare, title: 'WhatsApp Integration', copy: 'Automate WhatsApp messaging with your customers.' },
  { icon: Filter, title: 'Lead Funnels', copy: 'Capture and nurture leads using simple bots and pages.' },
  { icon: BarChart3, title: 'Reports & Analytics', copy: 'Get performance insights automatically, no spreadsheets needed.' },
]

export function CoreModules() {
  return (
    <div className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">The Full Toolkit</span>
        <h3 className="mt-3 font-display text-2xl font-extrabold text-textdark sm:text-3xl">AfriBox Core Modules</h3>
        <p className="mt-3 text-midgray">Everything a South African startup needs, in one dashboard.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => (
          <div key={m.title} className="rounded-2xl border border-black/5 bg-offwhite p-5 transition hover:border-emerald/30 hover:shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <m.icon size={18} />
            </div>
            <h4 className="font-display text-sm font-bold text-textdark">{m.title}</h4>
            <p className="mt-1.5 text-xs text-midgray">{m.copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
