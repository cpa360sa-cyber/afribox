import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Without real credentials the client still constructs fine (unlike Firebase's
// getAuth()), but every request will fail — surface that clearly instead of a
// silent hang so the public marketing pages still render.
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-anon-key'
)
