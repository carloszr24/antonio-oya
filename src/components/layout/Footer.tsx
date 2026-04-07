import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/lib/brand'

export function Footer() {
  return (
    <footer className="bg-stone-200 text-stone-700 mt-24 border-t border-stone-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={230}
              height={52}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-stone-600 max-w-sm">
              {brand.claim}
            </p>
          </div>
          <div>
            <h4 className="text-stone-900 text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="hover:text-stone-900 transition-colors">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-stone-900 transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-stone-900 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-900 text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>{brand.addressLine}</li>
              <li className="pt-1">
                <a href={`tel:${brand.phoneHref}`} className="hover:text-stone-900 transition-colors">{brand.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-stone-900 transition-colors">{brand.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} {brand.businessName}. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-stone-900 transition-colors">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
