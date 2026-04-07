import Link from 'next/link'
import Image from 'next/image'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getFeaturedProperties() {
  const supabase = createPublicSupabase()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)
  if (error) throw error
  return rowsToProperties(data as PropertyRow[] | null)
}

async function getStats() {
  const supabase = createPublicSupabase()
  const { count: total, error: e1 } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
  if (e1) throw e1
  const { count: available, error: e2 } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'disponible')
  if (e2) throw e2
  return { total: total ?? 0, available: available ?? 0 }
}

export default async function HomePage() {
  const [featured, stats] = await Promise.all([getFeaturedProperties(), getStats()])

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero-Almeria.jpg"
            alt="Viviendas en Almería"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/55 to-stone-950/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in">
            Almería · Servicios inmobiliarios
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] mb-8 animate-fade-up">
            Tu hogar ideal,<br />
            <span className="italic">donde lo imaginas</span>
          </h1>
          <p className="text-stone-300 text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            Gestionamos arrendamientos y ventas de viviendas propias y de particulares.
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-scroll" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-stone-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '+15', label: 'Años de experiencia' },
              { value: stats.total.toString(), label: 'Propiedades en cartera' },
              { value: stats.available.toString(), label: 'Disponibles ahora' },
              { value: '+500', label: 'Familias satisfechas' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-light text-gold mb-2">{stat.value}</div>
                <div className="text-stone-400 text-xs tracking-wide">{stat.label}</div>
              </div>
            ))}
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
