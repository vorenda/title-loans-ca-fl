import Link from 'next/link'
import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { OrganizationSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'About Us - TitleCash | Licensed Title Loan Lender',
  description:
    'Learn about TitleCash, a licensed title loan lender serving California and Florida. Our mission is to provide fast, fair, and transparent title loans.',
}

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema
        name="TitleCash"
        url="https://titlecash.com"
        description="Licensed title loan lender serving California and Florida. Fast approval, same-day funding, transparent terms."
        areaServed={['California', 'Florida']}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">About TitleCash</h1>
            <p className="text-xl text-white/90">
              We&apos;re a licensed title loan lender committed to providing fast, fair, and transparent
              financial solutions to customers across California and Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At TitleCash, we believe everyone deserves access to fast financial solutions when
                emergencies strike. Our mission is to provide title loans that are transparent, fair, and
                designed with our customers&apos; best interests in mind.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We&apos;re not just another lender - we&apos;re a team of financial professionals who
                understand that life can throw unexpected challenges your way. That&apos;s why we&apos;ve
                built a process that gets you the cash you need quickly, without the hassle.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose TitleCash?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">&#10003;</span>
                  <div>
                    <strong className="text-slate-900">Licensed & Regulated</strong>
                    <p className="text-slate-600">Fully licensed in California and Florida</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">&#10003;</span>
                  <div>
                    <strong className="text-slate-900">Transparent Terms</strong>
                    <p className="text-slate-600">No hidden fees or surprise charges</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">&#10003;</span>
                  <div>
                    <strong className="text-slate-900">Same-Day Funding</strong>
                    <p className="text-slate-600">Get your cash when you need it</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 text-xl">&#10003;</span>
                  <div>
                    <strong className="text-slate-900">Keep Your Car</strong>
                    <p className="text-slate-600">Continue driving while you repay</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">15+</div>
              <div className="text-slate-600">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">50K+</div>
              <div className="text-slate-600">Customers Served</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">20+</div>
              <div className="text-slate-600">Locations</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">4.8</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">&#128161;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency</h3>
              <p className="text-slate-600">
                We believe in clear communication. You&apos;ll always know exactly what you&apos;re
                getting - no hidden fees, no surprises.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">&#129309;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Respect</h3>
              <p className="text-slate-600">
                We treat every customer with dignity and respect. Your financial situation doesn&apos;t
                define you.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">&#9889;</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Speed</h3>
              <p className="text-slate-600">
                When you need cash, you need it fast. Our streamlined process gets you funded the same
                day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Section */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Licensing & Compliance</h2>
              <p className="text-slate-600 mb-6 text-center">
                TitleCash is fully licensed and regulated in the states where we operate.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">California</h3>
                  <p className="text-slate-600 text-sm">
                    Licensed by the Department of Financial Protection and Innovation (DFPI). License #XXXXX.
                    We comply with all California lending regulations.
                  </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">Florida</h3>
                  <p className="text-slate-600 text-sm">
                    Licensed by the Office of Financial Regulation (OFR). License #XXXXX. We comply with
                    all Florida lending regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the TitleCash difference. Fast approval, transparent terms, and same-day funding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-primary text-lg px-8 py-4">
              Apply Now
            </Link>
            <Link href="/locations" className="btn-secondary text-lg px-8 py-4">
              Find a Location
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
