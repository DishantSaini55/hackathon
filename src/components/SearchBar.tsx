import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mic, Sparkles } from 'lucide-react'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search implementation would go here
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4"
    >
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center p-4">
            <Search className="w-5 h-5 text-white/60 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask Genie anything about NSUT campus..."
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceSearch}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 p-2 bg-gradient-to-r from-genie-500 to-magic-500 text-white rounded-xl hover:from-genie-600 hover:to-magic-600 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Quick suggestions */}
        {searchQuery === '' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4"
          >
            <div className="text-white/60 text-sm mb-2">Quick suggestions:</div>
            <div className="flex flex-wrap gap-2">
              {['Library hours', 'Exam schedule', 'Hostel info', 'Faculty contacts', 'Campus map'].map((suggestion) => (
                <motion.button
                  key={suggestion}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-white/10 text-white/80 rounded-lg text-sm hover:bg-white/20 transition-all duration-200"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar