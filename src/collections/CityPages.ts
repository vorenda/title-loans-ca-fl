import type { CollectionConfig } from 'payload'

export const CityPages: CollectionConfig = {
  slug: 'city-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Content',
    listSearchableFields: ['title', 'slug'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from title if not provided
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title (e.g., "Title Loans in Los Angeles, CA")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g., "los-angeles-ca")',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      admin: {
        description: 'Link to location data (local facts, area code, etc.)',
      },
    },
    {
      name: 'statePage',
      type: 'relationship',
      relationTo: 'state-pages',
      admin: {
        description: 'Link to state compliance data',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
      admin: {
        description: 'SEO title with local keywords (max 70 characters)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO description with local keywords (max 160 characters)',
      },
    },
    {
      name: 'heroHeadline',
      type: 'text',
      admin: {
        description: 'Main headline for hero section',
      },
    },
    {
      name: 'heroSubheadline',
      type: 'text',
      admin: {
        description: 'Subheadline for hero section',
      },
    },
    {
      name: 'branchPhotoUrl',
      type: 'text',
      admin: {
        description: 'URL to real branch/storefront photo (NOT stock images!)',
      },
    },
    {
      name: 'localProofContent',
      type: 'textarea',
      admin: {
        description: 'Anti-Doorway content using local facts (landmarks, highways, exits)',
      },
    },
    {
      name: 'servicesContent',
      type: 'textarea',
      admin: {
        description: 'Services offered with internal links UP to pillar pages',
      },
    },
    {
      name: 'complianceContent',
      type: 'textarea',
      admin: {
        description: 'State compliance info (rate caps, consumer protections, disclaimers)',
      },
    },
    {
      name: 'napContent',
      type: 'group',
      label: 'NAP (Name, Address, Phone)',
      admin: {
        description: 'Business contact info - MUST use LOCAL area code!',
      },
      fields: [
        {
          name: 'businessName',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone with LOCAL area code (NOT 1-800!)',
          },
        },
        {
          name: 'hours',
          type: 'text',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: {
        description: 'Frequently asked questions with local keywords',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'nearbyLocations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        description: 'Nearby cities for "Also Serving" section',
      },
    },
    {
      name: 'schemaType',
      type: 'select',
      defaultValue: 'FinancialService',
      options: [
        { label: 'FinancialService', value: 'FinancialService' },
        { label: 'LocalBusiness', value: 'LocalBusiness' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Schema.org type for structured data',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
