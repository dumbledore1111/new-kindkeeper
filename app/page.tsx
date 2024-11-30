'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2, Mail, Lock, Google } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [error, setError] = useState('')

  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>()

  // Handle regular email/password login
  const onSubmit = async (data: LoginForm) => {
    try {
      setError('')
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) throw signInError
      router.push('/homepage')
    } catch (error: any) {
      setError(error.message || 'An error occurred during login')
    }
  }

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Error signing in with Google')
    }
  }

  // Handle password reset request
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email') as string

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?reset=true`,
      })
      if (error) throw error
      setResetEmailSent(true)
    } catch (error: any) {
      setError(error.message || 'Error sending reset email')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-orange-500 text-4xl font-bold">KINDKEEPER</h1>
          <p className="text-orange-400/80 text-sm">Voice Powered Personal Finance</p>
        </div>

        <AnimatePresence mode="wait">
          {showResetForm ? (
            // Password Reset Form
            <motion.form
              key="reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handlePasswordReset}
              className="space-y-4"
            >
              {resetEmailSent ? (
                <div className="bg-green-500/10 text-green-500 p-3 rounded text-center">
                  Check your email for reset instructions
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" size={20} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded bg-orange-500 text-black 
                          placeholder-black/70 font-medium focus:outline-none focus:ring-2 
                          focus:ring-orange-600"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 rounded bg-orange-400 text-black font-medium 
                      hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  >
                    Send Reset Instructions
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="w-full px-4 py-3 rounded border-2 border-orange-500 text-orange-500 
                  font-medium hover:bg-orange-500/10"
              >
                Back to Login
              </button>
            </motion.form>
          ) : (
            // Main Login Form
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" size={20} />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder="EMAIL"
                    className="w-full pl-10 pr-4 py-3 rounded bg-orange-500 text-black 
                      placeholder-black/70 font-medium focus:outline-none focus:ring-2 
                      focus:ring-orange-600"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" size={20} />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    type="password"
                    placeholder="PASSWORD"
                    className="w-full pl-10 pr-4 py-3 rounded bg-orange-500 text-black 
                      placeholder-black/70 font-medium focus:outline-none focus:ring-2 
                      focus:ring-orange-600"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 text-red-500 p-3 rounded text-center text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded bg-orange-400 text-black font-medium 
                  hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    SIGNING IN...
                  </>
                ) : (
                  'ON'
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-orange-500/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-orange-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full px-4 py-3 rounded bg-white text-black font-medium 
                  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-600
                  flex items-center justify-center gap-2"
              >
                <Google size={20} />
                Google
              </button>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="w-full px-4 py-3 rounded border-2 border-orange-500 text-orange-500 
                    font-medium hover:bg-orange-500/10"
                >
                  CREATE ACCOUNT
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowResetForm(true)}
                  className="text-orange-500/80 hover:text-orange-500 text-sm"
                >
                  Forgot your password?
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}