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
  const token = getAdminTokenFromRequest(request)
  // #region agent log
  fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H1',location:'src/app/api/propiedades/route.ts:POST:entry',message:'POST /api/propiedades entry',data:{hasAdminToken:Boolean(token)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!verifyAdminSessionToken(token)) {
    // #region agent log
    fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H1',location:'src/app/api/propiedades/route.ts:POST:unauthorized',message:'Property create unauthorized',data:{hasAdminToken:Boolean(token)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return unauthorized()
  }
  try {
    const body = await request.json()
    const {
      title, price, location, type, operation, status, description,
      images, fotocasaUrl, bedrooms, bathrooms, sqMeters, featured,
      availability, hotWater, heating, condition, propertyAge,
      floor, garage, elevator, furnished, energyRating, energyValue,
      emissionsRating, emissionsValue,
    } = body

    if (!title || !price || !location || !type || !description) {
      // #region agent log
      fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H2',location:'src/app/api/propiedades/route.ts:POST:validation',message:'Missing required fields',data:{hasTitle:Boolean(title),hasPrice:Boolean(price),hasLocation:Boolean(location),hasType:Boolean(type),hasDescription:Boolean(description)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const insert = bodyToInsert({
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
      floor,
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

    if (error) {
      // #region agent log
      fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H3',location:'src/app/api/propiedades/route.ts:POST:supabase-error',message:'Supabase insert failed',data:{code:(error as { code?: string }).code ?? null,message:error.message},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      throw error
    }
    // #region agent log
    fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H5',location:'src/app/api/propiedades/route.ts:POST:success',message:'Property created',data:{propertyId:(data as { id?: string } | null)?.id ?? null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json(rowToProperty(data as PropertyRow), { status: 201 })
  } catch (err) {
    // #region agent log
    fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-create',hypothesisId:'H3',location:'src/app/api/propiedades/route.ts:POST:catch',message:'Property create catch',data:{errorMessage:err instanceof Error ? err.message : 'unknown'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
