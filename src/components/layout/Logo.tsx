import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2 font-display font-extrabold text-xl', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald text-white text-sm font-extrabold">
        AB
      </span>
      <span className={dark ? 'text-white' : 'text-textdark'}>
        Afri<span className="text-emerald">Box</span>
      </span>
    </Link>
  )
}
