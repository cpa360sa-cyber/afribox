import { MessageCircle, CalendarClock, Palette } from 'lucide-react'
import type { AgentType } from '../../types'

export const agentIcons: Record<AgentType, typeof MessageCircle> = {
  salesbot: MessageCircle,
  adminbot: CalendarClock,
  brandbot: Palette,
}
