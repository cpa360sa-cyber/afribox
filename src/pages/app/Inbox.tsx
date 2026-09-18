import { useState } from 'react'
import { MessageSquare, Inbox as InboxIcon } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'
import { useConversations } from '../../hooks/useConversations'
import { useAgents } from '../../hooks/useAgents'
import { formatRelativeTime } from '../../lib/utils'
import { cn } from '../../lib/utils'
import type { Conversation } from '../../types'

export default function Inbox() {
  const { business } = useBusiness()
  const { conversations, loading } = useConversations(business?.id)
  const { agents } = useAgents(business?.id)
  const [selected, setSelected] = useState<Conversation | null>(null)

  function agentName(agentId: string) {
    return agents.find((a) => a.id === agentId)?.name ?? 'Agent'
  }

  return (
    <AppShell title="Inbox">
      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
      ) : conversations.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <InboxIcon className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No conversations yet</p>
          <p className="max-w-sm text-sm text-midgray">
            Once customers start chatting with your agents, conversations will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="card-surface lg:col-span-2 p-0">
            <ul className="divide-y divide-black/5">
              {conversations.map((c) => {
                const lastMessage = c.messages[c.messages.length - 1]
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelected(c)}
                      className={cn(
                        'flex w-full items-start gap-3 p-4 text-left transition hover:bg-black/[0.02]',
                        selected?.id === c.id && 'bg-emerald/5'
                      )}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                        <MessageSquare size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-textdark">{agentName(c.agentId)}</p>
                          <span className="shrink-0 text-xs text-midgray">{formatRelativeTime(c.createdAt)}</span>
                        </div>
                        <p className="truncate text-sm text-midgray">{lastMessage?.content ?? '—'}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="card-surface lg:col-span-3">
            {selected ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display font-bold text-textdark">{agentName(selected.agentId)}</h3>
                  <Badge tone={selected.status === 'open' ? 'emerald' : 'gray'}>{selected.status}</Badge>
                </div>
                <div className="space-y-3">
                  {selected.messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                          m.role === 'user' ? 'bg-emerald text-white' : 'bg-black/5 text-textdark'
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="py-16 text-center text-sm text-midgray">Select a conversation to view messages.</p>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
