import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User as AuthUser } from '@supabase/supabase-js'
import { supabase, supabaseConfigured } from '../lib/supabase'
import { rowToAppUser } from '../lib/mappers'
import type { AppUser } from '../types'

interface AuthContextValue {
  authUser: AuthUser | null
  appUser: AppUser | null
  loading: boolean
  register: (email: string, password: string, displayName: string) => Promise<{ needsEmailConfirmation: boolean }>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function fetchProfile(userId: string): Promise<AppUser | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error || !data) return null
  return rowToAppUser(data)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setAuthUser(session?.user ?? null)
      if (session?.user) setAppUser(await fetchProfile(session.user.id))
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthUser(session?.user ?? null)
      if (session?.user) {
        // The DB trigger that creates the profile row can lag a signup by a beat.
        let profile = await fetchProfile(session.user.id)
        if (!profile) {
          await new Promise((r) => setTimeout(r, 400))
          profile = await fetchProfile(session.user.id)
        }
        setAppUser(profile)
      } else {
        setAppUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!authUser) return
    const channel = supabase
      .channel(`profile-${authUser.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${authUser.id}` },
        async () => setAppUser(await fetchProfile(authUser.id))
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [authUser])

  function assertConfigured() {
    if (!supabaseConfigured) {
      throw new Error('Supabase is not configured. Set the VITE_SUPABASE_* variables in your .env file.')
    }
  }

  async function register(email: string, password: string, displayName: string) {
    assertConfigured()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) throw error
    // Supabase returns no session when the project requires email confirmation.
    return { needsEmailConfirmation: !data.session }
  }

  async function login(email: string, password: string) {
    assertConfigured()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function loginWithGoogle() {
    assertConfigured()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw error
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ authUser, appUser, loading, register, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
