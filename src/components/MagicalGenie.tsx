import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Stars, Zap, Wind } from 'lucide-react'

const MagicalGenie = () => {
  return (
    <div className="relative w-fit mx-auto">
      {/* Magic wind particles background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {/* Intense Wind/Air flow effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`wind-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            style={{
              width: `${60 + Math.random() * 80}px`,
              height: `${3 + Math.random() * 6}px`,
              top: `${Math.random() * 100}%`,
              left: `-20%`,
              rotate: `${Math.random() * 20 - 10}deg`,
            }}
            animate={{
              x: [0, window.innerWidth || 800],
              opacity: [0, 0.8, 0.5, 0],
              scaleX: [0.5, 1.5, 1.2, 0.3],
              y: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Swirling air vortex */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`vortex-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-t from-cyan-400/20 via-white/60 to-transparent rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: 'bottom center',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1.2, 0.8],
              opacity: [0.3, 0.8, 0.4],
            }}
            transition={{
              rotate: { duration: 3 + i * 0.2, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
            }}
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 24}deg) translateY(-${60 + i * 10}px)`,
            }}
          />
        ))}

        {/* Floating magical dust particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `hsl(${180 + Math.random() * 60}, 70%, 80%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-20, 20, -20],
              opacity: [0, 1, 0.5, 0],
              scale: [0, 1.5, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Magical energy streams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute bg-gradient-to-r from-blue-400/30 via-purple-400/50 to-gold-400/30 rounded-full"
            style={{
              width: '200px',
              height: '2px',
              top: `${20 + i * 10}%`,
              left: '-200px',
              transform: `rotate(${i * 5}deg)`,
            }}
            animate={{
              x: [0, 600],
              opacity: [0, 0.8, 0.6, 0],
              scaleY: [1, 3, 2, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Genie Container */}
      <div className="relative bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-blue-900/50 p-8 rounded-2xl shadow-2xl border border-gold-400/30 backdrop-blur-sm">
        
        {/* Floating magical icons around the genie */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Floating magic elements */}
          <motion.div
            className="absolute -top-8 -left-8 p-3 bg-gradient-to-br from-gold-400/20 to-gold-600/20 backdrop-blur-sm rounded-xl border border-gold-400/40"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-gold-400" />
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -right-12 p-3 bg-gradient-to-br from-purple-400/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-400/40"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Stars className="w-6 h-6 text-purple-400" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 -right-8 p-3 bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-400/40"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Zap className="w-6 h-6 text-blue-400" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-12 p-3 bg-gradient-to-br from-teal-400/20 to-teal-600/20 backdrop-blur-sm rounded-xl border border-teal-400/40"
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <Wind className="w-6 h-6 text-teal-400" />
          </motion.div>
        </motion.div>

        {/* Genie Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [-8, 8, -8],
          }}
          transition={{ 
            opacity: { duration: 1, ease: "easeOut" },
            scale: { duration: 1, ease: "easeOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-96 h-96 flex items-center justify-center"
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-gold-400/30 rounded-2xl blur-2xl animate-pulse"></div>
          
          {/* Air/Wind effect around genie */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`air-${i}`}
                className="absolute bg-gradient-to-r from-transparent via-cyan-300/60 via-white/80 to-transparent rounded-full"
                style={{
                  width: `${100 + i * 20}px`,
                  height: '3px',
                  top: '50%',
                  left: '50%',
                  transformOrigin: 'left center',
                  transform: `rotate(${i * 30}deg) translateX(${120 + i * 15}px)`,
                }}
                animate={{
                  scaleX: [0.3, 2, 1.5, 0.5],
                  opacity: [0.2, 0.9, 0.6, 0.3],
                  scaleY: [1, 3, 2, 1],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Spiral wind effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spiral-${i}`}
                className="absolute w-32 h-1 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: 'left center',
                  transform: `rotate(${i * 45}deg) translateX(${80 + i * 25}px)`,
                }}
                animate={{
                  scaleX: [0.5, 2.5, 1.8, 0.7],
                  opacity: [0.4, 1, 0.7, 0.4],
                  y: [0, -10, 5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Tornado-like effect */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`tornado-${i}`}
                className="absolute border-2 border-white/40 rounded-full"
                style={{
                  width: `${150 + i * 50}px`,
                  height: `${150 + i * 50}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [0.8, 1.4, 1.1, 0.9],
                  opacity: [0.1, 0.5, 0.3, 0.1],
                  borderWidth: [1, 4, 2, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Your Genie Image */}
          <motion.img
            src="/image.png"
            alt="NSUT Campus Genie"
            className="relative z-10 w-full h-full object-contain animate-pulse-glow"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              filter: [
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) hue-rotate(0deg)',
                'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5)) hue-rotate(60deg)',
                'drop-shadow(0 0 25px rgba(251, 191, 36, 0.5)) hue-rotate(120deg)',
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) hue-rotate(180deg)',
              ]
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 1.5, ease: "easeOut" },
              rotate: { duration: 1.5, ease: "easeOut" },
              filter: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          />

          {/* Magical aura around genie */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: 360,
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0 border-2 border-gold-400/40 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(251, 191, 36, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)',
            }}
          />
        </motion.div>

        {/* Floating magical particles inside container */}
        <div className="absolute inset-4 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`inner-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 6}px`,
                height: `${3 + Math.random() * 6}px`,
                background: `hsl(${180 + i * 15}, 80%, 70%)`,
                top: `${10 + (i * 80) % 80}%`,
                left: `${10 + (i * 70) % 80}%`,
              }}
              animate={{
                y: [-25, 25, -25],
                x: [-15, 15, -15],
                opacity: [0.3, 1, 0.6, 0.3],
                scale: [0.3, 1.5, 1, 0.5],
                rotate: [0, 360, 180, 0],
              }}
              transition={{
                duration: 3 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Magical wind trails */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`wind-trail-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent rounded-full"
              style={{
                width: `${80 + i * 20}px`,
                height: '2px',
                top: `${20 + i * 8}%`,
                left: '0%',
              }}
              animate={{
                x: [-100, 400, -100],
                opacity: [0, 0.8, 0.5, 0],
                scaleY: [1, 4, 2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Magic energy waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute inset-0 border border-white/20 rounded-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className="mt-8 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 rounded-full shadow-xl inline-block"
        >
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <Sparkles className="w-6 h-6" />
            Welcome to NSUT Campus Genie!
            <Sparkles className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MagicalGenie
