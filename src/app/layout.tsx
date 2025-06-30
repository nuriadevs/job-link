import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Empleo Link - Oportunidades Tech en un Solo Lugar",
  description:
    "Descubre las mejores oportunidades laborales tech en un solo lugar. Encuentra trabajo en desarrollo, diseño, marketing digital y más.",
  keywords: [
    "empleo tech",
    "trabajo tecnología",
    "ofertas desarrollo",
    "empleo programador",
    "trabajo remoto tech",
    "oportunidades laborales",
    "empleo junior",
    "trabajo senior developer",
  ],
  authors: [{ name: "Nuria Vázquez" }],
  creator: "Nuria Vázquez",

  /**
   * Open Graph metadata para mejorar la visibilidad en redes sociales (proximamente)
   */
   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex flex-col min-h-screen w-full max-w-screen-3xl mx-auto overflow-x-hidden">
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
