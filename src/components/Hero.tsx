import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import MagicalGenie from './MagicalGenie'

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section id="home" className="py-16 lg:py-24 bg-black relative overflow-hidden min-h-screen flex items-center">
      {/* Floating gradient blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-15"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-fuchsia-500 rounded-full blur-3xl opacity-10"></div>

      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tracking-tighter text-white font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              NSUT{' '}
              <span className="block font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Campus Genie
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-lg mb-8"
            >
              Your complete guide to NSUT's campus. Access maps, resources, events, and connect with fellow students all in one AI-powered platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('features')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-white font-semibold shadow-2xl transition-all duration-300 hover:shadow-cyan-500/25"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('map')}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-8 py-4 text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Explore Features
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-white/60 text-sm">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">2+</div>
                <div className="text-white/60 text-sm">Campus Locations</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-white/60 text-sm">AI Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Magical Genie Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8 group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative z-10">
                <MagicalGenie />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero