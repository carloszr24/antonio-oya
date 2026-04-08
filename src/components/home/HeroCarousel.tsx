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
    <section className="relative min-h-svh pt-20 pb-8 md:pt-24 md:pb-10 flex items-center justify-center overflow-hidden">
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
        <h1 className="font-display text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] text-balance max-md:tracking-[-0.01em] text-[clamp(2rem,5.8vw+0.4rem,4.6rem)] leading-[1.08] mb-4 md:mb-5 animate-fade-up">
          Líderes en Compraventa de Fincas Rústicas y Urbanas en Jaén
        </h1>
        <p
          className="text-stone-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] text-[clamp(1rem,1.1vw+0.9rem,1.25rem)] font-normal max-w-[min(100%,20rem)] sm:max-w-xl md:max-w-2xl mx-auto mb-5 md:mb-6 leading-relaxed text-pretty animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Gestionamos arrendamientos y ventas de viviendas propias y de particulares.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link href="/propiedades" className="btn-gold w-56 h-12 text-base tracking-wide">
            Ver propiedades
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center w-56 h-12 text-white text-base tracking-wide border border-white/40 bg-black/10 hover:border-white transition-colors duration-200"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  )
}
