'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { WriteInput } from './write-input'
import { SpeakIcon } from '../icons/speak-icon'
import { VoiceOutputIcon } from '../icons/voice-output-icon'

interface VoiceInputProps {
  onClose: () => void
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'responding'

interface ChatMessage {
  type: 'user' | 'assistant'
  content: string
}

export function VoiceInput({ onClose }: VoiceInputProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const initialPromptPlayed = useRef(false)

  useEffect(() => {
    if (!initialPromptPlayed.current) {
      const utterance = new SpeechSynthesisUtterance("Tell me, I am listening")
      window.speechSynthesis.speak(utterance)
      initialPromptPlayed.current = true
    }
  }, [])

  const processTranscript = useCallback((text: string) => {
    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', content: text }])

    // Simulate backend processing
    setTimeout(() => {
      const response = `${text} - Added to expenses list`
      setChatMessages(prev => [...prev, { type: 'assistant', content: response }])
      setVoiceState('responding')
      // Speak the response
      const utterance = new SpeechSynthesisUtterance(response)
      window.speechSynthesis.speak(utterance)
      utterance.onend = () => setVoiceState('idle')
    }, 1000)
  }, [])

  const getButtonColor = () => {
    switch (voiceState) {
      case 'listening':
        return 'bg-[#FF5722]'
      case 'processing':
        return 'bg-[#FFC107]'
      case 'responding':
      case 'idle':
      default:
        return 'bg-[#FF9800]'
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative h-full flex flex-col items-center p-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <ArrowLeft size={32} />
        </motion.button>

        {/* Main Voice Button */}
        <motion.button
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`relative w-32 h-32 rounded-full ${getButtonColor()} border-4 border-white 
            flex flex-col items-center justify-center text-white font-semibold mt-16 mb-8`}
        >
          <span className="mb-2">HELLO</span>
          <svg
            width="40"
            height="20"
            viewBox="0 0 40 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-6"
          >
            <path
              d="M8 8C8 8 14 12 20 12C26 12 32 8 32 8"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>

        {/* Voice Status Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="h-12 mb-4"
        >
          {voiceState === 'listening' && (
            <SpeakIcon className="text-white w-12 h-12" />
          )}
          {voiceState === 'responding' && (
            <VoiceOutputIcon className="text-white w-12 h-12" />
          )}
        </motion.div>

        {/* Chat Messages */}
        <div className="w-full max-w-md mb-4 overflow-y-auto flex-1">
          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-2 ${message.type === 'user' ? 'text-left' : 'text-right'}`}
              >
                <span className={`inline-block p-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-[#FF5722] text-white' 
                    : 'bg-[#FFC107] text-black'
                }`}>
                  {message.content}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Write Input */}
        <WriteInput
          onSubmit={processTranscript}
        />
      </div>
    </div>
  )
}

