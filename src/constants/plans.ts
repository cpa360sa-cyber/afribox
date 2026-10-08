import type { Plan } from '../types'

export const PLANS: Plan[] = [
  {
    id: 'starterbot',
    name: 'StarterBot',
    tagline: 'For startups & small businesses',
    priceZAR: 999,
    agentLimit: 2,
    conversationLimit: 500,
    features: [
      '2 AI Employees',
      '500 AI Credits / month',
      'Basic Automations (Up to 10)',
      'WhatsApp & Email Integration',
      'Basic Dashboards',
      'Community Support',
    ],
  },
  {
    id: 'growthbot',
    name: 'GrowthBot',
    tagline: 'For growing businesses',
    priceZAR: 2500,
    agentLimit: 6,
    conversationLimit: 2000,
    features: [
      '6 AI Employees',
      '2,000 AI Credits / month',
      'Advanced Automations (Up to 50)',
      'CRM, Bookings & Payments',
      'Advanced Dashboards & Reports',
      'Priority Support',
    ],
    highlight: true,
  },
  {
    id: 'powerbot',
    name: 'PowerBot',
    tagline: 'For scaling businesses & enterprises',
    priceZAR: 4500,
    agentLimit: 'unlimited',
    conversationLimit: 'unlimited',
    features: [
      'Unlimited AI Employees',
      'Unlimited AI Credits',
      'Unlimited Automations',
      'Custom Integrations & API Access',
      'Advanced Reports & Analytics',
      'Dedicated Account Manager',
    ],
  },
]

export function getPlan(planId: string): Plan {
  return PLANS.find((p) => p.id === planId) ?? PLANS[0]
}
