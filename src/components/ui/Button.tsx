import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-emerald text-white hover:bg-emerald-dark focus:ring-emerald',
  secondary: 'bg-navy text-white hover:bg-navy/90 focus:ring-navy',
  gold: 'bg-gold text-navy hover:bg-gold-light focus:ring-gold',
  ghost: 'bg-transparent text-textdark hover:bg-black/5 focus:ring-emerald',
  outline: 'border-2 border-emerald text-emerald bg-transparent hover:bg-emerald/10 focus:ring-emerald',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
