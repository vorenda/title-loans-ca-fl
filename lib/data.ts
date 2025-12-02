// Data fetching utilities for CMS
const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api` : 'http://localhost:3000/api'

// Types
export interface Service {
  id: number
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  benefits: Array<{ id: string; title: string; description: string }>
  howItWorks: Array<{ id: string; step: number; title: string; description: string }>
  faqs: Array<{ id: string; question: string; answer: string }>
  order: number
}

export interface Location {
  id: number
  city: string
  state: string
  stateCode: string
  county: string
  slug: string
  areaCode: string
  population: number
  latitude: number
  longitude: number
  localFacts: {
    landmarks: Array<{ id: string; name: string }>
    highways: Array<{ id: string; name: string }>
    exits: Array<{ id: string; name: string }>
    neighboringCities: Array<{ id: string; name: string }>
  }
}

export interface StatePage {
  id: number
  state: string
  stateCode: string
  slug: string
  metaTitle: string | null
  metaDescription: string | null
  legalStatus: string
  regulations: {
    maxAPR: string
    maxLoanAmount: string
    maxLoanTerm: string
    maxLTV: string | null
    licensingRequired: boolean
    regulatoryBody: string | null
  }
  fees: {
    originationFee: string | null
    latePaymentFee: string | null
    prepaymentPenalty: string | null
  }
  consumerProtections: Array<{ id: string; protection: string; description: string }>
  disclaimer: string | null
  cityPageContent: {
    intro: string
    headline: string
    warnings: string[]
    keyPoints: string[]
    disclaimer: string
  }
  sources: Array<{ id: string; title: string; url: string }>
}

export interface CityPage {
  id: number
  title: string
  slug: string
  location: Location
  statePage: StatePage
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  heroSubheadline: string
  branchPhotoUrl: string | null
  localProofContent: string | null
  servicesContent: string | null
  complianceContent: string | null
  napContent: {
    businessName: string
    address: string
    phone: string
    hours: string
  }
  faqs: Array<{ id: string; question: string; answer: string }>
  nearbyLocations: Location[]
  schemaType: string
  status: string
}

// Helper to safely fetch with error handling
async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`Fetch failed for ${url}: ${res.status}`)
      return fallback
    }
    const data = await res.json()
    return data.docs ?? fallback
  } catch (error) {
    console.warn(`Fetch error for ${url}:`, error)
    return fallback
  }
}

// Fetch all services
export async function getAllServices(): Promise<Service[]> {
  return safeFetch<Service[]>(`${CMS_URL}/services?limit=100&sort=order`, [])
}

// Fetch single service by slug
export async function getService(slug: string): Promise<Service | null> {
  const docs = await safeFetch<Service[]>(
    `${CMS_URL}/services?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    []
  )
  return docs[0] || null
}

// Fetch all locations
export async function getAllLocations(): Promise<Location[]> {
  return safeFetch<Location[]>(`${CMS_URL}/locations?limit=100&sort=city`, [])
}

// Fetch all states (unique states from locations)
export async function getAllStates(): Promise<Array<{ name: string; slug: string; stateCode: string; cities: Location[] }>> {
  const locations = await getAllLocations()

  const stateMap = new Map<string, { name: string; slug: string; stateCode: string; cities: Location[] }>()

  for (const loc of locations) {
    const key = loc.stateCode.toLowerCase()
    if (!stateMap.has(key)) {
      stateMap.set(key, {
        name: loc.state,
        slug: key === 'ca' ? 'california' : key === 'fl' ? 'florida' : key,
        stateCode: loc.stateCode,
        cities: [],
      })
    }
    stateMap.get(key)!.cities.push(loc)
  }

  return Array.from(stateMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

// Fetch state page by slug
export async function getStatePage(slug: string): Promise<StatePage | null> {
  const docs = await safeFetch<StatePage[]>(
    `${CMS_URL}/state-pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    []
  )
  return docs[0] || null
}

// Fetch all state pages
export async function getAllStatePages(): Promise<StatePage[]> {
  return safeFetch<StatePage[]>(`${CMS_URL}/state-pages?limit=100`, [])
}

// Fetch city page by slug
export async function getCityPage(slug: string): Promise<CityPage | null> {
  const docs = await safeFetch<CityPage[]>(
    `${CMS_URL}/city-pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    []
  )
  return docs[0] || null
}

// Fetch all city pages
export async function getAllCityPages(): Promise<CityPage[]> {
  return safeFetch<CityPage[]>(`${CMS_URL}/city-pages?limit=100&depth=2`, [])
}

// Fetch city pages by state
export async function getCityPagesByState(stateSlug: string): Promise<CityPage[]> {
  // Map state slug to state code
  const stateCode = stateSlug === 'california' ? 'CA' : stateSlug === 'florida' ? 'FL' : stateSlug.toUpperCase()

  const docs = await safeFetch<CityPage[]>(
    `${CMS_URL}/city-pages?limit=100&depth=2`,
    []
  )

  // Filter by state
  return docs.filter((page: CityPage) =>
    page.location?.stateCode === stateCode
  )
}

// Get locations by state code
export async function getLocationsByState(stateCode: string): Promise<Location[]> {
  return safeFetch<Location[]>(
    `${CMS_URL}/locations?where[stateCode][equals]=${encodeURIComponent(stateCode)}&limit=100`,
    []
  )
}
