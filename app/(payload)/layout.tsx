/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  const payloadModule = await import('payload') as any
  if (payloadModule.getPayload) {
    const payload = await payloadModule.getPayload({ config })
    return payload.local(args)
  }
  // Fallback for older payload versions
  return payloadModule.default.local(args, config)
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
