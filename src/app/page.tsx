import Link from 'next/link'
import Image from 'next/image'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { brand } from '@/lib/brand'

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
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero-Almeria.jpg"
            alt={`Viviendas en ${brand.location}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/55 to-stone-950/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] mb-8 animate-fade-up">
            {brand.businessName}<br />
            <span className="italic">lider en ventas</span>
          </h1>
          <p className="text-stone-300 text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            Si quieres comprar o vender, estamos aqui para asesorarte en cada paso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link href="/propiedades" className="btn-gold px-10 py-4 text-sm tracking-wide">
              Ver propiedades
            </Link>
            <Link href="/contacto" className="text-white text-sm tracking-wide border border-white/30 px-10 py-4 hover:border-white transition-colors duration-200">
              Contactar
            </Link>
          </div>
        </div>

      </section>

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
                desc: 'Fincas rusticas y urbanas con acompanamiento de principio a fin.',
              },
              {
                icon: '📋',
                title: 'Tasaciones',
                desc: 'Valoracion realista de mercado para vender o comprar con seguridad.',
              },
              {
                icon: '🤝',
                title: 'Asesoramiento cercano',
                desc: 'Te guiamos de forma clara, honesta y directa durante toda la operacion.',
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
            Cuentanos que buscas y te ayudamos a dar el siguiente paso en {brand.location}.
          </p>
          <Link href="/contacto" className="btn-primary px-12 py-4 text-sm tracking-wide">
            Hablar con un asesor
          </Link>
        </div>
      </section>
    </>
  )
}
