'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface WriteInputProps {
  onSubmit: (text: string) => void
}

export function WriteInput({ onSubmit }: WriteInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text)
      setText('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l-full bg-[#FFC107] text-black placeholder-black/70 border-none focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />
        <button
          type="submit"
          className="p-2 rounded-r-full bg-[#FF5722] text-white hover:bg-[#F4511E] focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  )
}

