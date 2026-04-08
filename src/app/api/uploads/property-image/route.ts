import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'

const BUCKET = 'property-images'
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function getExt(file: File): string {
  const byType: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }
  return byType[file.type] || 'jpg'
}

export async function POST(request: NextRequest) {
  const token = getAdminTokenFromRequest(request)
  // #region agent log
  fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-upload',hypothesisId:'H1',location:'src/app/api/uploads/property-image/route.ts:POST:entry',message:'POST /api/uploads/property-image entry',data:{hasAdminToken:Boolean(token)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!verifyAdminSessionToken(token)) {
    // #region agent log
    fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-upload',hypothesisId:'H1',location:'src/app/api/uploads/property-image/route.ts:POST:unauthorized',message:'Image upload unauthorized',data:{hasAdminToken:Boolean(token)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return unauthorized()
  }

  const propertyId = request.nextUrl.searchParams.get('propertyId')?.trim()
  if (!propertyId) return badRequest('Falta propertyId')

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return badRequest('Falta file')
  if (!ALLOWED_TYPES.has(file.type)) return badRequest('Tipo no permitido (jpg/png/webp)')
  if (file.size > MAX_BYTES) return badRequest('La imagen supera 5MB')
  // #region agent log
  fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-upload',hypothesisId:'H4',location:'src/app/api/uploads/property-image/route.ts:POST:file-ok',message:'Upload payload validated',data:{propertyId,fileType:file.type,fileSize:file.size},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  const ext = getExt(file)
  const objectPath = `properties/${propertyId}/${crypto.randomUUID()}.${ext}`

  const supabase = createAdminSupabase()
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, file, { contentType: file.type, upsert: false })

  if (upErr) {
    // #region agent log
    fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-upload',hypothesisId:'H4',location:'src/app/api/uploads/property-image/route.ts:POST:upload-error',message:'Supabase storage upload failed',data:{message:upErr.message},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ error: upErr.message }, { status: 500 })
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath)
  // #region agent log
  fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'property-upload',hypothesisId:'H5',location:'src/app/api/uploads/property-image/route.ts:POST:success',message:'Image uploaded',data:{path:objectPath},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return NextResponse.json({ url: data.publicUrl, path: objectPath })
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = null
  }

  const path = (body as { path?: string } | null)?.path?.trim()
  if (!path) return badRequest('Falta path')

  const supabase = createAdminSupabase()
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

