'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="text-center max-w-lg">
            <h1 className="text-6xl font-bold text-slate-300 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Critical Error</h2>
            <p className="text-slate-600 mb-8">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && error.digest && (
              <p className="mt-8 text-xs text-slate-400">Error ID: {error.digest}</p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
