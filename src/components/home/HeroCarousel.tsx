'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/lib/brand'

const images = ['/images/Carrusel-1-Antonio.jpg', '/images/Carrusel-2-Antonio.jpg']

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Viviendas en ${brand.location}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/55 to-stone-950/75" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] mb-8 animate-fade-up">
          {brand.businessName}
          <br />
          <span className="italic">líder en ventas</span>
        </h1>
        <p
          className="text-stone-300 text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Si quieres comprar o vender, estamos aquí para asesorarte en cada paso.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link href="/propiedades" className="btn-gold px-10 py-4 text-sm tracking-wide">
            Ver propiedades
          </Link>
          <Link
            href="/contacto"
            className="text-white text-sm tracking-wide border border-white/30 px-10 py-4 hover:border-white transition-colors duration-200"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  )
}
