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
    name: 'Mario Edgar Jose Hernando',
    text: 'He comprado un piso guiado y asesorado por Antonio Oya y considero que su cercanía, profesionalidad y confianza están a la altura de una compra tan importante como una vivienda. Gracias.',
  },
  {
    id: 2,
    name: 'Julio Cobo',
    text: 'Muy profesional, la excelencia en todo lo que hacen. Seriedad y honradez, de los pocos que quedan así. Siempre volvería a trabajar con ellos. Son de matrícula de honor.',
  },
  {
    id: 3,
    name: 'T.C.M.',
    text: 'Muy buen profesional. Presupuesto sin sorpresas e información muy detallada y precisa. Servicio postventa también excelente. Lo recomiendo sin dudarlo.',
  },
  {
    id: 4,
    name: 'Susana Zarza',
    text: 'Increíble atención por parte de Antonio, buena puntualidad, simpatía y no dudo en ayudarnos para buscar lo que necesitábamos. El mejor agente inmobiliario de la zona. Mil gracias, Antonio.',
  },
  {
    id: 5,
    name: 'Andrés',
    text: 'Hemos confiado en ellos varias veces y solo decir que grandes profesionales. Ellos se encargan de todos los trámites sin tú tener que preocuparte de nada. Solo pedirles que necesitas y ellos lo encuentran.',
  },
  {
    id: 6,
    name: 'Polvoron 123',
    text: 'Trato muy cercano y profesional, no solo se encargan de la compra, te acompañan en todo el proceso y se encargan de numerosos trámites agilizando todo. Gracias. 100% recomendable!!',
  },
  {
    id: 7,
    name: 'Angel Casas sanjuan',
    text: 'Es una inmobiliaria de confianza. Me han vendido una casa, son rápidos y buscan a la familia que encaje en la vivienda que quieras vender, y se encargan de todo el papeleo. Un acierto sin duda alguna.',
  },
  {
    id: 8,
    name: 'Nazaret Siles',
    text: 'La mejor inmobiliaria sin dudas. Profesionales con un trato cercano. Se encargan de todos los trámites de la venta y solucionan al momento cualquier inconveniente "de papeleo" que surge durante la misma. Tantos años de experiencia en el trato con fincas e inmuebles son el mejor aval para que, tanto el comprador como el vendedor, depositen la confianza en esta inmobiliaria.',
  },
  {
    id: 9,
    name: 'Magdalena Justicia Rodriguez',
    text: 'La experiencia con ellos ha sido fantástica, son responsables, eficientes, resolutivos y muy pacientes con las dudas y preguntas que se nos crean en estas decisiones tan importantes. Solo tengo que darles las gracias por haber encontrado mi casita!!!!',
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

function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.2 2.9-7.2 0-.7-.1-1.4-.2-2H12z" />
        <path fill="#34A853" d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.3-4h-3.2v2.5C5.1 19.8 8.3 22 12 22z" />
        <path fill="#FBBC05" d="M6.7 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.5H3.5C2.9 8.8 2.5 10.4 2.5 12s.4 3.2 1 4.5L6.7 14z" />
        <path fill="#4285F4" d="M12 6.3c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.8 3.6 14.6 2.8 12 2.8 8.3 2.8 5.1 5 3.5 8.5l3.2 2.5c.7-2.3 2.8-4 5.3-4z" />
      </svg>
      Google
    </span>
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
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-semibold">5.0/5.0</span>
              <a
                href="https://www.google.com/search?q=Inmobiliaria+Antonio+Oya+Mancha+Real"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
                aria-label="Ver ficha de Google de Inmobiliaria Antonio Oya"
              >
                <GoogleBadge />
              </a>
            </div>
            <p className="text-base md:text-lg font-medium">+80 clientes satisfechos</p>
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
                    <div className="flex items-center justify-between gap-3">
                      <StarRow />
                      <span className="text-sm font-semibold text-stone-700">5.0/5.0</span>
                    </div>
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
