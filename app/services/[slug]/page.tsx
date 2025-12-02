import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllServices, getService } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ServiceSchema, FAQSchema } from '@/components/SchemaMarkup'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.name} - Fast Approval, Same Day Funding`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, allServices] = await Promise.all([getService(slug), getAllServices()])

  if (!service) {
    notFound()
  }

  const relatedServices = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <ServiceSchema
        serviceName={service.name}
        description={service.shortDescription}
        url={`/services/${service.slug}`}
      />
      {service.faqs && service.faqs.length > 0 && (
        <FAQSchema faqs={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      )}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name, href: `/services/${service.slug}` },
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
              <span>&#10003;</span>
              <span>Licensed in CA &amp; FL</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{service.name}</h1>

            <p className="text-xl text-white/90 mb-8">{service.shortDescription}</p>

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

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">About {service.name}</h2>
                <p className="text-slate-600 leading-relaxed">{service.fullDescription}</p>
              </div>

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit) => (
                      <div key={benefit.id} className="card">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How It Works */}
              {service.howItWorks && service.howItWorks.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
                  <div className="space-y-6">
                    {service.howItWorks.map((step) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-amber-500 text-slate-900 font-bold rounded-full">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                          <p className="text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="faq-item border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors"
                      >
                        <details>
                          <summary className="flex items-center justify-between p-6 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                            <span className="font-semibold text-lg text-slate-900">{faq.question}</span>
                            <span className="faq-icon text-2xl text-amber-500 transition-transform">+</span>
                          </summary>
                          <div className="p-6 pt-0 text-slate-600 leading-relaxed">{faq.answer}</div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <div className="bg-slate-900 text-white rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-white/80 mb-6">
                    Get started with your {service.name.toLowerCase()} application today.
                  </p>
                  <Link href="/apply" className="btn-primary w-full justify-center mb-4">
                    Apply Now <span>&rarr;</span>
                  </Link>
                  <a
                    href="tel:+18005551234"
                    className="btn-secondary w-full justify-center bg-transparent text-white border-white/30 hover:bg-white hover:text-slate-900"
                  >
                    <span>&#128222;</span>
                    (800) 555-1234
                  </a>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Related Services</h3>
                    <div className="space-y-3">
                      {relatedServices.map((related) => (
                        <Link
                          key={related.id}
                          href={`/services/${related.slug}`}
                          className="block p-3 bg-white rounded-lg border border-slate-200 hover:border-amber-500 transition-colors"
                        >
                          <div className="font-semibold text-slate-900">{related.name}</div>
                          <div className="text-sm text-slate-500 truncate">{related.shortDescription}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust Signals */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Why Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500">&#10003;</span>
                      Licensed in CA &amp; FL
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500">&#10003;</span>
                      Same Day Funding
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500">&#10003;</span>
                      Keep Driving Your Car
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500">&#10003;</span>
                      Bad Credit OK
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500">&#10003;</span>
                      No Hidden Fees
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Location CTA */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Find a Location Near You</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get {service.name.toLowerCase()} at any of our California or Florida locations.
          </p>
          <Link href="/locations" className="btn-secondary text-lg px-8 py-4">
            View All Locations <span>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  )
}
