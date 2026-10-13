import { Mail, MessageCircle, BookOpen } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'

const faqs = [
  { q: 'How do I deploy a new AI Employee?', a: 'Go to AI Employees → Add Agent, pick a type, and it starts working immediately within your plan\'s limit.' },
  { q: 'How does SalesBot know about my business?', a: 'It reads from your Business Profile (Settings) and AI Memory articles — keep those updated for accurate answers.' },
  { q: 'Can I upgrade my plan anytime?', a: 'Yes — go to Billing and switch plans. Changes apply immediately, no lock-in contracts.' },
  { q: 'Is my data secure?', a: 'Every business\'s data is isolated with row-level security in our database — no business can see another\'s records.' },
]

export default function HelpCenter() {
  return (
    <AppShell title="Help Center" subtitle="Guides, answers, and how to reach us.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {faqs.map((f) => (
            <Card key={f.q}>
              <p className="font-display font-bold text-textdark">{f.q}</p>
              <p className="mt-1.5 text-sm text-midgray">{f.a}</p>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col items-start gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <MessageCircle size={20} />
          </span>
          <div>
            <p className="font-display font-bold text-textdark">Still stuck?</p>
            <p className="mt-1 text-sm text-midgray">Our team replies within one business day.</p>
          </div>
          <a href="mailto:sales@afribox.ai" className="flex items-center gap-2 text-sm font-semibold text-emerald hover:underline">
            <Mail size={15} />
            sales@afribox.ai
          </a>
          <a href="https://www.afribox.ai" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-emerald hover:underline">
            <BookOpen size={15} />
            www.afribox.ai
          </a>
        </Card>
      </div>
    </AppShell>
  )
}
