import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToDocument } from '../lib/mappers'

export function useDocuments(businessId: string | undefined) {
  const [documents, setDocuments] = useState<ReturnType<typeof rowToDocument>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setDocuments([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setDocuments((data ?? []).map(rowToDocument))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`documents-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'documents', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function addDocument(businessId: string, name: string, category: string, url: string) {
    await supabase.from('documents').insert({ business_id: businessId, name, category, url })
  }

  async function removeDocument(documentId: string) {
    await supabase.from('documents').delete().eq('id', documentId)
  }

  return { documents, loading, addDocument, removeDocument }
}
