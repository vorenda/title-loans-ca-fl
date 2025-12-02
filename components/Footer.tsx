import Link from 'next/link'

interface ServiceItem {
  name: string
  slug: string
}

interface StateItem {
  name: string
  slug: string
}

interface FooterProps {
  services: ServiceItem[]
  states: StateItem[]
}

export function Footer({ services, states }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">&#128273;</span>
              <span className="text-xl font-medium">
                Title<strong className="text-amber-500">Cash</strong>
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Licensed title loan services you can trust. Fast approval, fair rates, and local support.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+18005551234"
                className="block text-amber-400 hover:text-amber-300 transition-colors"
              >
                &#128222; (800) 555-1234
              </a>
              <a
                href="mailto:info@titlecash.com"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                &#9993;&#65039; info@titlecash.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              {services.length > 6 && (
                <li>
                  <Link
                    href="/services"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View All Services &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Locations</h4>
            <ul className="space-y-2">
              {states.map((state) => (
                <li key={state.slug}>
                  <Link
                    href={`/locations/${state.slug}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  View All Locations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h4 className="text-amber-500 font-semibold mb-4">Important Loan Disclosures</h4>
            <div className="space-y-3 text-sm text-slate-400 font-mono leading-relaxed">
              <p>
                <strong className="text-slate-300">APR Disclosure:</strong> Annual Percentage Rates
                (APR) for title loans vary by state and lender. Typical APRs range from 36% to 300%
                or higher. Loan terms typically range from 12 to 36 months.
              </p>
              <p>
                <strong className="text-slate-300">State Regulations:</strong> Title loan laws vary
                by state. Not all loan products are available in all states. We are licensed and
                regulated by state lending authorities in California (DFPI) and Florida (OFR).
              </p>
              <p>
                <strong className="text-slate-300">Risk Warning:</strong> Failure to repay your loan
                may result in loss of your vehicle through repossession. Consider all options before
                taking out a title loan. Only borrow what you can afford to repay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/disclaimers"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Disclaimers
              </Link>
              <Link
                href="/licenses"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                State Licenses
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {currentYear} TitleCash. All rights reserved. Licensed lender in CA and FL.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
