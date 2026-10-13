import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToInvoice } from '../lib/mappers'
import type { Invoice, InvoiceStatus } from '../types'

export function useInvoices(businessId: string | undefined) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setInvoices([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setInvoices((data ?? []).map(rowToInvoice))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`invoices-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createInvoice(inv: { businessId: string; customerName: string; description?: string; amountZAR: number; dueDate?: string }) {
    await supabase.from('invoices').insert({
      business_id: inv.businessId,
      customer_name: inv.customerName,
      description: inv.description ?? '',
      amount_zar: inv.amountZAR,
      due_date: inv.dueDate ?? null,
      status: 'sent',
    })
  }

  async function updateInvoiceStatus(invoiceId: string, status: InvoiceStatus) {
    await supabase.from('invoices').update({ status }).eq('id', invoiceId)
  }

  return { invoices, loading, createInvoice, updateInvoiceStatus }
}
