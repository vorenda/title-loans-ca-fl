import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | TitleCash',
  description: 'The page you are looking for does not exist. Find our services and locations.',
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="space-y-4">
          <p className="text-slate-500">Here are some helpful links:</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition"
            >
              Go to Homepage
            </Link>
            <Link
              href="/locations"
              className="px-6 py-3 border border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-500 hover:text-slate-900 transition"
            >
              Find Locations
            </Link>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            <p>Looking for something specific?</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/services" className="text-amber-500 hover:underline">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-500 hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-amber-500 hover:underline">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
