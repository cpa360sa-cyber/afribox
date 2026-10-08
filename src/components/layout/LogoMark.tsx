// Crops the icon out of the full logo.webp lockup (icon + wordmark + tagline)
// via a zoomed/positioned background-image, so we don't need a second asset.
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className ?? 'rounded-[0.6rem]'}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundImage: 'url(/afribox/logo.webp)',
        backgroundSize: '200% 200%',
        backgroundPosition: '54% 23%',
        backgroundRepeat: 'no-repeat',
      }}
      aria-hidden="true"
    />
  )
}
