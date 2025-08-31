import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Instagram, Linkedin } from 'lucide-react'

const Contact = () => {
  const [activeTab, setActiveTab] = useState('query')
  const [formData, setFormData] = useState({
    type: 'query',
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setFormData({
      ...formData,
      type: tab
    })
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-black relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-15"></div>
      
      {/* Stars effect */}
      {[...Array(50)].map((_, i) => (
        <div 
          key={`star-${i}`}
          className="absolute rounded-full bg-white" 
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8,
            animation: `twinkle ${Math.floor(Math.random() * 3 + 2)}s infinite ${Math.random() * 2}s ease-in-out`
          }}
        />
      ))}

      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="tracking-tighter text-white font-sans text-4xl sm:text-5xl md:text-6xl mb-6">
            Have questions, feedback, or{' '}
            <span className="block font-serif text-5xl sm:text-6xl md:text-7xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              suggestions?
            </span>
          </h2>
          <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Type Selection */}
                <div className="flex space-x-2 mb-6 border-b border-white/20">
                  {[
                    { value: 'query', label: 'Ask a Query' },
                    { value: 'feedback', label: 'Leave a Feedback' },
                    { value: 'bug', label: 'Report a Bug' }
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTabChange(option.value)}
                      className={`py-3 px-4 font-medium relative transition-all duration-300 ${
                        formData.type === option.value 
                          ? 'text-cyan-400 font-semibold' 
                          : 'text-gray-400 hover:text-cyan-300'
                      }`}
                    >
                      {formData.type === option.value && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"></span>
                      )}
                      {option.label}
                    </motion.button>
                  ))}
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-400"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 resize-none text-white placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8 mb-8 group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="tracking-tighter text-white font-sans text-2xl font-bold mb-6 drop-shadow-md">
                  Contact{' '}
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
                    Information
                  </span>
                </h3>
                
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start"
                  >
                    <div className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full p-3 mr-4">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white drop-shadow-md">Email</h4>
                      <p className="text-gray-300">nsutgenie@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start"
                  >
                    <div className="bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full p-3 mr-4">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white drop-shadow-md">Address</h4>
                      <p className="text-gray-300">NSUT, Sector 3, Dwarka,<br />New Delhi - 110078</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start"
                  >
                    <div className="bg-amber-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full p-3 mr-4">
                      <Phone className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white drop-shadow-md">Phone</h4>
                      <p className="text-gray-300">+91 11 2590 7000</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8 group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="tracking-tighter text-white font-sans text-xl font-bold mb-2 drop-shadow-md">
                    Connect with{' '}
                    <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                      us
                    </span>
                  </h3>
                  <p className="text-gray-300">Follow us for updates and announcements</p>
                </div>

                <div className="flex space-x-4 mb-6">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 backdrop-blur-xl border border-pink-400/30 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <Instagram className="w-6 h-6 text-pink-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 backdrop-blur-xl border border-blue-400/30 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact