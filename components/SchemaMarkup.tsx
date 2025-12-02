interface FinancialServiceSchemaProps {
  businessName: string
  city: string
  state: string
  stateCode: string
  address: string
  phone: string
  latitude?: number
  longitude?: number
  url: string
}

export function FinancialServiceSchema({
  businessName,
  city,
  state,
  stateCode,
  address,
  phone,
  latitude,
  longitude,
  url,
}: FinancialServiceSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titlecash.com'

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: businessName,
    '@id': `${baseUrl}${url}`,
    url: `${baseUrl}${url}`,
    telephone: phone,
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: city,
      addressRegion: stateCode,
      addressCountry: 'US',
    },
    ...(latitude && longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude,
            longitude,
          },
        }
      : {}),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'TitleCash',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedIn: {
        '@type': 'State',
        name: state,
      },
    },
    serviceType: 'Title Loans',
    description: `Fast title loans in ${city}, ${stateCode}. Get cash using your car title as collateral. Licensed lender, same-day funding.`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

interface ServiceSchemaProps {
  serviceName: string
  description: string
  url: string
}

export function ServiceSchema({ serviceName, description, url }: ServiceSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titlecash.com'

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'TitleCash',
      url: baseUrl,
    },
    url: `${baseUrl}${url}`,
    areaServed: [
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Florida' },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

interface OrganizationSchemaProps {
  name: string
  url: string
  description: string
  areaServed: string[]
}

export function OrganizationSchema({
  name,
  url,
  description,
  areaServed,
}: OrganizationSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-1234',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
    },
    areaServed: areaServed.map((state) => ({
      '@type': 'State',
      name: state,
    })),
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
