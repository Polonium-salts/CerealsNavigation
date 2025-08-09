"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  suppressHydrationWarning?: boolean
}

export function ThemeProvider({ children, suppressHydrationWarning, ...props }: ExtendedThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}