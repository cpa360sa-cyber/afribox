import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/layout/Logo'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/app/dashboard')
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('Supabase is not configured')) {
        setError(err.message)
      } else if (err instanceof Error && err.message.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email first — check the link we sent you when you signed up.')
      } else {
        setError('Invalid email or password.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/app/dashboard')
    } catch {
      setError('Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card-surface p-8">
          <h1 className="font-display text-2xl font-bold text-textdark">Welcome back</h1>
          <p className="mt-1 text-sm text-midgray">Log in to manage your AI employees.</p>

          {error && (
            <div role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Logging in…' : 'Log In'}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-xs font-medium text-midgray">OR</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <Button variant="outline" onClick={handleGoogle} disabled={loading} className="w-full">
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-midgray">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-emerald hover:text-emerald-dark">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
