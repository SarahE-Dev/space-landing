import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'Sarah Eatherly - Software Engineer & Creative Problem Solver',
  description: 'Passionate full-stack developer crafting innovative digital experiences with React, Next.js, TypeScript, and modern web technologies. Ready to deploy extraordinary solutions.',
  keywords: ['Sarah Eatherly', 'Software Engineer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
  authors: [{ name: 'Sarah Eatherly' }],
  creator: 'Sarah Eatherly',
  publisher: 'Sarah Eatherly',
  metadataBase: new URL('https://saraheatherly.dev'),
  icons: {
    icon: [
      { url: '/favicon.png?v=2', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png?v=2' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saraheatherly.dev',
    title: 'Sarah Eatherly - Software Engineer & Creative Problem Solver',
    description: 'Passionate full-stack developer crafting innovative digital experiences with React, Next.js, TypeScript, and modern web technologies.',
    siteName: 'Sarah Eatherly Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarah Eatherly - Software Engineer & Creative Problem Solver',
    description: 'Passionate full-stack developer crafting innovative digital experiences with React, Next.js, TypeScript, and modern web technologies.',
    creator: '@SarahEDev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
