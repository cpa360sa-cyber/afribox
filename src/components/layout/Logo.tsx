import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { LogoMark } from './LogoMark'

interface LogoProps {
  dark?: boolean
  className?: string
  variant?: 'mark' | 'full'
  size?: number
}

// logo.webp is the full square lockup (icon + wordmark + tagline). The navbar
// needs just the icon, so we zoom/position a background-image crop onto a
// small square rather than shipping a second cropped asset.
export function Logo({ dark = false, className, variant = 'mark', size = 36 }: LogoProps) {
  if (variant === 'full') {
    return (
      <Link to="/" className={cn('inline-flex', className)}>
        <img src="/afribox/logo.webp" alt="AfriBox — Train Your Own AI Employee" className="w-full" />
      </Link>
    )
  }

  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={size} className="shrink-0 rounded-[0.6rem]" />
      <span className={cn('font-display text-xl font-extrabold leading-none', dark ? 'text-white' : 'text-textdark')}>
        Afri<span className="text-emerald">Box</span>
      </span>
    </Link>
  )
}
