'use client'

import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          provider: () => new Map(),
          revalidateOnFocus: false,
          revalidateOnReconnect: false
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  )
}
