// src/app/[locale]/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, Locale } from '@/i18n/routing'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });

  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en_US' : 'es_ES';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: t('title.default'),
      template: t('title.template'),
    },

    description: t('description'),
    keywords: t('keywords').split(', '),

    authors: [{ 
      name: t('author.name'),
      url: t('author.url')
    }],
    creator: t('creator'),
    publisher: t('publisher'),

    openGraph: {
      type: t('openGraph.type') as 'website',
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      url: `${siteUrl}/${locale}`,
      siteName: t('openGraph.siteName'),
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t('openGraph.imageAlt'),
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: ["/og-image.png"],
    },

    robots: {
      index: t('robots.index') === 'true',
      follow: t('robots.follow') === 'true',
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png' },
      ],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },

    manifest: '/site.webmanifest',

    category: t('category'),
    classification: t('classification'),

    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        "es-ES": `${siteUrl}/es`,
        "en-US": `${siteUrl}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
          <>
            <Analytics />
            <SpeedInsights />
          </>
      </body>
    </html>
  )
}