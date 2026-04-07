import { NextRequest, NextResponse } from 'next/server'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { bodyToInsert, rowToProperty, rowsToProperties, type PropertyRow } from '@/lib/property-db'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET() {
  try {
    const supabase = createPublicSupabase()
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(rowsToProperties(data as PropertyRow[] | null))
  } catch {
    return NextResponse.json({ error: 'Error al obtener propiedades' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    const body = await request.json()
    const {
      title, price, location, type, status, description,
      images, fotocasaUrl, bedrooms, bathrooms, sqMeters, featured,
      availability, hotWater, heating, condition, propertyAge,
      garage, elevator, furnished, energyRating, energyValue,
      emissionsRating, emissionsValue,
    } = body

    if (!title || !price || !location || !type || !description) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const insert = bodyToInsert({
      title,
      price,
      location,
      type,
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
      .insert(insert)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(rowToProperty(data as PropertyRow), { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
