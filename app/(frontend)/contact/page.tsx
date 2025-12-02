import Link from 'next/link'
import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Us - TitleCash | Get in Touch',
  description:
    'Contact TitleCash for questions about title loans. Call us, email us, or visit one of our California or Florida locations.',
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90">
              Have questions about title loans? We&apos;re here to help. Reach out by phone, email, or
              visit one of our locations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phone */}
            <div className="card text-center">
              <div className="text-4xl mb-4">&#128222;</div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Call Us</h2>
              <p className="text-slate-600 mb-4">Speak with a loan specialist now.</p>
              <a
                href="tel:+18005551234"
                className="text-2xl font-bold text-amber-500 hover:text-amber-600 transition-colors"
              >
                (800) 555-1234
              </a>
              <p className="text-sm text-slate-500 mt-2">Mon-Fri 9AM-6PM | Sat 10AM-2PM</p>
            </div>

            {/* Email */}
            <div className="card text-center">
              <div className="text-4xl mb-4">&#9993;</div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Email Us</h2>
              <p className="text-slate-600 mb-4">We&apos;ll respond within 24 hours.</p>
              <a
                href="mailto:support@titlecash.com"
                className="text-lg font-semibold text-amber-500 hover:text-amber-600 transition-colors"
              >
                support@titlecash.com
              </a>
              <p className="text-sm text-slate-500 mt-2">For general inquiries</p>
            </div>

            {/* Locations */}
            <div className="card text-center">
              <div className="text-4xl mb-4">&#128205;</div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Visit Us</h2>
              <p className="text-slate-600 mb-4">Find a location near you.</p>
              <Link
                href="/locations"
                className="text-lg font-semibold text-amber-500 hover:text-amber-600 transition-colors"
              >
                View All Locations &rarr;
              </Link>
              <p className="text-sm text-slate-500 mt-2">20+ locations in CA & FL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="section-header">
              <h2 className="section-title">Send Us a Message</h2>
              <p className="section-subtitle">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form className="bg-white rounded-xl border border-slate-200 p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                >
                  <option value="">Select a subject...</option>
                  <option value="general">General Inquiry</option>
                  <option value="loan-question">Question About My Loan</option>
                  <option value="application">Application Status</option>
                  <option value="payment">Payment Question</option>
                  <option value="complaint">File a Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'How quickly will I hear back?',
                answer:
                  'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly at (800) 555-1234.',
              },
              {
                question: 'Can I apply for a loan over the phone?',
                answer:
                  "Yes! Our loan specialists can help you start your application over the phone. Just call (800) 555-1234 and we'll guide you through the process.",
              },
              {
                question: 'What information do I need to provide?',
                answer:
                  "To apply for a title loan, you'll need your vehicle title, valid ID, proof of income, and proof of residence. Our team can help you understand exactly what's needed.",
              },
            ].map((faq, i) => (
              <div
                key={i}
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
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Skip the wait - start your application online and get approved in minutes.
          </p>
          <Link href="/apply" className="btn-primary text-lg px-8 py-4">
            Apply Now <span>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  )
}
