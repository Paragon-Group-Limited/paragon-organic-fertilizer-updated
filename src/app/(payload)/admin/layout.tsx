import type { ServerFunctionClient } from 'payload'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap'
import '@payloadcms/next/css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@payloadcms/next/css'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
