import { getPayload as getPayloadHMR } from 'payload'
import config from '../../payload.config'

/**
 * Get Payload instance for server-side operations
 */
export async function getPayload() {
  return getPayloadHMR({ config })
}

/**
 * Get all published city pages
 */
export async function getCityPages() {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'city-pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 1000,
    depth: 2, // Include related location and state data
  })

  return pages.docs
}

/**
 * Get single city page by slug
 */
export async function getCityPageBySlug(slug: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'city-pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
  })

  return pages.docs[0] || null
}

/**
 * Get all locations
 */
export async function getLocations() {
  const payload = await getPayload()

  const locations = await payload.find({
    collection: 'locations',
    limit: 500,
  })

  return locations.docs
}

/**
 * Get locations by state
 */
export async function getLocationsByState(stateCode: string) {
  const payload = await getPayload()

  const locations = await payload.find({
    collection: 'locations',
    where: {
      stateCode: { equals: stateCode },
    },
    limit: 100,
  })

  return locations.docs
}

/**
 * Get all state pages
 */
export async function getStatePages() {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'state-pages',
    limit: 100,
  })

  return pages.docs
}

/**
 * Get state page by state code
 */
export async function getStatePageByCode(stateCode: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'state-pages',
    where: {
      stateCode: { equals: stateCode },
    },
  })

  return pages.docs[0] || null
}

/**
 * Get all services
 */
export async function getServices() {
  const payload = await getPayload()

  const services = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })

  return services.docs
}

/**
 * Submit a lead
 */
export async function submitLead(data: {
  name: string
  phone: string
  email?: string
  city?: string
  state?: string
  vehicleYear?: string
  vehicleMake?: string
  vehicleModel?: string
  loanAmount?: string
  source?: string
  sourcePage?: string
}) {
  const payload = await getPayload()

  return payload.create({
    collection: 'leads',
    data: {
      ...data,
      status: 'new',
    },
  })
}
