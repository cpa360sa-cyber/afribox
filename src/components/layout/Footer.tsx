import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { SocialIcon, type SocialPlatform } from './SocialIcon'

const socials: SocialPlatform[] = ['facebook', 'instagram', 'twitter', 'linkedin']

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/#how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Community', href: '/#community' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Register', href: '/register' },
      { label: 'Log In', href: '/login' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm">
            AI Employees for African Business. Built by Etaerc AI Agency, Pretoria, South Africa.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map((platform) => (
              <a
                key={platform}
                href="#"
                aria-label={`AfriBox on ${platform}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-emerald hover:text-emerald"
              >
                <SocialIcon platform={platform} size={16} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="text-sm hover:text-emerald">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm hover:text-emerald">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">
        © 2025 AfriBox by Etaerc AI Agency. Pretoria, South Africa.
      </div>
    </footer>
  )
}
