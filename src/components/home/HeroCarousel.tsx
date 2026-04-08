'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const heroImages = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg']

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-svh pt-24 pb-14 md:pt-28 md:pb-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Viviendas en Mancha Real, Jaén"
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/60 to-stone-950/80" />
      </div>

      <div className="relative z-10 text-center px-4 min-[400px]:px-6 max-w-5xl mx-auto">
        <h1 className="font-display text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] text-balance max-md:tracking-[-0.02em] text-[calc(clamp(2.25rem,7.5vw+0.35rem,3.45rem)+4pt)] md:text-[calc(clamp(2.65rem,5.2vw+1.1rem,5.8rem)+4pt)] leading-[1.11] md:leading-[1.05] mb-6 md:mb-8 animate-fade-up">
          Líderes en Compraventa de Fincas Rústicas y Urbanas en Jaén
        </h1>
        <p
          className="text-stone-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] text-[calc(1rem+4pt)] sm:text-[calc(1.125rem+4pt)] md:text-[calc(1.25rem+4pt)] font-normal max-w-[min(100%,22rem)] sm:max-w-2xl mx-auto mb-8 sm:mb-9 md:mb-10 leading-relaxed text-pretty animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Gestionamos arrendamientos y ventas de viviendas propias y de particulares.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link href="/propiedades" className="btn-gold px-10 py-4 text-[calc(0.875rem+4pt)] tracking-wide">
            Ver propiedades
          </Link>
          <Link
            href="/contacto"
            className="text-white text-[calc(0.875rem+4pt)] tracking-wide border border-white/40 bg-black/10 px-10 py-4 hover:border-white transition-colors duration-200"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  )
}
