import Link from 'next/link'
import { Metadata } from 'next'
import { getAllServices, getAllStates } from '@/lib/data'
import { OrganizationSchema, FAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Get Cash Fast with Auto Title Loans | Licensed & Trusted',
  description:
    'Need cash today? Get approved for a title loan in minutes. Keep driving your car while you borrow. Licensed lenders in California and Florida. Bad credit OK.',
}

const homepageFaqs = [
  {
    question: 'What is a title loan?',
    answer:
      "A title loan is a secured loan where you use your car's title as collateral. You can borrow money based on your car's value while continuing to drive it. The lender holds onto the title until you repay the loan in full.",
  },
  {
    question: 'How much can I borrow?',
    answer:
      "You can typically borrow between $1,000 and $25,000 depending on your car's value, condition, and mileage. The loan amount is usually 25-50% of your vehicle's current market value.",
  },
  {
    question: 'Can I get approved with bad credit?',
    answer:
      'Yes! Title loans are secured by your vehicle, so your credit score is not the primary factor. We approve customers with all credit types, including bad credit, no credit, bankruptcy, or repossession.',
  },
  {
    question: 'What do I need to apply?',
    answer:
      "You'll need: (1) A clear car title in your name, (2) Valid government-issued ID, (3) Proof of income, (4) Proof of residence, (5) Vehicle insurance, and (6) References. The application takes about 5 minutes to complete.",
  },
  {
    question: 'Do I have to give up my car?',
    answer:
      'No! You keep driving your car throughout the entire loan period. We only hold the title as collateral. Once you repay the loan in full, we return your title immediately.',
  },
]

