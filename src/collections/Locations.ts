import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'state', 'stateCode', 'areaCode'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      maxLength: 2,
    },
    {
      name: 'county',
      type: 'text',
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
      name: 'areaCode',
      type: 'text',
      required: true,
      maxLength: 3,
      admin: {
        description: 'Local area code (e.g., 213, 305) - NOT 1-800!',
      },
    },
    {
      name: 'population',
      type: 'number',
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
    {
      name: 'localFacts',
      type: 'group',
      label: 'Local Facts (Anti-Doorway)',
      admin: {
        description: 'These prove LOCAL knowledge - prevents doorway page penalty',
      },
      fields: [
        {
          name: 'landmarks',
          type: 'array',
          admin: {
            description: 'Local landmarks (e.g., Hollywood Sign, Space Needle)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'highways',
          type: 'array',
          admin: {
            description: 'Major highways (e.g., I-405, US-101)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'exits',
          type: 'array',
          admin: {
            description: 'Highway exits (e.g., Exit 42A)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'neighboringCities',
          type: 'array',
          admin: {
            description: 'Nearby cities for "Also serving" section',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
