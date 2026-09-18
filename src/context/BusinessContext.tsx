import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { rowToBusiness } from '../lib/mappers'
import { useAuth } from './AuthContext'
import type { Business } from '../types'

interface BusinessContextValue {
  business: Business | null
  loading: boolean
}

const BusinessContext = createContext<BusinessContextValue>({ business: null, loading: true })

export function BusinessProvider({ children }: { children: ReactNode }) {
  const { authUser } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authUser) {
      setBusiness(null)
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase.from('businesses').select('*').eq('owner_id', authUser!.id).limit(1).maybeSingle()
      setBusiness(data ? rowToBusiness(data) : null)
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`businesses-${authUser.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'businesses', filter: `owner_id=eq.${authUser.id}` },
        load
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [authUser])

  return <BusinessContext.Provider value={{ business, loading }}>{children}</BusinessContext.Provider>
}

export function useBusinessContext() {
  return useContext(BusinessContext)
}
