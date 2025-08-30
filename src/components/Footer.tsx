import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 mb-4 md:mb-0"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-gold-400" />
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-lg"></div>
              </div>
              <span className="text-xl font-bold text-white">Genie</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Genie | All Rights Reserved
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Terms of Service
            </a>
            <div className="flex items-center text-gray-400 text-sm">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for NSUT
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer