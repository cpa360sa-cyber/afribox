import { Clock, TrendingUp, Heart, Banknote, LineChart, MessageCircle, CalendarClock, Briefcase, CreditCard, Zap, BarChart3, BookOpen } from 'lucide-react'
import { DemoChat } from './DemoChat'

const benefits = [
  { icon: Clock, title: 'Save Time', copy: 'Automate repetitive tasks and focus on what matters.' },
  { icon: TrendingUp, title: 'Increase Sales', copy: 'Capture more leads, nurture customers and close deals.' },
  { icon: Heart, title: 'Delight Customers', copy: 'Instant responses, personalized service and 24/7 support.' },
  { icon: Banknote, title: 'Get Paid Faster', copy: 'Send invoices, track payments and improve cash flow.' },
  { icon: LineChart, title: 'Grow Smarter', copy: 'Real-time insights to make better decisions.' },
]

const connected = [
  { icon: MessageCircle, title: 'WhatsApp AI', copy: 'Talk to customers instantly.' },
  { icon: CalendarClock, title: 'Bookings', copy: 'Manage appointments and calendars.' },
  { icon: Briefcase, title: 'CRM', copy: 'Track leads, deals and customers.' },
  { icon: CreditCard, title: 'Payments', copy: 'Get paid faster and easier.' },
  { icon: Zap, title: 'Automations', copy: 'Workflows that run while you sleep.' },
  { icon: BarChart3, title: 'Reports', copy: 'Real-time insights and analytics.' },
  { icon: BookOpen, title: 'Knowledge Base', copy: 'AI learns your business to serve better.' },
]

export function ProductDemo() {
  return (
    <section className="bg-offwhite py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">05 · Product Demo</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Your business. Supercharged by AI Employees.
          </h2>
          <p className="mt-4 text-midgray">
            AfriBox brings all your operations, customers, finances and growth activities into one intelligent
            dashboard powered by AI.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <ul className="space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <b.icon size={20} />
                </span>
                <div>
                  <p className="font-display font-bold text-textdark">{b.title}</p>
                  <p className="text-sm text-midgray">{b.copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <DemoChat />
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-display text-2xl font-extrabold text-textdark">Everything connected.</h3>
          <p className="mt-1 text-midgray">One platform. Unlimited impact.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {connected.map((c) => (
            <div key={c.title} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-soft">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <c.icon size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-textdark">{c.title}</p>
                <p className="text-xs text-midgray">{c.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
