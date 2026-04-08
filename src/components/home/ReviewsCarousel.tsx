'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Review = {
  id: number
  name: string
  text: string
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Gaby',
    text: 'Una experiencia maravillosa a la hora de la contratación del piso. Un asesor excelente como Carlos no debería faltar en tu empresa. Recomendable al 100%.',
  },
  {
    id: 2,
    name: 'Josefa Torres Piedra',
    text: 'Mi experiencia con Carlos ha sido excepcional. Desde el primer contacto hasta la firma del contrato, fue profesional, amable y siempre dispuesto a responder mis preguntas. Encontró la propiedad perfecta para mis necesidades y facilitó todo el proceso.',
  },
  {
    id: 3,
    name: 'Federico Sánchez',
    text: 'Muy satisfecho con los servicios de Inmobiliaria Antonio Oya. Carlos es un profesional formal, servicial y honesto. Sin duda, confiaremos en él en el futuro.',
  },
  {
    id: 4,
    name: 'Lola',
    text: 'Buen profesional. Me resolvió el alquiler en días festivos. Total confianza. Seguiré utilizando sus servicios; lo recomiendo al 100%.',
  },
  {
    id: 5,
    name: 'Lu Soler',
    text: 'Súper recomendable. Carlos es un profesional de los pies a la cabeza. Al principio, al hablar con él, pensé que podía ser una estafa por la rapidez al solucionar todo, e incluso estando él de vacaciones nos solucionó algunas cosillas. Sin más, un 10.',
  },
  {
    id: 6,
    name: 'Guille Plaza Góngora',
    text: 'Carlos ha sido un gran descubrimiento. Siempre contaré con él cuando tenga que alquilar o vender un piso. Me ha encantado su responsabilidad, seriedad y profesionalidad. Desde el principio me causó muy buena impresión y, después de su trabajo bien realizado, he podido comprobar que no estaba equivocado. Felicidades.',
  },
  {
    id: 7,
    name: 'Martha Yazmin Ríos Vargas',
    text: 'Voy a ser sincera: después de ir a cinco inmobiliarias, quien mejor atención me dio fue esta empresa. Soy de fuera y no me era fácil encontrar el alquiler de un piso. Conocí a Carlos, quien hizo todo lo posible por encontrarme una vivienda que se adaptara a mis gustos y necesidades. Estoy muy agradecida con esta empresa y la recomiendo con total confianza.',
  },
  {
    id: 8,
    name: 'Michael Weldert',
    text: 'Carlos es el mejor agente inmobiliario que uno puede esperar. Escuchó nuestras necesidades y nos mostró los mejores lugares. Se tomó el tiempo de responder todas nuestras preguntas y preocupaciones, y se aseguró de que estuviéramos cómodos durante el proceso. Incluso después del contrato, sigue ahí para ayudarnos. Sin duda, se ganó nuestra confianza.',
  },
  {
    id: 9,
    name: 'Ana Lucía Soto Zapata',
    text: 'Negocio recomendable y transparente. Gestionaron el alquiler de mis habitaciones muy rápido y siempre manteniendo mis condiciones. Carlos sigue así, llegarás muy lejos: siempre honesto y sincero. No dudaré en volver a contactar con tu empresa. Muchísimas gracias por tus servicios.',
  },
  {
    id: 10,
    name: 'Migue Blanco',
    text: '100% recomendable. El trato de Carlos ha sido magnífico, con seguimiento en todos los pasos a dar. Cualquier duda te la aclaraba en cada momento. Ciertamente, una muy buena experiencia.',
  },
]

function StarRow() {
  return (
    <div className="flex items-center gap-1.5" aria-label="Valoracion excelente">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          className={`h-5 w-5 ${idx === 4 ? 'text-gold/80' : 'text-gold'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.46 6.13 20.54l1.12-6.53L2.5 9.39l6.56-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const pointerXRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const resumeTimerRef = useRef<number | null>(null)
  const loopedReviews = useMemo(() => [...REVIEWS, ...REVIEWS], [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMediaChange = () => setReducedMotion(media.matches)
    onMediaChange()
    media.addEventListener('change', onMediaChange)
    return () => media.removeEventListener('change', onMediaChange)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !trackRef.current) return
    loopWidthRef.current = trackRef.current.scrollWidth / 2
  }, [isVisible, loopedReviews])

  useEffect(() => {
    if (!isVisible || reducedMotion || !trackRef.current) return

    const speedPxPerSecond = 22
    const tick = (timestamp: number) => {
      if (lastFrameRef.current === null) lastFrameRef.current = timestamp
      const delta = timestamp - lastFrameRef.current
      lastFrameRef.current = timestamp

      if (!isPaused && !isDraggingRef.current && loopWidthRef.current > 0) {
        offsetRef.current += (speedPxPerSecond * delta) / 1000
        if (offsetRef.current >= loopWidthRef.current) {
          offsetRef.current -= loopWidthRef.current
        }
        trackRef.current!.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastFrameRef.current = null
    }
  }, [isVisible, reducedMotion, isPaused])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    }
  }, [])

  const resumeAutoplay = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1200)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerXRef.current = event.clientX
    isDraggingRef.current = true
    setIsPaused(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || pointerXRef.current === null || loopWidthRef.current <= 0) return
    const deltaX = event.clientX - pointerXRef.current
    pointerXRef.current = event.clientX
    offsetRef.current -= deltaX

    while (offsetRef.current < 0) offsetRef.current += loopWidthRef.current
    while (offsetRef.current >= loopWidthRef.current) offsetRef.current -= loopWidthRef.current

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    pointerXRef.current = null
    resumeAutoplay()
  }

  return (
    <section ref={rootRef} className="bg-stone-50 py-20 md:py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center max-w-3xl mx-auto mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Opiniones</p>
          <h2 className="section-title mb-5">Nuestra prioridad: el cliente</h2>
          <div className="flex flex-col items-center gap-2 text-stone-700">
            <StarRow />
            <p className="text-base md:text-lg font-medium">+150 clientes satisfechos</p>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="overflow-hidden select-none touch-pan-y"
            aria-label="Carrusel de resenas de clientes"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (!isDraggingRef.current) resumeAutoplay()
            }}
          >
            <div ref={trackRef} className="flex items-stretch gap-4 md:gap-6 will-change-transform">
              {loopedReviews.map((review, idx) => (
                <div key={`${review.id}-${idx}`} className="shrink-0 w-[86vw] sm:w-[68vw] md:w-[44vw] lg:w-[31vw]">
                  <article className="card-hover h-full min-h-56 bg-white border border-stone-200 p-6 md:p-7 rounded-lg shadow-sm hover:shadow-lg">
                    <StarRow />
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-4">"{review.text}"</p>
                    <p className="mt-6 text-stone-900 font-semibold">{review.name}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
