import type { CollectionConfig } from 'payload'

export const StatePages: CollectionConfig = {
  slug: 'state-pages',
  admin: {
    useAsTitle: 'state',
    defaultColumns: ['state', 'stateCode', 'legalStatus'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      unique: true,
      maxLength: 2,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
      admin: {
        description: 'SEO title (max 70 characters)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO description (max 160 characters)',
      },
    },
    {
      name: 'legalStatus',
      type: 'text',
      admin: {
        description: 'Is title lending legal in this state?',
      },
    },
    {
      name: 'regulations',
      type: 'group',
      label: 'State Regulations',
      fields: [
        {
          name: 'maxAPR',
          type: 'text',
          admin: {
            description: 'Maximum APR allowed (e.g., "No cap" or "36%")',
          },
        },
        {
          name: 'maxLoanAmount',
          type: 'text',
          admin: {
            description: 'Maximum loan amount allowed',
          },
        },
        {
          name: 'maxLoanTerm',
          type: 'text',
          admin: {
            description: 'Maximum loan term allowed',
          },
        },
        {
          name: 'maxLTV',
          type: 'text',
          admin: {
            description: 'Maximum loan-to-value ratio',
          },
        },
        {
          name: 'licensingRequired',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Is licensing required for lenders?',
          },
        },
        {
          name: 'regulatoryBody',
          type: 'text',
          admin: {
            description: 'State regulatory agency (e.g., DFPI, OFR)',
          },
        },
      ],
    },
    {
      name: 'fees',
      type: 'group',
      label: 'Fee Regulations',
      fields: [
        {
          name: 'originationFee',
          type: 'text',
          admin: {
            description: 'Origination fee limits',
          },
        },
        {
          name: 'latePaymentFee',
          type: 'text',
          admin: {
            description: 'Late payment fee limits',
          },
        },
        {
          name: 'prepaymentPenalty',
          type: 'text',
          admin: {
            description: 'Prepayment penalty rules',
          },
        },
      ],
    },
    {
      name: 'consumerProtections',
      type: 'array',
      label: 'Consumer Protections',
      admin: {
        description: 'State-mandated consumer protections',
      },
      fields: [
        {
          name: 'protection',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      admin: {
        description: 'Required legal disclaimer for this state (YMYL compliance)',
      },
    },
    {
      name: 'cityPageContent',
      type: 'group',
      label: 'City Page Content Template',
      admin: {
        description: 'Pre-written content to include in city pages for this state',
      },
      fields: [
        {
          name: 'headline',
          type: 'text',
          admin: {
            description: 'Section headline (e.g., "Understanding Title Loan Laws in Florida")',
          },
        },
        {
          name: 'intro',
          type: 'textarea',
          admin: {
            description: 'Introduction paragraph (use {{city}} as placeholder)',
          },
        },
        {
          name: 'keyPoints',
          type: 'array',
          label: 'Key Points',
          fields: [
            {
              name: 'point',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'warnings',
          type: 'array',
          label: 'Warning Messages',
          fields: [
            {
              name: 'warning',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          admin: {
            description: 'State-specific disclaimer for city pages',
          },
        },
      ],
    },
    {
      name: 'sources',
      type: 'array',
      label: 'Research Sources (E-E-A-T)',
      admin: {
        description: 'Cite regulatory sources for credibility',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
