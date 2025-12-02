import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'city', 'state', 'status', 'createdAt'],
    group: 'CRM',
  },
  access: {
    // Only authenticated users can read leads
    read: ({ req: { user } }) => Boolean(user),
    // Anyone can create a lead (public form submission)
    create: () => true,
    // Only admin/editor can update
    update: ({ req: { user } }) => {
      if (!user) return false
      return ['admin', 'editor'].includes(user.role as string)
    },
    // Only admin can delete
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin'
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Send notification on new lead
        if (operation === 'create') {
          console.log('New lead received:', doc.name, doc.phone)

          // Webhook to external CRM (if configured)
          if (process.env.WEBHOOK_NEW_LEAD) {
            try {
              await fetch(process.env.WEBHOOK_NEW_LEAD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doc),
              })
            } catch (error) {
              console.error('Webhook failed:', error)
            }
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'vehicleYear',
      type: 'text',
      admin: {
        description: 'Vehicle year (e.g., "2020")',
      },
    },
    {
      name: 'vehicleMake',
      type: 'text',
      admin: {
        description: 'Vehicle make (e.g., "Toyota")',
      },
    },
    {
      name: 'vehicleModel',
      type: 'text',
      admin: {
        description: 'Vehicle model (e.g., "Camry")',
      },
    },
    {
      name: 'loanAmount',
      type: 'text',
      admin: {
        description: 'Requested loan amount',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Lead source (e.g., "Google", "Direct")',
      },
    },
    {
      name: 'sourcePage',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'URL of the page where lead was captured',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this lead',
      },
    },
  ],
}
