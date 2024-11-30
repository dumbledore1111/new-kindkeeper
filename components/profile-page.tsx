'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConfirmationModal } from './confirmation-modal'
import { SettingsPage } from './settings-page'
import { useRouter } from 'next/navigation'

interface ProfilePageProps {
  isMobile: boolean
}

export function ProfilePage({ isMobile }: ProfilePageProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const router = useRouter()

  const fields = [
    { label: 'USER NAME', value: 'John Doe' },
    { label: 'EMAIL', value: 'john@example.com' },
    { label: 'PHONE NUMBER', value: '+1 234 567 8900' },
    { label: 'EMERGENCY CONTACT NUMBER', value: '+1 234 567 8901' },
    { label: 'LINK FAMILY', value: 'Connected' },
    { label: 'LINK BANK ACCOUNT', value: 'Connected' },
  ]

  const handleSwitchOff = () => {
    setIsConfirmationOpen(true)
  }

  const handleConfirmSwitchOff = () => {
    router.push('/login')
  }

  const handleOpenSettings = () => {
    setIsSettingsOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobile ? '0%' : '40%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 right-0 ${isMobile ? 'w-4/5' : 'w-3/5'} bg-[#FFC107] z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-screen flex flex-col p-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl font-bold">JD</span>
          </div>
          
          <div className="flex-1 grid gap-4">
            {fields.map((field) => (
              <div key={field.label}>
                <label className="text-base font-bold block mb-1">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full p-3 rounded-lg border border-gray-300 text-lg"
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-3 mt-4">
            <button
              onClick={handleOpenSettings}
              className="w-full p-4 bg-black text-white rounded-lg font-bold text-lg text-center"
            >
              SETTINGS
            </button>
            <button
              onClick={handleSwitchOff}
              className="w-full p-4 bg-black text-white rounded-lg font-bold text-lg text-center mb-2"
            >
              SWITCH OFF
            </button>
          </div>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmSwitchOff}
      />

      {isSettingsOpen && (
        <SettingsPage onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  )
}

