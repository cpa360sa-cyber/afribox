import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToScanReport } from '../lib/mappers'
import type { ScanFinding, ScanReport } from '../types'

export function useScanReports(businessId: string | undefined) {
  const [reports, setReports] = useState<ScanReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setReports([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('scan_reports')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setReports((data ?? []).map(rowToScanReport))
      setLoading(false)
    }
    load()
  }, [businessId])

  async function saveReport(
    businessId: string,
    inputs: { website?: string; facebook?: string; instagram?: string },
    score: number,
    findings: ScanFinding[]
  ) {
    const { data } = await supabase
      .from('scan_reports')
      .insert({ business_id: businessId, inputs, score, findings })
      .select('*')
      .single()
    return data ? rowToScanReport(data) : null
  }

  return { reports, loading, saveReport }
}
