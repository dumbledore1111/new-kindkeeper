'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface VoiceInputProps {
  onClose: () => void
}

export function VoiceInput({ onClose }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  // Mock voice recognition - replace with actual implementation
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript('Voice input captured...')
        setIsListening(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isListening])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-4">
          <motion.button
            animate={{
              scale: isListening ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isListening ? Infinity : 0,
            }}
            onClick={() => setIsListening(!isListening)}
            className="w-24 h-24 rounded-full bg-[#FF9800] flex items-center justify-center
              text-white font-semibold mx-auto"
          >
            {isListening ? 'Listening...' : 'Start'}
          </motion.button>
          {transcript && (
            <p className="text-gray-700">{transcript}</p>
          )}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  )
}

