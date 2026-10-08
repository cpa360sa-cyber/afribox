import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToDeal } from '../lib/mappers'
import type { Deal, DealStage } from '../types'

export function useDeals(businessId: string | undefined) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setDeals([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('deals')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setDeals((data ?? []).map(rowToDeal))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`deals-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deals', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createDeal(deal: { businessId: string; title: string; customerName: string; valueZAR?: number; leadId?: string }) {
    await supabase.from('deals').insert({
      business_id: deal.businessId,
      title: deal.title,
      customer_name: deal.customerName,
      value_zar: deal.valueZAR ?? null,
      lead_id: deal.leadId ?? null,
    })
  }

  async function updateDealStage(dealId: string, stage: DealStage) {
    await supabase.from('deals').update({ stage, updated_at: new Date().toISOString() }).eq('id', dealId)
  }

  return { deals, loading, createDeal, updateDealStage }
}
