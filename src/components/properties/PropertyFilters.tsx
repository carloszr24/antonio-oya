'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { PROPERTY_TYPES, PROPERTY_OPERATIONS, PROPERTY_STATUSES, OPERATION_LABELS, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get('type') || ''
  const operation = searchParams.get('operation') || ''
  const status = searchParams.get('status') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/propiedades?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => {
    router.push('/propiedades')
  }

  const hasFilters = type || operation || status || minPrice || maxPrice

  return (
    <div className="bg-white border border-stone-200 p-4 md:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500">Filtros</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-gold hover:text-gold-dark transition-colors">
            Limpiar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <select
          value={type}
          onChange={(e) => updateParam('type', e.target.value)}
          className="text-sm px-3 py-2.5 border border-stone-200 bg-white focus:outline-none focus:border-gold"
          aria-label="Filtrar por tipo"
        >
          <option value="">Tipo</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>

        <select
          value={operation}
          onChange={(e) => updateParam('operation', e.target.value)}
          className="text-sm px-3 py-2.5 border border-stone-200 bg-white focus:outline-none focus:border-gold"
          aria-label="Filtrar por operación"
        >
          <option value="">Operación</option>
          {PROPERTY_OPERATIONS.map((op) => (
            <option key={op} value={op}>
              {OPERATION_LABELS[op]}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => updateParam('status', e.target.value)}
          className="text-sm px-3 py-2.5 border border-stone-200 bg-white focus:outline-none focus:border-gold"
          aria-label="Filtrar por estado"
        >
          <option value="">Estado</option>
          {PROPERTY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio mín."
          value={minPrice}
          onChange={(e) => updateParam('minPrice', e.target.value)}
          className="text-sm px-3 py-2.5 border border-stone-200 bg-white focus:outline-none focus:border-gold"
        />
        <input
          type="number"
          placeholder="Precio máx."
          value={maxPrice}
          onChange={(e) => updateParam('maxPrice', e.target.value)}
          className="text-sm px-3 py-2.5 border border-stone-200 bg-white focus:outline-none focus:border-gold"
        />
      </div>
    </div>
  )
}
