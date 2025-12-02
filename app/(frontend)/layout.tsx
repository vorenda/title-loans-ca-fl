import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getAllServices, getAllStates } from '@/lib/data'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TitleCash - Fast Title Loans | Get Cash Today',
    template: '%s | TitleCash',
  },
  description: 'Get fast cash with a title loan. Keep driving your car while you repay. Licensed lender serving California and Florida. Bad credit OK. Same day funding.',
  keywords: ['title loans', 'auto title loans', 'car title loans', 'fast cash', 'bad credit loans'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TitleCash',
  },
}

async function getNavigationData() {
  try {
    const [services, states] = await Promise.all([
      getAllServices(),
      getAllStates(),
    ])

    return {
      services: services.map((s) => ({
        name: s.name,
        slug: s.slug,
      })),
      states: states.map((s) => ({
        name: s.name,
        slug: s.slug,
        cityCount: s.cities.length,
      })),
    }
  } catch (error) {
    console.error('Failed to load navigation data:', error)
    return {
      services: [],
      states: [],
    }
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navData = await getNavigationData()

  return (
    <html lang="en">
      <body>
        <Header services={navData.services} states={navData.states} />
        <main>{children}</main>
        <Footer services={navData.services} states={navData.states} />
      </body>
    </html>
  )
}
