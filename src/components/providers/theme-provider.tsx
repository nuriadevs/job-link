"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Función ThemeProvider para envolver la aplicación con soporte de temas. 
 * Para ello, utiliza el proveedor de temas de 'next-themes' de shadcn.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}