import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })
    
    // Exchange the auth code for a session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to the home page after sign in
  return NextResponse.redirect(new URL('/homepage', request.url))
}