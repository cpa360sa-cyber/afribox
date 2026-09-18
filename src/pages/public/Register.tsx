import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { Logo } from '../../components/layout/Logo'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const { needsEmailConfirmation } = await register(email, password, name)
      if (needsEmailConfirmation) {
        setNeedsConfirmation(true)
      } else {
        navigate('/app/onboarding')
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message.startsWith('Supabase is not configured')
          ? err.message
          : 'Could not create account. That email may already be in use.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/app/onboarding')
    } catch {
      setError('Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (needsConfirmation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="card-surface p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
              <MailCheck size={24} />
            </div>
            <h1 className="font-display text-2xl font-bold text-textdark">Check your email</h1>
            <p className="mt-2 text-midgray">
              We sent a confirmation link to <span className="font-semibold text-textdark">{email}</span>. Click it
              to activate your account, then log in to start setting up your AI employee.
            </p>
            <Link to="/login" className="btn-primary mt-6 w-full">
              Go to Log In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card-surface p-8">
          <h1 className="font-display text-2xl font-bold text-textdark">Create your account</h1>
          <p className="mt-1 text-sm text-midgray">Deploy your first AI employee in minutes.</p>

          {error && (
            <div role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input label="Full name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating account…' : 'Get Started Free'}
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
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald hover:text-emerald-dark">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
