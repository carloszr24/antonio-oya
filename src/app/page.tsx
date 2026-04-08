import Link from 'next/link'
import Image from 'next/image'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import { FeaturedPropertiesGrid } from '@/components/home/FeaturedPropertiesGrid'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getFeaturedProperties() {
  const supabase = createPublicSupabase()
  const { data: featuredData, error: featuredError } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)
  if (featuredError) throw featuredError

  const featuredRows = (featuredData as PropertyRow[] | null) ?? []
  if (featuredRows.length >= 3) {
    return rowsToProperties(featuredRows.slice(0, 3))
  }

  const remaining = 3 - featuredRows.length
  const { data: fallbackData, error: fallbackError } = await supabase
    .from('properties')
    .select('*')
    .or('featured.eq.false,featured.is.null')
    .order('created_at', { ascending: false })
    .limit(remaining)

  if (fallbackError) throw fallbackError

  const fallbackRows = (fallbackData as PropertyRow[] | null) ?? []
  return rowsToProperties([...featuredRows, ...fallbackRows].slice(0, 3))
}

export default async function HomePage() {
  const featured = await getFeaturedProperties()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-svh pt-24 pb-14 md:pt-28 md:pb-20 flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Carrusel-1-Antonio.jpg"
            alt="Viviendas en Mancha Real, Jaén"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/55 to-stone-950/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 min-[400px]:px-6 max-w-5xl mx-auto">
          <h1 className="font-display text-white text-balance max-md:tracking-[-0.02em] text-[calc(clamp(2.25rem,7.5vw+0.35rem,3.45rem)+4pt)] md:text-[calc(clamp(2.65rem,5.2vw+1.1rem,5.8rem)+4pt)] leading-[1.11] md:leading-[1.05] mb-6 md:mb-8 animate-fade-up">
            Encuentra tu hogar
            <span className="hidden md:inline"> </span>
            <br className="md:hidden" aria-hidden="true" />
            en Mancha Real
          </h1>
          <p className="text-stone-200 text-[calc(1rem+4pt)] sm:text-[calc(1.125rem+4pt)] md:text-[calc(1.25rem+4pt)] font-normal max-w-[min(100%,22rem)] sm:max-w-2xl mx-auto mb-8 sm:mb-9 md:mb-10 leading-relaxed text-pretty animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            Gestionamos arrendamientos y ventas de viviendas propias y de particulares.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link href="/propiedades" className="btn-gold px-10 py-4 text-[calc(0.875rem+4pt)] tracking-wide">
              Ver propiedades
            </Link>
            <Link href="/contacto" className="text-white text-[calc(0.875rem+4pt)] tracking-wide border border-white/30 px-10 py-4 hover:border-white transition-colors duration-200">
              Contactar
            </Link>
          </div>
        </div>

      </section>

      <ReviewsCarousel />

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        {featured.length > 0 ? (
          <div className="space-y-7">
            <div className="relative min-h-10">
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-center">
                Nuevas <span className="text-gold">oportunidades</span>
              </h2>
              <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2">
                <Link href="/propiedades" className="btn-outline text-xs shrink-0">
                  Ver todas →
                </Link>
              </div>
            </div>
            <FeaturedPropertiesGrid properties={featured} />
            <div className="flex justify-end md:hidden">
              <Link href="/propiedades" className="btn-outline text-xs shrink-0">
                Ver todas →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400">
            <p>Pronto añadiremos propiedades destacadas.</p>
          </div>
        )}
      </section>

      {/* SERVICES STRIP */}
      <section className="bg-stone-50 py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏡',
                title: 'Compra y venta',
                desc: 'Asesoramiento experto en todas las fases de la transacción.',
              },
              {
                icon: '📋',
                title: 'Valoración gratuita',
                desc: 'Conoce el valor real de tu propiedad sin compromiso.',
              },
              {
                icon: '🤝',
                title: 'Gestión integral',
                desc: 'Nos encargamos de todo: notaría, hipoteca y trámites.',
              },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-white border border-stone-100 hover:border-gold transition-colors duration-300">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title mb-6">¿Listo para encontrar<br />tu próximo hogar?</h2>
          <p className="section-subtitle mb-10">
            Cuéntanos qué buscas y nuestro equipo te ayudará a encontrarlo.
          </p>
          <Link href="/contacto" className="btn-primary px-12 py-4 text-sm tracking-wide">
            Hablar con un asesor
          </Link>
        </div>
      </section>
    </>
  )
}
