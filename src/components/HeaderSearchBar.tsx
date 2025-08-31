import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mic, Sparkles } from 'lucide-react'

const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search implementation would go here
  }

  return (
    <div className="relative">
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 w-64">
        <div className="flex items-center px-3 py-2">
          <Search className="w-4 h-4 text-white/60 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search NSUT..."
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVoiceSearch}
            className={`p-1 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Mic className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
      
      {/* Quick suggestions */}
      {showSuggestions && searchQuery === '' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 z-50 w-64"
        >
          <div className="text-white/60 text-xs mb-2">Quick suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {['Library', 'Exams', 'Hostel', 'Faculty', 'Map'].map((suggestion) => (
              <motion.button
                key={suggestion}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSearchQuery(suggestion)}
                className="px-2 py-1 bg-white/10 text-white/80 rounded-lg text-xs hover:bg-white/20 transition-all duration-200"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default HeaderSearchBar
