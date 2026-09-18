import { Link } from 'react-router-dom'
import { Logo } from '../../components/layout/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-4 text-center">
      <div className="mb-8">
        <Logo />
      </div>
      <p className="font-display text-6xl font-extrabold text-emerald">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-textdark">Page not found</h1>
      <p className="mt-2 text-midgray">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  )
}
