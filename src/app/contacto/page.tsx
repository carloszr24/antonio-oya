'use client'

import { useState } from 'react'
import { brand } from '@/lib/brand'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simula envío - conectar con EmailJS, Resend o similar
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-stone-950 text-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Estamos aquí</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">Contacto</h1>
          <p className="text-stone-400 mt-4 text-lg font-light max-w-md">
            Escríbenos o llámanos. Si quieres comprar o vender, estamos aquí para asesorarte.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-10 text-center">
                <span className="text-4xl mb-4 block">✓</span>
                <h3 className="font-medium text-emerald-800 text-lg mb-2">Mensaje enviado</h3>
                <p className="text-emerald-600 text-sm">
                  Nos pondremos en contacto contigo en las próximas horas.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ nombre: '', email: '', telefono: '', mensaje: '' }) }}
                  className="mt-6 text-sm text-emerald-700 underline hover:no-underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-3xl font-light text-stone-900 mb-8">Envíanos un mensaje</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-stone-500 tracking-wide block mb-2">Nombre *</label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 tracking-wide block mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-stone-500 tracking-wide block mb-2">Teléfono</label>
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-500 tracking-wide block mb-2">Mensaje *</label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntanos qué necesitas..."
                    className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>

                <p className="text-xs text-stone-400 text-center">
                  Al enviar aceptas nuestra política de privacidad.
                </p>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-3xl font-light text-stone-900 mb-8">Información</h2>
              <div className="space-y-6">
                {[
                  { icon: '📍', label: 'Dirección', value: brand.addressLine },
                  { icon: '📞', label: 'Teléfono', value: brand.phoneDisplay },
                  { icon: '✉️', label: 'Email', value: brand.email },
                  { icon: '🕐', label: 'Horario', value: 'Lun–Vie: 9:30–14:00 · 17:00–20:00\nSáb–Dom: Cerrado' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs text-stone-400 tracking-wide mb-1">{item.label}</p>
                      <p className="text-stone-700 text-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="border-t border-stone-100 pt-8">
              <p className="text-xs text-stone-400 tracking-widest uppercase mb-4">Redes sociales</p>
              <div className="flex gap-4">
                {brand.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
