import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToIntegration } from '../lib/mappers'
import type { IntegrationProvider } from '../types'

export function useIntegrations(businessId: string | undefined) {
  const [integrations, setIntegrations] = useState<ReturnType<typeof rowToIntegration>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setIntegrations([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase.from('integrations').select('*').eq('business_id', businessId)
      setIntegrations((data ?? []).map(rowToIntegration))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`integrations-${businessId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'integrations', filter: `business_id=eq.${businessId}` },
        load
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function connect(
    businessId: string,
    provider: IntegrationProvider,
    credentials: Record<string, string>
  ): Promise<{ success: boolean; error?: string }> {
    const { data, error: fnError } = await supabase.functions.invoke('validate-integration', {
      body: { provider, credentials },
    })

    if (fnError || !data) {
      await supabase.from('integrations').upsert(
        {
          business_id: businessId,
          provider,
          status: 'failed',
          credentials,
          last_checked_at: new Date().toISOString(),
          last_error: 'Could not reach the validation service. Please try again.',
        },
        { onConflict: 'business_id,provider' }
      )
      return { success: false, error: 'Could not reach the validation service. Please try again.' }
    }

    await supabase.from('integrations').upsert(
      {
        business_id: businessId,
        provider,
        status: data.valid ? 'connected' : 'failed',
        credentials,
        last_checked_at: new Date().toISOString(),
        last_error: data.valid ? null : data.error,
      },
      { onConflict: 'business_id,provider' }
    )

    return { success: data.valid, error: data.valid ? undefined : data.error }
  }

  async function disconnect(businessId: string, provider: IntegrationProvider) {
    await supabase
      .from('integrations')
      .upsert(
        { business_id: businessId, provider, status: 'disconnected', credentials: {}, last_error: null },
        { onConflict: 'business_id,provider' }
      )
  }

  return { integrations, loading, connect, disconnect }
}
