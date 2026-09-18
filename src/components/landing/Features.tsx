import { MessageCircle, Target, Phone, Workflow, Check } from 'lucide-react'
import { DemoChat } from './DemoChat'

const features = [
  {
    icon: MessageCircle,
    title: 'ChatBot Agent',
    headline: 'Never miss a customer message again',
    copy: "AfriBox's ChatBot Agent answers customer questions 24/7 across your website and WhatsApp, using your business's own FAQs, services, and tone.",
    points: ['Trained on your business knowledge', 'Escalates to a human when needed', 'Available in English, Zulu, Sotho & Afrikaans'],
    demo: true,
  },
  {
    icon: Target,
    title: 'SalesBot',
    headline: 'Turn visitors into verified leads automatically',
    copy: 'SalesBot engages every visitor, asks the right qualifying questions, and captures their details straight into your lead inbox — no manual follow-up required.',
    points: ['Custom qualifying questions', 'Instant owner notifications', 'Leads organised by query type'],
  },
  {
    icon: Phone,
    title: 'Voice AI',
    headline: "Answer calls 24/7 — even when you're asleep",
    copy: 'A natural-sounding voice agent powered by Vapi answers your business phone line, books appointments, and routes urgent calls to you.',
    points: ['Custom voice persona', 'Works on your existing number', 'Coming soon — join the waitlist'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    headline: 'Automate the admin that drains your day',
    copy: 'Connect AfriBox to n8n, Zapier, or Make with pre-built templates for invoice reminders, booking confirmations, and lead follow-up sequences.',
    points: ['Pre-built automation templates', 'Visual activity log', 'One-click webhook setup'],
  },
]

export function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Meet Your AI Workforce</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-textdark sm:text-4xl">
            Four agents. One mission: grow your business.
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
