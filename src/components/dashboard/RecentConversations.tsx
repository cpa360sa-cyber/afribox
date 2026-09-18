import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { formatRelativeTime } from '../../lib/utils'
import type { Conversation } from '../../types'

export function RecentConversations({ conversations }: { conversations: Conversation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <Link to="/app/inbox" className="text-sm font-semibold text-emerald hover:text-emerald-dark">
          View all
        </Link>
      </CardHeader>
      {conversations.length === 0 ? (
        <p className="py-8 text-center text-sm text-midgray">No conversations yet — they'll show up here once your agent starts chatting.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.slice(0, 5).map((c) => {
            const lastMessage = c.messages[c.messages.length - 1]
            return (
              <li key={c.id} className="flex items-start gap-3 rounded-xl border border-black/5 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                  <MessageSquare size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-textdark">
                      {c.customerName ?? 'Website visitor'}
                    </p>
                    <span className="shrink-0 text-xs text-midgray">{formatRelativeTime(c.createdAt)}</span>
                  </div>
                  <p className="truncate text-sm text-midgray">{lastMessage?.content ?? '—'}</p>
                </div>
                <Badge tone={c.status === 'open' ? 'emerald' : 'gray'}>{c.status}</Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
