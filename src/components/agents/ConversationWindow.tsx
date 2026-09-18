import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, AlertTriangle } from 'lucide-react'
import { sendChatMessage } from '../../lib/anthropic'
import type { Agent, Business, Message } from '../../types'

interface Props {
  agent: Agent
  business: Business
  onConversationEnd?: (messages: Message[]) => void
}

export function ConversationWindow({ agent, business, onConversationEnd }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi, I'm ${agent.name} — how can I help you with ${business.name} today?`,
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || sending) return
    setError('')
    const userMessage: Message = { role: 'user', content: text, timestamp: Date.now() }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setSending(true)

    try {
      const reply = await sendChatMessage(agent, business, nextMessages)
      const updated: Message[] = [...nextMessages, { role: 'assistant', content: reply, timestamp: Date.now() }]
      setMessages(updated)
      onConversationEnd?.(updated)
    } catch {
      setError('Could not reach the AI agent. Check your VITE_ANTHROPIC_API_KEY and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="flex items-center gap-3 border-b border-black/5 bg-navy px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-white">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{agent.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-light">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-light" /> Test conversation
          </p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-offwhite px-5 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === 'user' ? 'bg-emerald text-white' : 'bg-white text-textdark shadow-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-2.5 text-sm text-midgray shadow-sm">Typing…</div>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 border-t border-red-100 bg-red-50 px-5 py-2 text-xs text-red-700">
          <AlertTriangle size={14} />
          {error}
        </div>
      )}
      <div className="flex items-center gap-2 border-t border-black/5 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a test message…"
          aria-label="Test message"
          className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
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
