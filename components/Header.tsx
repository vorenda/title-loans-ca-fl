'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ServiceItem {
  name: string
  slug: string
}

interface StateItem {
  name: string
  slug: string
  cityCount: number
}

interface HeaderProps {
  services: ServiceItem[]
  states: StateItem[]
}

export function Header({ services, states }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Top bar with phone - desktop only */}
        <div className="hidden md:flex justify-end py-2 text-sm border-b border-slate-100">
          <a
            href="tel:+18005551234"
            className="text-slate-600 hover:text-amber-500 transition-colors"
          >
            Call Now: (800) 555-1234
          </a>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">&#128273;</span>
            <span className="text-2xl font-medium text-slate-900">
              Title<strong className="text-amber-500">Cash</strong>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-amber-500 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/services"
                className="text-slate-700 hover:text-amber-500 font-medium transition-colors flex items-center gap-1"
              >
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1 border border-slate-100">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-amber-500 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/locations"
                className="text-slate-700 hover:text-amber-500 font-medium transition-colors flex items-center gap-1"
              >
                Locations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1 border border-slate-100">
                  {states.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/locations/${state.slug}`}
                      className="flex justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-amber-500 transition-colors"
                    >
                      <span>{state.name}</span>
                      <span className="text-slate-400 text-sm">{state.cityCount} cities</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-slate-700 hover:text-amber-500 font-medium transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-slate-700 hover:text-amber-500 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-900 hover:text-white font-semibold transition-all hover:-translate-y-0.5"
            >
              <span>&#128222;</span>
              <span className="font-mono">(800) 555-1234</span>
            </a>
            <Link
              href="/apply"
              className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-400 transition-all hover:-translate-y-0.5 shadow-md"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span
                className={`w-6 h-0.5 bg-slate-900 transition-all ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-slate-900 transition-all ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-slate-900 transition-all ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/locations"
                className="text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </Link>
              <Link
                href="/about"
                className="text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-700 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:+18005551234"
                className="bg-amber-500 text-slate-900 text-center py-3 rounded-lg font-bold mt-2"
              >
                &#128222; Call (800) 555-1234
              </a>
              <Link
                href="/apply"
                className="bg-slate-900 text-white text-center py-3 rounded-lg font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
