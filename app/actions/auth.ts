'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthError } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { 
        success: false, 
        error: error.message 
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { 
      success: false, 
      error: 'An error occurred during login' 
    }
  }
}

export async function signup(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    // First, sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone
        }
      }
    })

    if (signUpError) {
      return { 
        success: false, 
        error: signUpError.message 
      }
    }

    // Then create a profile in the profiles table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: name,
            email: email,
            phone: phone
          }
        ])

      if (profileError) {
        console.error('Error creating profile:', profileError)
        return { 
          success: false, 
          error: 'Error creating user profile' 
        }
      }
    }

    return { 
      success: true,
      message: 'Please check your email for verification' 
    }
  } catch (error) {
    console.error('Signup error:', error)
    return { 
      success: false, 
      error: 'An error occurred during signup' 
    }
  }
}

export async function signOut() {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { 
        success: false, 
        error: error.message 
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Signout error:', error)
    return { 
      success: false, 
      error: 'An error occurred during sign out' 
    }
  }
}

// Helper function to get current session
export async function getSession() {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      throw error
    }

    return session
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}

// Helper function to check if user is authenticated
export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }
  
  return {
    success: true,
    user: session.user
  }
}