import Link from 'next/link'
import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Apply for a Title Loan - TitleCash | Fast Approval',
  description:
    'Apply for a title loan online with TitleCash. Fast approval, same-day funding. Licensed lender serving California and Florida.',
}

export default function ApplyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Apply', href: '/apply' },
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
              <span>&#9889;</span>
              <span>Get Approved in Minutes</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Apply for a Title Loan</h1>

            <p className="text-xl text-white/90 mb-8">
              Complete the form below to start your application. Most applications are approved within 30
              minutes with same-day funding available.
            </p>

            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span>
                <span>No credit check required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span>
                <span>Keep driving your car</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span>
                <span>Same-day funding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form className="space-y-8">
                {/* Personal Information */}
                <div className="bg-slate-50 rounded-xl p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div>
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
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-semibold text-slate-900 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-slate-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="state" className="block text-sm font-semibold text-slate-900 mb-2">
                          State *
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        >
                          <option value="">Select</option>
                          <option value="CA">California</option>
                          <option value="FL">Florida</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-semibold text-slate-900 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                          placeholder="90001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="bg-slate-50 rounded-xl p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Vehicle Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vehicleYear" className="block text-sm font-semibold text-slate-900 mb-2">
                        Vehicle Year *
                      </label>
                      <select
                        id="vehicleYear"
                        name="vehicleYear"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                      >
                        <option value="">Select year</option>
                        {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicleMake" className="block text-sm font-semibold text-slate-900 mb-2">
                        Vehicle Make *
                      </label>
                      <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleModel" className="block text-sm font-semibold text-slate-900 mb-2">
                        Vehicle Model *
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="Camry"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleMileage" className="block text-sm font-semibold text-slate-900 mb-2">
                        Estimated Mileage *
                      </label>
                      <input
                        type="text"
                        id="vehicleMileage"
                        name="vehicleMileage"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="50,000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Do you have a clear title? *
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="clearTitle"
                            value="yes"
                            required
                            className="w-5 h-5 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="clearTitle"
                            value="no"
                            className="w-5 h-5 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-slate-700">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="bg-slate-50 rounded-xl p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    Loan Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="loanAmount"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        Desired Loan Amount *
                      </label>
                      <select
                        id="loanAmount"
                        name="loanAmount"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                      >
                        <option value="">Select amount</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000+">$10,000+</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="loanPurpose"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        Loan Purpose
                      </label>
                      <select
                        id="loanPurpose"
                        name="loanPurpose"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                      >
                        <option value="">Select purpose (optional)</option>
                        <option value="emergency">Emergency Expense</option>
                        <option value="medical">Medical Bills</option>
                        <option value="home">Home Repair</option>
                        <option value="car">Car Repair</option>
                        <option value="debt">Debt Consolidation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="monthlyIncome"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        Monthly Income *
                      </label>
                      <input
                        type="text"
                        id="monthlyIncome"
                        name="monthlyIncome"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                        placeholder="$3,000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="incomeSource"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        Income Source *
                      </label>
                      <select
                        id="incomeSource"
                        name="incomeSource"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
                      >
                        <option value="">Select source</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="retired">Retired</option>
                        <option value="disability">Disability</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-slate-50 rounded-xl p-6 lg:p-8">
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="w-5 h-5 mt-0.5 text-amber-500 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-slate-600">
                        I consent to TitleCash contacting me via phone, email, or text message regarding
                        my application. I understand that message and data rates may apply. *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="terms"
                        required
                        className="w-5 h-5 mt-0.5 text-amber-500 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-slate-600">
                        I have read and agree to the{' '}
                        <Link href="/terms" className="text-amber-500 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-amber-500 hover:underline">
                          Privacy Policy
                        </Link>
                        . *
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                  Submit Application <span>&rarr;</span>
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Requirements Card */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">What You&apos;ll Need</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-1">&#10003;</span>
                      <span>Clear vehicle title in your name</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-1">&#10003;</span>
                      <span>Valid government-issued ID</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-1">&#10003;</span>
                      <span>Proof of income (pay stub, bank statement)</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-1">&#10003;</span>
                      <span>Proof of residence (utility bill)</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-500 mt-1">&#10003;</span>
                      <span>Vehicle for inspection</span>
                    </li>
                  </ul>
                </div>

                {/* Trust Signals */}
                <div className="bg-slate-900 text-white rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Why TitleCash?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-white/90">
                      <span className="text-amber-400">&#10003;</span>
                      Licensed in CA & FL
                    </li>
                    <li className="flex items-center gap-2 text-white/90">
                      <span className="text-amber-400">&#10003;</span>
                      Same-Day Funding
                    </li>
                    <li className="flex items-center gap-2 text-white/90">
                      <span className="text-amber-400">&#10003;</span>
                      Keep Driving Your Car
                    </li>
                    <li className="flex items-center gap-2 text-white/90">
                      <span className="text-amber-400">&#10003;</span>
                      Bad Credit OK
                    </li>
                    <li className="flex items-center gap-2 text-white/90">
                      <span className="text-amber-400">&#10003;</span>
                      No Hidden Fees
                    </li>
                  </ul>
                </div>

                {/* Contact Card */}
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Need Help?</h3>
                  <p className="text-slate-600 mb-4">
                    Our loan specialists are available to assist you with your application.
                  </p>
                  <a
                    href="tel:+18005551234"
                    className="btn-primary w-full justify-center"
                  >
                    <span>&#128222;</span>
                    Call (800) 555-1234
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-6">
          <p className="text-sm text-slate-500 text-center max-w-4xl mx-auto">
            By submitting this application, you authorize TitleCash to obtain your credit report and
            verify the information provided. Approval and loan terms are subject to verification of
            information and vehicle inspection. Title loans may not be available in all areas. Rates and
            terms vary by state. California loans made pursuant to Department of Financial Protection and
            Innovation license. Florida loans made pursuant to Office of Financial Regulation license.
          </p>
        </div>
      </section>
    </>
  )
}
