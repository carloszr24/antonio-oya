import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/types'
import { formatPrice, OPERATION_LABELS, parseImages, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'featuredMinimal'
}

const statusColors: Record<string, string> = {
  disponible: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  reservado: 'bg-amber-50 text-amber-700 border-amber-200',
  vendido: 'bg-stone-100 text-stone-500 border-stone-200',
}

export function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const images = parseImages(property.images)
  const firstImage = images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
  const isFeaturedMinimal = variant === 'featuredMinimal'

  return (
    <Link href={`/propiedades/${property.id}`} className="group block">
      <article className="card-hover bg-white border border-stone-100">
        {/* Image */}
        <div className={cn('relative overflow-hidden bg-stone-100', isFeaturedMinimal ? 'aspect-[3/4]' : 'aspect-[4/3]')}>
          <Image
            src={firstImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={isFeaturedMinimal ? '(max-width: 768px) 86vw, (max-width: 1024px) 68vw, 31vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
          {/* Status badge */}
          {!isFeaturedMinimal && (
            <>
              <span className={cn(
                'absolute top-3 left-3 text-xs font-medium px-2.5 py-1 border',
                statusColors[property.status] || statusColors.disponible
              )}>
                {STATUS_LABELS[property.status] || property.status}
              </span>
              {/* Image count */}
              {images.length > 1 && (
                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 backdrop-blur-sm">
                  +{images.length} fotos
                </span>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className={cn('p-5', isFeaturedMinimal && 'p-4')}>
          <div className={cn('flex items-start justify-between gap-4', isFeaturedMinimal ? 'mb-4' : 'mb-2')}>
            <h3 className={cn(
              'font-medium text-stone-900 leading-snug line-clamp-2 group-hover:text-gold transition-colors',
              isFeaturedMinimal ? 'text-base' : 'text-sm'
            )}>
              {property.title}
            </h3>
          </div>

          {!isFeaturedMinimal && (
            <>
              <p className="text-xs text-stone-500 mb-4 flex items-center gap-1">
                <span>📍</span> {property.location}
              </p>

              {/* Stats */}
              {(property.sqMeters || property.bedrooms || property.bathrooms) && (
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4 pb-4 border-b border-stone-100">
                  {property.sqMeters && <span>{property.sqMeters}m²</span>}
                  {property.bedrooms != null && property.bedrooms > 0 && (
                    <span>{property.bedrooms} hab.</span>
                  )}
                  {property.bathrooms && <span>{property.bathrooms} baños</span>}
                  <span className="ml-auto text-xs bg-stone-100 px-2 py-0.5 text-stone-600">
                    {TYPE_LABELS[property.type] || property.type}
                  </span>
                  <span className="text-xs bg-stone-100 px-2 py-0.5 text-stone-600">
                    {OPERATION_LABELS[property.operation || 'venta'] || property.operation || 'Venta'}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Price */}
          <div className={cn('flex items-center justify-between', isFeaturedMinimal && 'pt-0')}>
            <span className={cn('font-display font-medium text-stone-900', isFeaturedMinimal ? 'text-2xl' : 'text-xl')}>
              {formatPrice(property.price, property.operation)}
            </span>
            {!isFeaturedMinimal && (
              <span className="text-xs text-gold group-hover:translate-x-1 transition-transform inline-block">
                Ver →
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white border border-stone-100">
      <div className="skeleton aspect-[4/3]" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-6 w-1/3 mt-4" />
      </div>
    </div>
  )
}
