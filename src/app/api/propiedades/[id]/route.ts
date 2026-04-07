import { NextRequest, NextResponse } from 'next/server'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { bodyToInsert, rowToProperty, type PropertyRow } from '@/lib/property-db'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createPublicSupabase()
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', params.id)
      .maybeSingle()
    if (error) throw error
    if (!data) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
    return NextResponse.json(rowToProperty(data as PropertyRow))
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    const body = await request.json()
    const {
      title, price, location, type, operation, status, description,
      images, fotocasaUrl, bedrooms, bathrooms, sqMeters, featured,
      availability, hotWater, heating, condition, propertyAge,
      garage, elevator, furnished, energyRating, energyValue,
      emissionsRating, emissionsValue,
    } = body

    const row = bodyToInsert({
      title,
      price,
      location,
      type,
      operation,
      status,
      description,
      images,
      fotocasaUrl,
      bedrooms,
      bathrooms,
      sqMeters,
      availability,
      hotWater,
      heating,
      condition,
      propertyAge,
      garage,
      elevator,
      furnished,
      energyRating,
      energyValue,
      emissionsRating,
      emissionsValue,
      featured,
    })

    const supabase = createAdminSupabase()
    const { data, error } = await supabase
      .from('properties')
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(rowToProperty(data as PropertyRow))
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    const supabase = createAdminSupabase()
    const { error } = await supabase.from('properties').delete().eq('id', params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
