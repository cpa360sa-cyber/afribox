import { CalendarClock, MessageCircle, Receipt, Headset, Palette, Users } from 'lucide-react'
import type { AgentType } from '../../types'

export const agentIcons: Record<AgentType, typeof MessageCircle> = {
  adminbot: CalendarClock,
  salesbot: MessageCircle,
  financebot: Receipt,
  supportbot: Headset,
  brandbot: Palette,
  hrbot: Users,
}
