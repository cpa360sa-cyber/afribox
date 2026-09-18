import type { Plan } from '../types'

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceZAR: 999,
    agentLimit: 1,
    conversationLimit: 500,
    features: [
      '1 AI Agent',
      '500 conversations / month',
      'WhatsApp-style chatbot',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    priceZAR: 2499,
    agentLimit: 3,
    conversationLimit: 'unlimited',
    features: [
      '3 AI Agents',
      'Unlimited conversations',
      'Voice AI (Vapi)',
      'Advanced analytics',
      'Priority support',
    ],
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceZAR: null,
    agentLimit: 'unlimited',
    conversationLimit: 'unlimited',
    features: [
      'Unlimited AI Agents',
      'Dedicated onboarding',
      'SLA guarantee',
      'On-site support',
      'Custom integrations',
    ],
  },
]

export function getPlan(planId: string): Plan {
  return PLANS.find((p) => p.id === planId) ?? PLANS[0]
}
