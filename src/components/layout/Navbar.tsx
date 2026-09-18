import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../../hooks/useAuth'

const links = [
  { to: '/#features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { authUser } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo dark />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.to} href={link.to} className="text-sm font-medium text-white/80 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {authUser ? (
            <Link to="/app/dashboard" className="btn-primary text-sm">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-white/80 hover:text-white">
                Log In
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Get Started Free
              </Link>
            </>
          )}
        </div>
        <button
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-navy md:hidden">
          <div className="container-page flex flex-col gap-4 py-6">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              {authUser ? (
                <Link to="/app/dashboard" className="btn-primary justify-center">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary justify-center">
                    Log In
                  </Link>
                  <Link to="/register" className="btn-primary justify-center">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
