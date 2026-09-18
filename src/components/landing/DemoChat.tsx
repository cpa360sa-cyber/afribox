import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { sendChatMessage } from '../../lib/anthropic'
import type { Agent, Business, Message } from '../../types'

const demoBusiness: Business = {
  id: 'demo',
  ownerId: 'demo',
  name: 'Siyanda Fresh',
  industry: 'Grocery & Food Delivery',
  location: 'Soweto, Gauteng',
  description: 'Your neighbourhood grocery delivery service, Soweto',
  services: ['Same-day grocery delivery', 'Bulk household orders', 'Weekly fresh produce boxes'],
  faqs: [
    { q: 'What areas do you deliver to?', a: 'We deliver across Soweto, including Orlando, Diepkloof and Pimville.' },
    { q: 'What are your delivery hours?', a: 'We deliver Monday to Saturday, 8am to 6pm.' },
    { q: 'How do I pay?', a: 'We accept EFT, card on delivery, and SnapScan.' },
    { q: 'Is there a delivery fee?', a: 'Delivery is R35, free on orders over R500.' },
  ],
  tone: 'friendly',
  language: 'English',
  painPoints: [],
  createdAt: Date.now(),
}

const demoAgent: Agent = {
  id: 'demo-agent',
  businessId: 'demo',
  type: 'chatbot',
  name: 'Thandi',
  role: 'Friendly customer support assistant helping shoppers with orders, delivery and products.',
  status: 'active',
  config: {},
  createdAt: Date.now(),
  conversationCount: 0,
  leadsCount: 0,
}

const fallbackReplies: Record<string, string> = {
  delivery: "We deliver across Soweto — Orlando, Diepkloof and Pimville — Monday to Saturday, 8am to 6pm!",
  pay: 'We accept EFT, card on delivery, and SnapScan.',
  fee: 'Delivery is R35, free on orders over R500.',
  default: "Thanks for reaching out! I'm Thandi from Siyanda Fresh — ask me about our delivery areas, hours, or payment options.",
}

function fallbackReply(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('deliver')) return fallbackReplies.delivery
  if (lower.includes('pay')) return fallbackReplies.pay
  if (lower.includes('fee') || lower.includes('cost')) return fallbackReplies.fee
  return fallbackReplies.default
}

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Sawubona! I'm Thandi, your Siyanda Fresh assistant 🥬 Ask me about delivery areas, hours, or payment.",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || sending) return
    const userMessage: Message = { role: 'user', content: text, timestamp: Date.now() }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setSending(true)

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      const reply = apiKey
        ? await sendChatMessage(demoAgent, demoBusiness, nextMessages, 200)
        : fallbackReply(text)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, timestamp: Date.now() }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: fallbackReply(text), timestamp: Date.now() },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-[26rem] flex-col overflow-hidden rounded-3xl border border-black/5 bg-navy shadow-xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-white">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Thandi · Siyanda Fresh</p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-light">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-light" /> Live demo
          </p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === 'user' ? 'bg-emerald text-white' : 'bg-white/10 text-white'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white/10 px-4 py-2.5 text-sm text-white/60">Thandi is typing…</div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about delivery, hours, payment…"
          aria-label="Chat message"
          className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald"
        />
        <button
          onClick={handleSend}
          disabled={sending || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald text-white transition hover:bg-emerald-dark disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
