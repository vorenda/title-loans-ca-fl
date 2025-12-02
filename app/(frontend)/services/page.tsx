import Link from 'next/link'
import { Metadata } from 'next'
import { getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Our Services - Title Loan Options',
  description:
    'Explore our title loan services including auto title loans, car title loans, emergency title loans, and more. Licensed lender in California and Florida.',
}

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h1 className="section-title">Our Title Loan Services</h1>
            <p className="section-subtitle">
              Flexible title loan options to meet your needs. All services available in California and Florida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="card group">
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors">
                  {service.name}
                </h2>
                <p className="text-slate-600 mb-4">{service.shortDescription}</p>

                {service.benefits && service.benefits.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {service.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit.id} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-emerald-500 font-bold mt-0.5">&#10003;</span>
                        {benefit.title}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="text-amber-500 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <span>&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply now for any of our title loan services. Fast approval, same-day funding available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-primary text-lg px-8 py-4">
              Apply Now
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
