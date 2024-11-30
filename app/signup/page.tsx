'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signup } from '../actions/auth'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await signup(formData)
    if (result.success) {
      router.push('/homepage')
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-orange-500 text-3xl font-bold">KINDKEEPER</h1>
        </div>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              required
              className="w-full px-4 py-3 rounded bg-orange-500 text-black placeholder-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className="w-full px-4 py-3 rounded bg-orange-500 text-black placeholder-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="PHONE NUMBER"
              required
              className="w-full px-4 py-3 rounded bg-orange-500 text-black placeholder-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              required
              className="w-full px-4 py-3 rounded bg-orange-500 text-black placeholder-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              required
              className="w-full px-4 py-3 rounded bg-orange-500 text-black placeholder-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="button"
            onClick={() => handleSubmit(new FormData())}
            className="w-full px-4 py-3 rounded bg-orange-400 text-black font-medium hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            ENTER
          </button>
        </form>
        <button
          onClick={() => router.push('/')}
          className="w-full px-4 py-3 rounded border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          ALREADY HAVE ACCOUNT
        </button>
      </div>
    </div>
  )
}

