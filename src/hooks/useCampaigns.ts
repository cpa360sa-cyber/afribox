import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToCampaign } from '../lib/mappers'
import type { Campaign, CampaignChannel, CampaignStatus } from '../types'

export function useCampaigns(businessId: string | undefined) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setCampaigns([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('campaigns')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setCampaigns((data ?? []).map(rowToCampaign))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`campaigns-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'campaigns', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createCampaign(c: { businessId: string; name: string; channel: CampaignChannel; budgetZAR?: number }) {
    await supabase.from('campaigns').insert({
      business_id: c.businessId,
      name: c.name,
      channel: c.channel,
      budget_zar: c.budgetZAR ?? null,
      status: 'active',
    })
  }

  async function updateCampaignStatus(campaignId: string, status: CampaignStatus) {
    await supabase.from('campaigns').update({ status }).eq('id', campaignId)
  }

  return { campaigns, loading, createCampaign, updateCampaignStatus }
}
