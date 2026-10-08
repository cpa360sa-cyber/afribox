import type { AgentTemplate, AutomationTemplate } from '../types'

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    type: 'adminbot',
    name: 'AdminBot',
    tagline: 'Calendar & scheduling · Reminders & follow-ups · Email management · Reports & summaries',
    description: 'Handles your calendar and scheduling, sends reminders and follow-ups, manages email, and puts together reports and summaries.',
    icon: 'CalendarClock',
  },
  {
    type: 'salesbot',
    name: 'SalesBot',
    tagline: 'Lead qualification · Follow-ups & nurturing · Deal tracking · Sales reporting',
    description: 'Qualifies leads, follows up and nurtures prospects on WhatsApp and Facebook, tracks deals, and reports on sales performance.',
    icon: 'MessageCircle',
  },
  {
    type: 'financebot',
    name: 'FinanceBot',
    tagline: 'Invoices & estimates · Expense tracking · Cashflow reports · Payment reminders',
    description: 'Generates invoices and estimates, tracks expenses, reports on cashflow, and chases payment reminders so you get paid faster.',
    icon: 'Receipt',
  },
  {
    type: 'supportbot',
    name: 'SupportBot',
    tagline: 'FAQ answering · Ticket management · Customer support · Satisfaction tracking',
    description: 'Answers FAQs from your Knowledge Base, manages support tickets, handles customer support conversations, and tracks satisfaction.',
    icon: 'Headset',
  },
  {
    type: 'brandbot',
    name: 'BrandBot',
    tagline: 'Logo & visuals · Marketing copy · Social media content · Brand strategy',
    description: 'Works with BrandBox to create your logo and visuals, write marketing copy and social content, and keep your brand strategy consistent.',
    icon: 'Palette',
  },
  {
    type: 'hrbot',
    name: 'HRBot',
    tagline: 'Recruitment · Interview scheduling · Onboarding · Employee support',
    description: 'Helps with recruitment, schedules interviews, runs onboarding for new hires, and supports your team.',
    icon: 'Users',
  },
]

export function agentTemplate(type: string): AgentTemplate {
  return AGENT_TEMPLATES.find((t) => t.type === type) ?? AGENT_TEMPLATES[0]
}

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  { id: 'invoice-reminder', name: 'Invoice Reminder', description: 'Automatically nudge customers with unpaid invoices on a schedule.', icon: 'Receipt' },
  { id: 'booking-confirmation', name: 'Booking Confirmation', description: 'Send a confirmation the moment a customer books a slot.', icon: 'CalendarCheck' },
  { id: 'lead-follow-up', name: 'Lead Follow-Up Sequence', description: 'A multi-step nurture sequence for new leads that haven\'t converted yet.', icon: 'GitBranch' },
  { id: 'review-request', name: 'Review Request', description: 'Ask happy customers for a review a few days after service.', icon: 'Star' },
  { id: 'cart-recovery', name: 'Abandoned Inquiry Recovery', description: 'Re-engage website visitors who asked a question but never followed through.', icon: 'RotateCcw' },
  { id: 'weekly-report', name: 'Weekly Performance Report', description: 'Send yourself a WhatsApp summary of leads, bookings and revenue every Monday.', icon: 'BarChart3' },
]

export function automationTemplate(id: string): AutomationTemplate {
  return AUTOMATION_TEMPLATES.find((t) => t.id === id) ?? AUTOMATION_TEMPLATES[0]
}
