import { MetadataRoute } from 'next'
import { getAllServices, getAllStates, getCityPagesByState } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titlecash.com'
  const services = await getAllServices()
  const states = await getAllStates()

  // Homepage (highest priority)
  const home: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Service Pillar Pages (high priority)
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // State Hub Pages (high priority - power brokers)
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/locations/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // City Pages (conversion pages)
  const cityPagesPromises = states.map(async (state) => {
    const cities = await getCityPagesByState(state.slug)
    return cities.map((city) => ({
      url: `${baseUrl}/locations/${state.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  })

  const cityPagesArrays = await Promise.all(cityPagesPromises)
  const cityPages: MetadataRoute.Sitemap = cityPagesArrays.flat()

  return [...home, ...staticPages, ...servicePages, ...statePages, ...cityPages]
}
