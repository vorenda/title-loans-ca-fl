import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from name if not provided
        if (operation === 'create' && data?.name && !data?.slug) {
          data.slug = data.name
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
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name (e.g., "Title Loans", "Auto Title Loans")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g., "title-loans")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief description for listings (max 200 characters)',
      },
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      admin: {
        description: 'Full service description for pillar page',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or class (e.g., "car", "money")',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      admin: {
        description: 'Key benefits of this service',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'array',
      label: 'How It Works',
      admin: {
        description: 'Step-by-step process',
      },
      fields: [
        {
          name: 'step',
          type: 'number',
          required: true,
          admin: {
            description: 'Step number',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: {
        description: 'Service-specific frequently asked questions',
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
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
    },
  ],
}
