import type { AgentTemplate, WorkflowTemplate } from '../types'

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    type: 'chatbot',
    name: 'ChatBot Agent',
    tagline: 'Never miss a customer message again',
    description: '24/7 web and WhatsApp-style chat that answers customer questions using your business knowledge.',
    icon: 'MessageCircle',
  },
  {
    type: 'salesbot',
    name: 'SalesBot',
    tagline: 'Turn visitors into verified leads automatically',
    description: 'Engages visitors, asks qualifying questions, and captures leads straight into your inbox.',
    icon: 'Target',
  },
  {
    type: 'voice',
    name: 'Voice AI Agent',
    tagline: 'Answer calls 24/7 — even when you\'re asleep',
    description: 'A phone-answering AI voice agent powered by Vapi. Coming soon.',
    icon: 'Phone',
  },
  {
    type: 'workflow',
    name: 'Workflow Automation',
    tagline: 'Automate the admin that drains your day',
    description: 'Connects to n8n, Zapier, or Make to run reminders, confirmations, and follow-ups automatically.',
    icon: 'Workflow',
  },
]

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'invoice-reminder',
    name: 'Invoice Reminder',
    description: 'Automatically nudge customers with unpaid invoices on a schedule.',
    icon: 'Receipt',
  },
  {
    id: 'appointment-confirmation',
    name: 'Appointment Booking Confirmation',
    description: 'Send a confirmation the moment a customer books a slot.',
    icon: 'CalendarCheck',
  },
  {
    id: 'follow-up-sequence',
    name: 'Follow-Up Sequence',
    description: 'A multi-step nurture sequence for new leads that haven\'t converted yet.',
    icon: 'GitBranch',
  },
]

export function agentTemplate(type: string): AgentTemplate {
  return AGENT_TEMPLATES.find((t) => t.type === type) ?? AGENT_TEMPLATES[0]
}
