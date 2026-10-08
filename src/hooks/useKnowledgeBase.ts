import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToKnowledgeArticle } from '../lib/mappers'
import type { KnowledgeArticle } from '../types'

export function useKnowledgeBase(businessId: string | undefined) {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setArticles([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('knowledge_articles')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setArticles((data ?? []).map(rowToKnowledgeArticle))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`knowledge-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_articles', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createArticle(businessId: string, title: string, content: string) {
    await supabase.from('knowledge_articles').insert({ business_id: businessId, title, content })
  }

  async function updateArticle(articleId: string, title: string, content: string) {
    await supabase.from('knowledge_articles').update({ title, content, updated_at: new Date().toISOString() }).eq('id', articleId)
  }

  async function deleteArticle(articleId: string) {
    await supabase.from('knowledge_articles').delete().eq('id', articleId)
  }

  return { articles, loading, createArticle, updateArticle, deleteArticle }
}
