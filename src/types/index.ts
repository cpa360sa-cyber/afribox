export type UserRole = 'client' | 'admin'

export interface AppUser {
  uid: string
  email: string
  displayName: string
  role: UserRole
  createdAt: number
  planId: string
  onboardingComplete: boolean
}

export interface FAQ {
  q: string
  a: string
}

export interface Business {
  id: string
  ownerId: string
  name: string
  industry: string
  location: string
  website?: string
  logoUrl?: string
  description: string
  services: string[]
  faqs: FAQ[]
  tone: AgentTone
  language: AgentLanguage
  painPoints: string[]
  createdAt: number
}

export type AgentTone = 'formal' | 'friendly' | 'casual'
export type AgentLanguage = 'English' | 'Zulu' | 'Sotho' | 'Afrikaans'
export type AgentType = 'salesbot' | 'adminbot' | 'brandbot'
export type AgentStatus = 'active' | 'paused'

export interface AgentConfig {
  whatsappNumber?: string
  facebookPageUrl?: string
  webhookUrl?: string
  qualifyingQuestions?: string[]
  reminderLeadTimeHours?: number
}

export interface Agent {
  id: string
  businessId: string
  type: AgentType
  name: string
  role: string
  status: AgentStatus
  config: AgentConfig
  createdAt: number
  conversationCount: number
  leadsCount: number
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type ConversationStatus = 'open' | 'resolved'

export interface Conversation {
  id: string
  agentId: string
  businessId: string
  messages: Message[]
  status: ConversationStatus
  createdAt: number
  customerName?: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'

export interface Lead {
  id: string
  agentId: string
  businessId: string
  name: string
  phone: string
  email: string
  queryType: string
  createdAt: number
  status: LeadStatus
}

export interface Plan {
  id: string
  name: string
  priceZAR: number | null
  agentLimit: number | 'unlimited'
  conversationLimit: number | 'unlimited'
  features: string[]
  highlight?: boolean
}

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled'

export interface Subscription {
  id: string
  businessId: string
  planId: string
  status: SubscriptionStatus
  startDate: number
  nextBillingDate: number
}

export interface AgentTemplate {
  type: AgentType
  name: string
  tagline: string
  description: string
  icon: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type PaymentProvider = 'paystack' | 'yoco' | 'snapscan'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface Booking {
  id: string
  businessId: string
  customerName: string
  customerPhone: string
  service: string
  scheduledAt: number
  status: BookingStatus
  paymentProvider: PaymentProvider | null
  paymentStatus: PaymentStatus
  amountZAR: number | null
  createdAt: number
}

export type BrandAssetType = 'logo' | 'bio' | 'slogan'

export interface BrandAsset {
  id: string
  businessId: string
  assetType: BrandAssetType
  content: string
  meta: Record<string, unknown>
  createdAt: number
}

export interface ScanFinding {
  area: string
  issue: string
  recommendation: string
}

export interface ScanReport {
  id: string
  businessId: string
  inputs: { website?: string; facebook?: string; instagram?: string }
  score: number | null
  findings: ScanFinding[]
  createdAt: number
}
