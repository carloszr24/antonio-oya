import Link from 'next/link'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { brand } from '@/lib/brand'
import { HeroCarousel } from '@/components/home/HeroCarousel'

export const dynamic = 'force-dynamic'

async function getFeaturedProperties() {
  const supabase = createPublicSupabase()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    // Prioriza siempre las propiedades marcadas como destacadas.
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(3)
  if (error) throw error
  return rowsToProperties(data as PropertyRow[] | null)
}

export default async function HomePage() {
  const featured = await getFeaturedProperties()

  return (
    <>
      <HeroCarousel />

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Selección</p>
            <h2 className="section-title">Propiedades<br />destacadas</h2>
          </div>
          <Link href="/propiedades" className="btn-outline text-xs shrink-0">
            Ver todas →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
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
                title: 'Compraventa',
                desc: 'Fincas rústicas y urbanas con acompañamiento de principio a fin.',
              },
              {
                icon: '📋',
                title: 'Tasaciones',
                desc: 'Valoración realista de mercado para vender o comprar con seguridad.',
              },
              {
                icon: '🤝',
                title: 'Asesoramiento cercano',
                desc: 'Te guiamos de forma clara, honesta y directa durante toda la operación.',
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
            Cuéntanos qué buscas y te ayudamos a dar el siguiente paso en {brand.location}.
          </p>
          <Link href="/contacto" className="btn-primary px-12 py-4 text-sm tracking-wide">
            Hablar con un asesor
          </Link>
        </div>
      </section>
    </>
  )
}
