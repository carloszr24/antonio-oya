import { Suspense } from 'react'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'

export const dynamic = 'force-dynamic'

interface SearchParams {
  type?: string
  operation?: string
  status?: string
  minPrice?: string
  maxPrice?: string
}

async function getProperties(searchParams: SearchParams) {
  const supabase = createPublicSupabase()
  let q = supabase.from('properties').select('*').order('created_at', { ascending: false })

  if (searchParams.type) q = q.eq('type', searchParams.type)
  if (searchParams.operation) q = q.eq('operation', searchParams.operation)
  if (searchParams.status) q = q.eq('status', searchParams.status)
  if (searchParams.minPrice) q = q.gte('price', parseFloat(searchParams.minPrice))
  if (searchParams.maxPrice) q = q.lte('price', parseFloat(searchParams.maxPrice))

  const { data, error } = await q
  if (error) throw error
  return rowsToProperties(data as PropertyRow[] | null)
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const properties = await getProperties(searchParams)
  const hasFilters = Object.values(searchParams).some(Boolean)

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-stone-950 text-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Catálogo</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">Propiedades</h1>
          <p className="text-stone-400 mt-4 text-lg font-light">
            {properties.length} inmueble{properties.length !== 1 ? 's' : ''} encontrado{properties.length !== 1 ? 's' : ''}
            {hasFilters && ' · Filtros activos'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="skeleton h-64 w-full" />}>
              <PropertyFilters />
            </Suspense>
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            {properties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-stone-400 text-lg mb-4">No hay propiedades con estos filtros.</p>
                <a href="/propiedades" className="text-gold text-sm hover:underline">
                  Ver todas las propiedades →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
