import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from '@/components/theme-toggle'
import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ParticleBackground } from '@/components/particle-background'

export const metadata: Metadata = {
  title: {
    default: 'NavSphere',
    template: '%s - NavSphere'
  },
  description: 'A modern navigation platform',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QG9PGG4K13"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QG9PGG4K13');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            backgroundImage: `url('https://pub-80c5aa3f3a7a4ea28903ff25058fced2.r2.dev/115795269_p0_master1200.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -10,
          }}
        />
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-black/50"
          style={{ zIndex: -9 }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ParticleBackground />
          <Providers>
            {children}
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