export default async function HomePage() {
  const [services, states] = await Promise.all([getAllServices(), getAllStates()])

  return (
    <>
      <OrganizationSchema
        name="TitleCash"
        url="https://titlecash.com"
        description="Licensed title loan services in California and Florida. Fast approval, same-day funding, bad credit OK."
        areaServed={['California', 'Florida']}
      />
      <FAQSchema faqs={homepageFaqs} />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
                <span>&#10003;</span>
                <span>Licensed Lenders - Fast Approval</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Get Cash <span className="text-amber-500 font-bold">Today</span> with Your Car Title
              </h1>

              <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Borrow up to $25,000 using your car as collateral. Keep driving while you repay.{' '}
                <strong>Bad credit OK.</strong> Get approved in minutes, funded in hours.
              </p>

              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                  Apply Now - Get Cash Today
                  <span>&rarr;</span>
                </Link>
                <a href="tel:+18005551234" className="btn-secondary text-lg px-8 py-4">
                  <span>&#128222;</span>
                  Call (800) 555-1234
                </a>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="trust-badge">
                  <span className="text-3xl">&#128737;&#65039;</span>
                  <span>State Licensed</span>
                </div>
                <div className="trust-badge">
                  <span className="text-3xl">&#9889;</span>
                  <span>Same Day Funding</span>
                </div>
                <div className="trust-badge">
                  <span className="text-3xl">&#128663;</span>
                  <span>Keep Your Car</span>
                </div>
                <div className="trust-badge">
                  <span className="text-3xl">&#10003;</span>
                  <span>Bad Credit OK</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Quick Estimate</h3>
                  <p className="text-slate-600">See how much you could borrow</p>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your car&apos;s estimated value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., $15,000"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your ZIP code</label>
                    <input
                      type="text"
                      placeholder="e.g., 90210"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <button type="submit" className="btn-accent w-full text-lg">
                    Get My Estimate &rarr;
                  </button>
                </form>
                <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
                  &#128274; Your information is secure and confidential
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get cash in 3 simple steps. The process takes less than 30 minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: '&#128221;',
                title: 'Apply Online or Call',
                description: "Fill out our simple application in 5 minutes. We'll need basic info about you and your car.",
                points: ['Valid government ID', 'Proof of income', 'Car title in your name', 'Proof of residence'],
              },
              {
                step: 2,
                icon: '&#10003;',
                title: 'Get Approved Fast',
                description: "Most applicants are approved within 15 minutes. We'll tell you exactly how much you can borrow.",
                points: ['Instant decision', 'Bad credit OK', 'Transparent terms', 'No hidden fees'],
              },
              {
                step: 3,
                icon: '&#128176;',
                title: 'Get Your Cash',
                description: 'Sign your loan agreement and get your money. Direct deposit or cash pickup available same day.',
                points: ['Same day funding', 'Keep driving your car', 'Flexible repayment', 'Early payoff anytime'],
              },
            ].map((item) => (
              <div key={item.step} className="card relative pt-12">
                <div className="absolute -top-5 left-8 w-10 h-10 flex items-center justify-center bg-amber-500 text-slate-900 text-xl font-bold rounded-full shadow-md">
                  {item.step}
                </div>
                <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-500 font-bold">&#10003;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 pt-12 border-t border-slate-200">
            <p className="text-xl font-semibold text-slate-900 mb-4">Ready to get started?</p>
            <Link href="/apply" className="btn-primary text-lg px-8 py-4">
              Apply Now - It&apos;s Fast &amp; Easy
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">Fast, fair, and fully licensed title loan services you can trust.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '&#9889;',
                title: 'Fast Approval',
                description:
                  'Get approved in as little as 15 minutes. Most customers receive funding the same day they apply.',
              },
              {
                icon: '&#128663;',
                title: 'Keep Your Car',
                description:
                  'You keep driving your vehicle while repaying the loan. We only hold the title temporarily as collateral.',
              },
              {
                icon: '&#128181;',
                title: 'Borrow More',
                description:
                  "Get up to $25,000 based on your car's value. Competitive rates with flexible repayment terms.",
              },
              {
                icon: '&#10003;',
                title: 'Bad Credit OK',
                description:
                  'Your car is the collateral, not your credit score. We approve customers with all credit types.',
              },
              {
                icon: '&#128737;&#65039;',
                title: 'Licensed & Regulated',
                description:
                  "We're licensed in all states we serve and follow strict lending regulations for your protection.",
              },
              {
                icon: '&#128222;',
                title: 'Local Support',
                description:
                  'Speak with real people at our local offices. We are here to answer questions and help you succeed.',
              },
            ].map((benefit, i) => (
              <div key={i} className="card">
                <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: benefit.icon }} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Flexible title loan options to meet your needs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="card group">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{service.shortDescription}</p>
                <span className="text-amber-500 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <span>&rarr;</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="btn-secondary">
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real people who got the cash they needed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stars: 5,
                quote:
                  'I needed money for an emergency and they approved me in 20 minutes. The whole process was smooth and professional. Best part - I kept driving my car!',
                name: 'Maria Rodriguez',
                location: 'Miami, FL',
                initial: 'M',
              },
              {
                stars: 5,
                quote:
                  "My credit isn't great but they still approved me. Got $8,000 the same day. The staff was friendly and explained everything clearly. Highly recommend!",
                name: 'James Chen',
                location: 'Los Angeles, CA',
                initial: 'J',
              },
              {
                stars: 5,
                quote:
                  'Fast, easy, and transparent. No hidden fees or surprises. They treated me with respect and got me the money I needed to handle my medical bills.',
                name: 'Sarah Thompson',
                location: 'San Diego, CA',
                initial: 'S',
              },
            ].map((testimonial, i) => (
              <div key={i} className="card flex flex-col gap-4">
                <div className="text-amber-500 text-xl">
                  {'*****'.split('').map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <blockquote className="text-lg italic text-slate-600 leading-relaxed flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 flex items-center justify-center bg-amber-500 text-slate-900 text-xl font-bold rounded-full">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-200 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">50,000+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Loans Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">4.8/5</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">15+ Years</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">In Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Get answers to common questions about title loans.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {homepageFaqs.map((faq, i) => (
              <div key={i} className="faq-item border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors">
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
      </section>

      {/* Locations */}
      <section id="locations" className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Service Areas</h2>
            <p className="section-subtitle">We serve customers throughout California and Florida.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {states.map((state) => (
              <div key={state.slug} className="card">
                <h3 className="text-2xl font-bold text-amber-500 mb-4">{state.name}</h3>
                <ul className="space-y-2 mb-4">
                  {state.cities.slice(0, 4).map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/locations/${state.slug}/${city.slug}`}
                        className="text-slate-600 hover:text-amber-500 transition-colors"
                      >
                        {city.city}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/locations/${state.slug}`}
                  className="text-amber-500 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View all {state.stateCode} locations <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Cash Today?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply now and get approved in minutes. Most customers receive funding the same day.
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
