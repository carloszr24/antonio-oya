import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'Inmobiliaria Antonio Oya | Mancha Real, Jaén',
  description: 'Inmobiliaria Antonio Oya en Mancha Real (Jaén). Compra, venta, tasaciones y asesoramiento personalizado.',
  keywords: 'inmobiliaria, mancha real, jaén, pisos, casas, locales, alquiler, venta, tasaciones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={sans.variable}>
      <body className="bg-white text-stone-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
