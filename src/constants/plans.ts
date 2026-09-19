import type { Plan } from '../types'

export const PLANS: Plan[] = [
  {
    id: 'starterbot',
    name: 'StarterBot',
    priceZAR: 999,
    agentLimit: 1,
    conversationLimit: 500,
    features: [
      '1 AI Bot',
      'BrandBox Basic',
      'WhatsApp messaging',
      'AiScan Lite',
      '500 conversations / month',
    ],
  },
  {
    id: 'growthbot',
    name: 'GrowthBot',
    priceZAR: 2500,
    agentLimit: 3,
    conversationLimit: 'unlimited',
    features: [
      '3 AI Bots',
      'Voice Command Center',
      'Full BrandBox',
      'Full AiScan',
      'Unlimited conversations',
    ],
    highlight: true,
  },
  {
    id: 'powerbot',
    name: 'PowerBot',
    priceZAR: 4500,
    agentLimit: 'unlimited',
    conversationLimit: 'unlimited',
    features: [
      'Unlimited AI Bots',
      'Strategy Assistant',
      'Booking queuing',
      'Priority support',
      'Everything in GrowthBot',
    ],
  },
]

export function getPlan(planId: string): Plan {
  return PLANS.find((p) => p.id === planId) ?? PLANS[0]
}
