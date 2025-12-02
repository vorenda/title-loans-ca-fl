import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllStates, getStatePage, getCityPagesByState, getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface Props {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  const states = await getAllStates()
  return states.map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const statePage = await getStatePage(stateSlug)

  if (!statePage) {
    return { title: 'State Not Found' }
  }

  return {
    title: statePage.metaTitle || `Title Loans in ${statePage.state} - ${statePage.stateCode} Locations`,
    description:
      statePage.metaDescription ||
      `Find title loans in ${statePage.state}. Licensed lender serving cities across ${statePage.stateCode}. Fast approval, same-day funding.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const [statePage, cityPages, services, states] = await Promise.all([
    getStatePage(stateSlug),
    getCityPagesByState(stateSlug),
    getAllServices(),
    getAllStates(),
  ])

  if (!statePage) {
    notFound()
  }

  const currentState = states.find((s) => s.slug === stateSlug)
  const stateName = statePage.state
  const stateCode = statePage.stateCode

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: stateName, href: `/locations/${stateSlug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-sm font-semibold text-white mb-6">
              <span>&#128205;</span>
              <span>Serving {currentState?.cities.length || cityPages.length} Cities in {stateCode}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Title Loans in {stateName}</h1>

            <p className="text-xl text-white/90 mb-8">
              Get fast title loans at any of our {stateName} locations. Licensed by{' '}
              {stateCode === 'CA' ? 'DFPI' : 'OFR'}. Same-day funding available.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                Apply Now <span>&rarr;</span>
              </Link>
              <a href="tel:+18005551234" className="btn-secondary text-lg px-8 py-4">
                <span>&#128222;</span>
                Call (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services in State */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Our Services in {stateName}</h2>
            <p className="section-subtitle">All services available at every {stateName} location.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="card group text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm">{service.shortDescription}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="btn-secondary">
              View All Services <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Cities We Serve in {stateName}</h2>
            <p className="section-subtitle">Select your city to learn more and get local contact info.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cityPages.map((cityPage) => (
              <Link
                key={cityPage.id}
                href={`/locations/${stateSlug}/${cityPage.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all"
              >
                <div>
                  <div className="font-semibold text-slate-900">{cityPage.location?.city}</div>
                  <div className="text-sm text-slate-500">{cityPage.location?.county}</div>
                </div>
                <span className="text-amber-500">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* State Compliance Info */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-4 p-6 bg-slate-100 border-b border-slate-200">
                <div className="text-3xl">&#9878;&#65039;</div>
                <h2 className="text-2xl font-bold text-slate-900">{stateName} Title Loan Regulations</h2>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-slate-600">
                  We are a licensed lender in {stateName} and comply with all state regulations. Here&apos;s what you
                  need to know:
                </p>

                {statePage.regulations && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {statePage.regulations.maxAPR && (
                      <div className="p-4 bg-white rounded-lg border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">APR Information</div>
                        <div className="font-semibold text-slate-900">{statePage.regulations.maxAPR}</div>
                      </div>
                    )}
                    {statePage.regulations.maxLoanAmount && (
                      <div className="p-4 bg-white rounded-lg border border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Loan Amount</div>
                        <div className="font-semibold text-slate-900">{statePage.regulations.maxLoanAmount}</div>
                      </div>
                    )}
                  </div>
                )}

                {statePage.consumerProtections && statePage.consumerProtections.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-3">Consumer Protections</h3>
                    <ul className="space-y-2">
                      {statePage.consumerProtections.slice(0, 5).map((protection) => (
                        <li key={protection.id} className="flex items-start gap-2 text-slate-600">
                          <span className="text-emerald-500 font-bold mt-1">&#10003;</span>
                          <span>
                            <strong>{protection.protection}:</strong> {protection.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-bold text-slate-900 mb-2">Important Consumer Information</h4>
                  <p className="text-sm text-slate-600">
                    This information is for general guidance only. {stateName} title loans are regulated by{' '}
                    {stateCode === 'CA'
                      ? 'the Department of Financial Protection and Innovation (DFPI)'
                      : 'the Office of Financial Regulation (OFR)'}
                    . Consult with a licensed attorney or contact the regulatory body for the most current information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {statePage.cityPageContent?.keyPoints && (
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="section-header">
              <h2 className="section-title">{stateName} Title Loan FAQ</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: `Are title loans legal in ${stateName}?`,
                  answer: statePage.legalStatus,
                },
                {
                  question: `How do I apply for a title loan in ${stateName}?`,
                  answer: `Apply online or visit any of our ${stateName} locations. Bring your car title, ID, proof of income, and proof of residence. Most applications are approved within 30 minutes.`,
                },
                {
                  question: `What are my rights as a ${stateName} borrower?`,
                  answer: statePage.cityPageContent.keyPoints.slice(0, 3).join(' '),
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="faq-item border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors bg-white"
                >
                  <details>
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-lg text-slate-900">{faq.question}</span>
                      <span className="faq-icon text-2xl text-amber-500 transition-transform">+</span>
                    </summary>
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed">{faq.answer}</div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started in {stateName}?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply now and get approved in minutes. Licensed lender with locations across {stateName}.
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
