'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { brand } from '@/lib/brand'

const links = [
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname.startsWith('/admin')) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={160}
              height={44}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm tracking-wide transition-colors duration-200',
                  pathname === link.href
                    ? 'text-stone-900 font-medium'
                    : 'text-stone-500 hover:text-stone-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contacto" className="btn-primary text-xs px-5 py-2.5">
              Contactar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-stone-600"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={cn('block h-px bg-stone-900 transition-all duration-300', open && 'rotate-45 translate-y-2')} />
              <span className={cn('block h-px bg-stone-900 transition-all duration-300', open && 'opacity-0')} />
              <span className={cn('block h-px bg-stone-900 transition-all duration-300', open && '-rotate-45 -translate-y-2')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-stone-600 hover:text-stone-900 py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setOpen(false)} className="btn-primary text-xs mt-4 w-full text-center">
            Contactar
          </Link>
        </div>
      )}
    </header>
  )
}
