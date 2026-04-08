import { createClient } from '@supabase/supabase-js'

export function createAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  // #region agent log
  fetch('http://127.0.0.1:7741/ingest/efd49a79-f09f-4d7e-bc0e-6b1124b29184',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'55e489'},body:JSON.stringify({sessionId:'55e489',runId:'supabase-admin',hypothesisId:'H3',location:'src/lib/supabase/admin.ts:createAdminSupabase',message:'Checking admin supabase env presence',data:{hasUrl:Boolean(url),hasServiceRoleKey:Boolean(key)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
