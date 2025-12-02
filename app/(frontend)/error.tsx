'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-slate-300 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Something Went Wrong</h2>
        <p className="text-slate-600 mb-8">
          We apologize for the inconvenience. Our team has been notified and is working to fix the
          issue.
        </p>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition"
          >
            Try Again
          </button>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link
              href="/"
              className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
            >
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Show error digest in development */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p className="mt-8 text-xs text-slate-400">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
