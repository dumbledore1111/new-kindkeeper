'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookPage } from '@/components/book-page'
import { ProfilePage } from '@/components/profile-page'
import { VoiceInput } from '@/components/voice-input/voice-input'

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [showBook, setShowBook] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showVoiceInput, setShowVoiceInput] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleHomeClick = () => {
    if (showBook || showProfile) {
      setShowBook(false)
      setShowProfile(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      <main 
        className="min-h-screen w-full flex items-center justify-center"
        onClick={handleHomeClick}
      >
        <div 
          className={`relative ${isMobile ? 'w-full h-full' : 'w-[800px] h-[400px] rounded-[32px]'} 
            bg-black flex items-center justify-center`}
        >
          {/* Book Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowBook(true)
            }}
            className={`absolute ${
              isMobile ? 'bottom-12 left-8' : 'left-12'
            } w-20 h-20 rounded-full bg-[#FF5722] flex items-center justify-center
            text-white font-semibold hover:opacity-90 transition-opacity`}
          >
            BOOK
          </motion.button>

          {/* Hello Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowVoiceInput(true)
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-32 h-32 rounded-full bg-[#FF9800] border-4 border-white 
              flex flex-col items-center justify-center text-white font-semibold"
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

          {/* Name Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowProfile(true)
            }}
            className={`absolute ${
              isMobile ? 'top-8 right-8' : 'right-12'
            } w-20 h-20 rounded-full bg-[#FFC107] flex items-center justify-center
            text-black font-semibold hover:opacity-90 transition-opacity`}
          >
            NAME
          </motion.button>
        </div>
      </main>

      {/* Sliding Pages */}
      <AnimatePresence>
        {showBook && (
          <BookPage isMobile={isMobile} />
        )}
        {showProfile && (
          <ProfilePage isMobile={isMobile} />
        )}
        {showVoiceInput && (
          <VoiceInput onClose={() => setShowVoiceInput(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

