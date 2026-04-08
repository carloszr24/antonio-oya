import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const mapsHref = 'https://www.google.com/maps/place/AP+Real+Estate+Services/@36.8374433,-2.4588639,18z/data=!3m1!4b1!4m6!3m5!1s0xd7a9d2dd1816679:0x72ee21246ddfb14a!8m2!3d36.8374417!4d-2.4579006!16s%2Fg%2F11j90l4_w8?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D'
  const phoneHref = 'tel:+34950790217'
  const emailHref = 'mailto:adm.ap.servicios.inmobiliarios@gmail.com'
  const whatsappHref = 'https://wa.me/34695919069'

  return (
    <footer className="bg-stone-200 text-stone-700 mt-24 border-t border-stone-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image
              src="/images/logo-AP.png"
              alt="AP Real Estate Services"
              width={230}
              height={52}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-stone-600 max-w-sm">
              Gestionamos arrendamientos y ventas de viviendas propias y de particulares en Almería.
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
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  Av. de la Estación, 25, 7º 3 B, 04005 Almería
                </a>
              </li>
              <li>
                <a href={phoneHref} className="hover:text-stone-900 transition-colors">950 79 02 17</a>
              </li>
              <li>
                <a href={emailHref} className="hover:text-stone-900 transition-colors">adm.ap.servicios.inmobiliarios@gmail.com</a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  WhatsApp: +34 695 91 90 69
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} AP Real Estate Services. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-stone-900 transition-colors">Panel Admin</Link>
        </div>
      </div>
    </footer>
  )
}
