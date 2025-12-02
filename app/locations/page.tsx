import Link from 'next/link'
import { Metadata } from 'next'
import { getAllStates } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Locations - Find Title Loans Near You',
  description:
    'Find title loan locations in California and Florida. Fast approval, same-day funding. Licensed lender serving major cities.',
}

export default async function LocationsPage() {
  const states = await getAllStates()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
        ]}
      />

      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h1 className="section-title">Find Title Loans Near You</h1>
            <p className="section-subtitle">
              We proudly serve customers across California and Florida. Select your state to find a location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {states.map((state) => (
              <div key={state.slug} className="card">
                <h2 className="text-2xl font-bold text-amber-500 mb-2">{state.name}</h2>
                <p className="text-slate-600 mb-4">Serving {state.cities.length} cities across {state.name}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {state.cities.slice(0, 8).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${state.slug}/${city.slug}`}
                      className="text-slate-600 hover:text-amber-500 transition-colors text-sm py-1"
                    >
                      {city.city}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/locations/${state.slug}`}
                  className="btn-primary w-full justify-center"
                >
                  View All {state.stateCode} Locations <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Locations</h2>
            <p className="section-subtitle">Every location offers the same great service and fast approval.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">&#128205;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Convenient Locations</h3>
              <p className="text-slate-600">Easy access from major highways and landmarks</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">&#9889;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Service</h3>
              <p className="text-slate-600">Get approved and funded the same day</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">&#128101;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Local Experts</h3>
              <p className="text-slate-600">Friendly staff who know your community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Can&apos;t Find Your City?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply online and we&apos;ll help you find the nearest location or arrange remote service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-primary text-lg px-8 py-4">
              Apply Online
            </Link>
            <a href="tel:+18005551234" className="btn-secondary text-lg px-8 py-4">
              <span>&#128222;</span>
              Call (800) 555-1234
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
