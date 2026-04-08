import Link from 'next/link'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import { FeaturedPropertiesGrid } from '@/components/home/FeaturedPropertiesGrid'
import { HeroCarousel } from '@/components/home/HeroCarousel'

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
      <HeroCarousel />

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
