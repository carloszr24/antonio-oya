'use client'

import { useEffect, useRef, useState } from 'react'
import { Property } from '@/types'
import { PropertyCard } from '@/components/properties/PropertyCard'

interface FeaturedPropertiesGridProps {
  properties: Property[]
}

export function FeaturedPropertiesGrid({ properties }: FeaturedPropertiesGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMediaChange = () => setReducedMotion(media.matches)
    onMediaChange()
    media.addEventListener('change', onMediaChange)
    return () => media.removeEventListener('change', onMediaChange)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef}>
      <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
        <div className="flex gap-5 md:gap-7 lg:grid lg:grid-cols-3 lg:gap-7">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`snap-start shrink-0 w-[86vw] sm:w-[68vw] md:w-[52%] lg:w-auto lg:min-w-0 ${
              isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-6'
            }`}
            style={
              isVisible
                ? {
                    animationDelay: reducedMotion ? '0s' : `${index * 0.12}s`,
                    animationFillMode: 'forwards',
                  }
                : undefined
            }
          >
            <PropertyCard property={property} variant="featuredMinimal" />
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
