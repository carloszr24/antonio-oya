'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { PROPERTY_TYPES, PROPERTY_OPERATIONS, PROPERTY_STATUSES, OPERATION_LABELS, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

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
    <div className="bg-stone-50 border border-stone-200 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500">Filtros</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-gold hover:text-gold-dark transition-colors">
            Limpiar
          </button>
        )}
      </div>

      {/* Tipo */}
      <div>
        <label className="text-xs text-stone-500 mb-2 block">Tipo de inmueble</label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => updateParam('type', type === t ? '' : t)}
              className={cn(
                'text-xs px-3 py-1.5 border transition-colors duration-150',
                type === t
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'border-stone-200 text-stone-600 hover:border-stone-400'
              )}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Operación */}
      <div>
        <label className="text-xs text-stone-500 mb-2 block">Operación</label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_OPERATIONS.map((op) => (
            <button
              key={op}
              onClick={() => updateParam('operation', operation === op ? '' : op)}
              className={cn(
                'text-xs px-3 py-1.5 border transition-colors duration-150',
                operation === op
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'border-stone-200 text-stone-600 hover:border-stone-400'
              )}
            >
              {OPERATION_LABELS[op]}
            </button>
          ))}
        </div>
      </div>

      {/* Estado */}
      <div>
        <label className="text-xs text-stone-500 mb-2 block">Estado</label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateParam('status', status === s ? '' : s)}
              className={cn(
                'text-xs px-3 py-1.5 border transition-colors duration-150',
                status === s
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'border-stone-200 text-stone-600 hover:border-stone-400'
              )}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <label className="text-xs text-stone-500 mb-2 block">Precio (€)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={minPrice}
            onChange={(e) => updateParam('minPrice', e.target.value)}
            className="text-xs px-3 py-2 border border-stone-200 bg-white focus:outline-none focus:border-stone-400 w-full"
          />
          <input
            type="number"
            placeholder="Máx"
            value={maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
            className="text-xs px-3 py-2 border border-stone-200 bg-white focus:outline-none focus:border-stone-400 w-full"
          />
        </div>
      </div>
    </div>
  )
}
