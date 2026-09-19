import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToBrandAsset } from '../lib/mappers'
import type { BrandAsset, BrandAssetType } from '../types'

export function useBrandAssets(businessId: string | undefined) {
  const [assets, setAssets] = useState<BrandAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setAssets([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('brand_assets')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setAssets((data ?? []).map(rowToBrandAsset))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`brand-assets-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'brand_assets', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function saveAsset(businessId: string, assetType: BrandAssetType, content: string, meta: Record<string, unknown> = {}) {
    await supabase.from('brand_assets').insert({ business_id: businessId, asset_type: assetType, content, meta })
  }

  async function deleteAsset(assetId: string) {
    await supabase.from('brand_assets').delete().eq('id', assetId)
  }

  return { assets, loading, saveAsset, deleteAsset }
}
