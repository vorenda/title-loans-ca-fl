import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Import collections
import { Users } from './src/collections/Users'
import { Locations } from './src/collections/Locations'
import { StatePages } from './src/collections/StatePages'
import { CityPages } from './src/collections/CityPages'
import { Services } from './src/collections/Services'
import { Leads } from './src/collections/Leads'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Title Loans CMS',
    },
  },
  collections: [
    Users,
    Locations,
    StatePages,
    CityPages,
    Services,
    Leads,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
