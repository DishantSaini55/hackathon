import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Stars, Zap } from 'lucide-react'

const ScratchGenie = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratched, setIsScratched] = useState(false)
  const [scratchPercentage, setScratchPercentage] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Create scratch surface
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add texture to scratch surface
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200)
    gradient.addColorStop(0, '#334155')
    gradient.addColorStop(1, '#0f172a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some sparkles to the scratch surface
    ctx.fillStyle = '#fbbf24'
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Set up scratch effect
    ctx.globalCompositeOperation = 'destination-out'
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    scratch(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    scratch(e)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    checkScratchComplete()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    const touch = e.touches[0]
    const target = e.target as HTMLCanvasElement
    const rect = target.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    scratchAt(x, y)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    e.preventDefault()
    const touch = e.touches[0]
    const target = e.target as HTMLCanvasElement
    const rect = target.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    scratchAt(x, y)
  }

  const handleTouchEnd = () => {
    setIsDrawing(false)
    checkScratchComplete()
  }

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    scratchAt(x, y)
  }

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkScratchComplete = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    let transparentPixels = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++
    }

    const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100
    setScratchPercentage(percentage)

    if (percentage > 40) {
      setIsScratched(true)
      // Clear the entire canvas to reveal the genie
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }, 500)
    }
  }

  return (
    <div className="relative w-fit mx-auto">
      {/* Magic particles background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Genie Container */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8 rounded-2xl shadow-2xl border border-gold-400/20">
        
        {/* Scratch instruction */}
        {!isScratched && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gold-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/40"
          >
            <div className="flex items-center gap-2 text-gold-200 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Scratch to reveal the Campus Genie!
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>
        )}

        {/* Genie Image (Behind Canvas) */}
        <div className="relative w-96 h-96">
          {/* Modern Genie Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isScratched ? 1.05 : 0.8, 
              opacity: isScratched ? 1 : 0.3,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Genie Illustration */}
            <div className="relative">
              {/* Magic Lamp */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 right-8 w-16 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-bl-full rounded-br-full"
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
              </motion.div>

              {/* Scroll */}
              <div className="w-32 h-48 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-lg border-4 border-amber-600 relative">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-amber-600 rounded-full"></div>
                <div className="absolute -left-2 bottom-4 w-4 h-4 bg-amber-600 rounded-full"></div>
                <div className="absolute -right-2 top-4 w-4 h-4 bg-amber-600 rounded-full"></div>
                <div className="absolute -right-2 bottom-4 w-4 h-4 bg-amber-600 rounded-full"></div>
                
                {/* Scroll content */}
                <div className="p-4 text-center">
                  <div className="text-amber-900 text-xs font-semibold mb-2">NSUT Campus Guide</div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-amber-600 rounded"></div>
                    <div className="w-3/4 h-1 bg-amber-500 rounded"></div>
                    <div className="w-full h-1 bg-amber-600 rounded"></div>
                    <div className="w-1/2 h-1 bg-amber-500 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Genie Character */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-24 w-48 h-48"
              >
                {/* Genie Body */}
                <div className="relative w-full h-full">
                  {/* Smoke/Magic trail */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-gradient-to-t from-purple-600/60 to-transparent rounded-full blur-sm"
                  ></motion.div>

                  {/* Genie body */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-full">
                    {/* Arms */}
                    <div className="absolute top-8 -left-6 w-6 h-16 bg-blue-500 rounded-full rotate-12"></div>
                    <div className="absolute top-8 -right-6 w-6 h-16 bg-blue-500 rounded-full -rotate-12"></div>
                    
                    {/* Vest */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-red-500 to-red-700 rounded-lg">
                      <div className="absolute inset-1 border border-gold-400 rounded-lg"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Head */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-500 rounded-full">
                    {/* Eyes */}
                    <div className="absolute top-4 left-3 w-3 h-3 bg-white rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full animate-blink"></div>
                    </div>
                    <div className="absolute top-4 right-3 w-3 h-3 bg-white rounded-full">
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-black rounded-full animate-blink"></div>
                    </div>
                    
                    {/* Smile */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-white rounded-full"></div>
                  </div>

                  {/* Turban */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-t-full">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gold-400 rounded-full animate-pulse"></div>
                    <div className="absolute -right-2 top-1 w-8 h-4 bg-purple-700 rounded-full transform rotate-45"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating magic elements */}
              {isScratched && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0],
                        y: [-10, -30, -50],
                        x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                      className="absolute"
                      style={{
                        top: `${60 + Math.random() * 40}%`,
                        left: `${30 + Math.random() * 40}%`,
                      }}
                    >
                      {i % 3 === 0 ? (
                        <Stars className="w-4 h-4 text-gold-400" />
                      ) : i % 3 === 1 ? (
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Zap className="w-4 h-4 text-blue-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Scratch Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`absolute inset-0 cursor-pointer transition-opacity duration-500 rounded-2xl ${
              isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ 
              width: '100%', 
              height: '100%',
              background: isScratched ? 'transparent' : undefined
            }}
          />
        </div>

        {/* Progress indicator */}
        {!isScratched && scratchPercentage > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full"
          >
            <div className="text-white/80 text-xs">
              {Math.round(scratchPercentage)}% revealed
            </div>
          </motion.div>
        )}

        {/* Success message removed */}
      </div>
    </div>
  )
}

export default ScratchGenie
