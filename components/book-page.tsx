'use client'

import { motion } from 'framer-motion'

interface BookPageProps {
  isMobile: boolean
}

export function BookPage({ isMobile }: BookPageProps) {
  const categories = [
    'REMIND ME',
    'MILK MAN',
    'MAID',
    'PURCHASES',
    'PHONE/ELECTRICITY',
    'INCOME/EXPENSE STATEMENT',
  ]

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-y-0 left-0 ${isMobile ? 'w-4/5' : 'w-3/5'} bg-[#FF5722] z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-screen flex flex-col p-6">
        <h2 className="text-3xl font-bold text-black mb-6">Log Book</h2>
        <div className="flex-1 grid gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              className="w-full p-4 bg-white rounded-lg text-left font-semibold text-black text-lg hover:bg-opacity-90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

