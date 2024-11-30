'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Sun, Moon } from 'lucide-react'

interface SettingsPageProps {
  onClose: () => void
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const [fontSize, setFontSize] = useState(16)
  const [volume, setVolume] = useState(50)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-y-0 right-0 w-3/5 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} z-50`}
    >
      <div className="h-screen flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-8">Settings</h2>
        
        <div className="space-y-8">
          <div>
            <label htmlFor="font-size" className="block text-xl mb-2">Font Size</label>
            <input
              type="range"
              id="font-size"
              min="12"
              max="24"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="w-full"
            />
            <p className="mt-2" style={{ fontSize: `${fontSize}px` }}>Sample Text</p>
          </div>

          <div>
            <label htmlFor="volume" className="block text-xl mb-2">Volume</label>
            <div className="flex items-center">
              <Volume2 size={24} />
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full ml-2"
              />
            </div>
          </div>

          <div>
            <p className="text-xl mb-2">Theme</p>
            <button
              onClick={toggleDarkMode}
              className={`flex items-center justify-center w-16 h-8 rounded-full ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-white shadow-md"
                animate={{ x: isDarkMode ? 16 : 0 }}
              />
              {isDarkMode ? <Moon className="ml-1" size={16} /> : <Sun className="mr-1" size={16} />}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`mt-auto p-3 ${
            isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
          } rounded-md font-semibold text-center hover:opacity-90 transition-colors`}
        >
          Close Settings
        </button>
      </div>
    </motion.div>
  )
}

