import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCityPages, getCityPage, getAllServices, getCityPagesByState } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FinancialServiceSchema, FAQSchema } from '@/components/SchemaMarkup'

interface Props {
  params: Promise<{ state: string; city: string }>
}

export async function generateStaticParams() {
  const cityPages = await getAllCityPages()
  return cityPages.map((page) => {
    const stateSlug =
      page.location?.stateCode === 'CA'
        ? 'california'
        : page.location?.stateCode === 'FL'
          ? 'florida'
          : page.location?.stateCode?.toLowerCase() || 'unknown'
    return {
      state: stateSlug,
      city: page.slug,
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const cityPage = await getCityPage(citySlug)

  if (!cityPage) {
    return { title: 'City Not Found' }
  }

  return {
    title: cityPage.metaTitle || `Title Loans in ${cityPage.location?.city}, ${cityPage.location?.stateCode}`,
    description:
      cityPage.metaDescription ||
      `Get fast title loans in ${cityPage.location?.city}, ${cityPage.location?.stateCode}. Licensed lender, same-day funding. Apply online or visit our local branch.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params
  const [cityPage, services] = await Promise.all([getCityPage(citySlug), getAllServices()])

  if (!cityPage) {
    notFound()
  }

  const location = cityPage.location
  const statePage = cityPage.statePage
  const stateName = location?.state || (stateSlug === 'california' ? 'California' : 'Florida')
  const stateCode = location?.stateCode || (stateSlug === 'california' ? 'CA' : 'FL')

  // Get nearby cities (from CMS or same state)
  const nearbyCities = cityPage.nearbyLocations || []

  // Extract text from rich text content
  const extractText = (content: { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } } | null) => {
    if (!content?.root?.children) return ''
    return content.root.children
      .map((block) => block.children?.map((child) => child.text || '').join('') || '')
      .join(' ')
  }

  const localProofText = extractText(cityPage.localProofContent)
  const complianceText = extractText(cityPage.complianceContent)

  return (
    <>
      {/* Schema Markup */}
      <FinancialServiceSchema
        businessName={cityPage.napContent?.businessName || `TitleCash ${location?.city}`}
        city={location?.city || ''}
        state={stateName}
        stateCode={stateCode}
        address={cityPage.napContent?.address || ''}
        phone={cityPage.napContent?.phone || `(${location?.areaCode || '800'}) 555-1234`}
        latitude={location?.latitude}
        longitude={location?.longitude}
        url={`/locations/${stateSlug}/${citySlug}`}
      />
      {cityPage.faqs && cityPage.faqs.length > 0 && (
        <FAQSchema faqs={cityPage.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      )}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: stateName, href: `/locations/${stateSlug}` },
          { label: location?.city || citySlug, href: `/locations/${stateSlug}/${citySlug}` },
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
              <span>
                {location?.city}, {stateCode} Branch
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {cityPage.heroHeadline || `Title Loans in ${location?.city}, ${stateCode}`}
            </h1>

            <p className="text-xl text-white/90 mb-8">
              {cityPage.heroSubheadline ||
                `Get fast cash using your car title at our ${location?.city} location. Licensed lender, same-day funding available.`}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                Apply Now <span>&rarr;</span>
              </Link>
              <a
                href={`tel:+1${location?.areaCode || '800'}5551234`}
                className="btn-secondary text-lg px-8 py-4"
              >
                <span>&#128222;</span>
                Call ({location?.areaCode || '800'}) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Proof Section - Anti-Doorway */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Where to Find Us in {location?.city}</h2>

              {localProofText ? (
                <p className="text-slate-600 mb-6 leading-relaxed">{localProofText}</p>
              ) : (
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our {location?.city} branch is conveniently located in {location?.county} County
                  {location?.localFacts?.landmarks?.[0] && (
                    <>, near {location.localFacts.landmarks[0].name}</>
                  )}
                  {location?.localFacts?.highways?.[0] && (
                    <>. Easy access from {location.localFacts.highways[0].name}</>
                  )}
                  {location?.localFacts?.exits?.[0] && <> via {location.localFacts.exits[0].name}</>}.
                </p>
              )}

              {/* Local Facts Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {location?.localFacts?.landmarks && location.localFacts.landmarks.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Near</div>
                    <div className="font-semibold text-slate-900">
                      {location.localFacts.landmarks.slice(0, 2).map((l) => l.name).join(', ')}
                    </div>
                  </div>
                )}
                {location?.localFacts?.highways && location.localFacts.highways.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Highway Access</div>
                    <div className="font-semibold text-slate-900">
                      {location.localFacts.highways.slice(0, 2).map((h) => h.name).join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* NAP Section */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-slate-900 mb-4">
                  {cityPage.napContent?.businessName || `TitleCash ${location?.city}`}
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p className="flex items-center gap-2">
                    <span>&#128205;</span>
                    {cityPage.napContent?.address || `${location?.city}, ${stateCode}`}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>&#128222;</span>
                    <a
                      href={`tel:+1${location?.areaCode || '800'}5551234`}
                      className="text-amber-600 hover:underline font-semibold"
                    >
                      ({location?.areaCode || '800'}) 555-1234
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>&#128337;</span>
                    {cityPage.napContent?.hours || 'Mon-Fri 9:00 AM - 6:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-xl aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">&#128506;</div>
                <p className="text-slate-600">
                  {location?.city}, {stateCode}
                </p>
                {location?.latitude && location?.longitude && (
                  <p className="text-sm text-slate-400 mt-2">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Links UP to Pillar Pages */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Services Available in {location?.city}</h2>
            <p className="section-subtitle">All title loan services available at this location.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="card group text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{service.shortDescription}</p>
                <span className="text-amber-500 text-sm font-semibold">Learn More &rarr;</span>
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

      {/* State Compliance Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-4 p-6 bg-slate-100 border-b border-slate-200">
                <div className="text-3xl">&#9878;&#65039;</div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Understanding Title Loans in {stateName}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {complianceText ? (
                  <p className="text-slate-600">{complianceText}</p>
                ) : (
                  <p className="text-slate-600">
                    Residents of {location?.city} are protected by {stateName} lending regulations. We are a
                    licensed lender and comply with all state requirements.
                  </p>
                )}

                {statePage?.regulations && (
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

                {statePage?.consumerProtections && statePage.consumerProtections.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-3">Your Rights as a {stateCode} Borrower</h3>
                    <ul className="space-y-2">
                      {statePage.consumerProtections.slice(0, 3).map((protection) => (
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
                    {statePage?.disclaimer ||
                      `This information is for general guidance only. ${stateName} title loans are regulated by ${
                        stateCode === 'CA'
                          ? 'the Department of Financial Protection and Innovation (DFPI)'
                          : 'the Office of Financial Regulation (OFR)'
                      }. Consult with a licensed attorney or contact the regulatory body for the most current information.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {cityPage.faqs && cityPage.faqs.length > 0 && (
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="section-header">
              <h2 className="section-title">{location?.city} Title Loan FAQ</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {cityPage.faqs.map((faq) => (
                <div
                  key={faq.id}
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

      {/* Nearby Locations - Neural Mesh */}
      {nearbyCities.length > 0 && (
        <section className="section bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="section-header">
              <h2 className="section-title">Also Serving Nearby Cities</h2>
              <p className="section-subtitle">
                Can&apos;t make it to our {location?.city} location? We also serve:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {nearbyCities.slice(0, 4).map((nearbyCity) => {
                const nearbyStateSlug =
                  nearbyCity.stateCode === 'CA'
                    ? 'california'
                    : nearbyCity.stateCode === 'FL'
                      ? 'florida'
                      : nearbyCity.stateCode?.toLowerCase() || 'unknown'
                return (
                  <Link
                    key={nearbyCity.id}
                    href={`/locations/${nearbyStateSlug}/${nearbyCity.slug}`}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-slate-900">{nearbyCity.city}</span>
                    <span className="text-amber-500">&rarr;</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Cash in {location?.city}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply now and get approved in minutes. Visit our {location?.city} branch or apply online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-primary text-lg px-8 py-4">
              Apply Now
            </Link>
            <a
              href={`tel:+1${location?.areaCode || '800'}5551234`}
              className="btn-secondary text-lg px-8 py-4"
            >
              <span>&#128222;</span>
              Call ({location?.areaCode || '800'}) 555-1234
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
