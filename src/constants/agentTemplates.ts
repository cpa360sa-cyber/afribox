import type { AgentTemplate } from '../types'

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    type: 'salesbot',
    name: 'SalesBot',
    tagline: 'Manages WhatsApp and Facebook messages',
    description: 'Chats with customers on WhatsApp and Facebook, answers questions in your business voice, and captures leads automatically.',
    icon: 'MessageCircle',
  },
  {
    type: 'adminbot',
    name: 'AdminBot',
    tagline: 'Handles bookings, emails, and reminders',
    description: 'Your always-on admin assistant — manages bookings, sends reminders, and follows up on invoices so nothing falls through the cracks.',
    icon: 'CalendarClock',
  },
  {
    type: 'brandbot',
    name: 'BrandBot',
    tagline: 'Keeps your branding consistent and sharp',
    description: 'Works with BrandBox to generate and maintain your logo, bio, and slogans, keeping every customer touchpoint on-brand.',
    icon: 'Palette',
  },
]

export function agentTemplate(type: string): AgentTemplate {
  return AGENT_TEMPLATES.find((t) => t.type === type) ?? AGENT_TEMPLATES[0]
}
