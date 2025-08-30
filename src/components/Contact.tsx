import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Instagram, Linkedin } from 'lucide-react'

const Contact = () => {
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

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Type Selection */}
              <div className="flex space-x-4 mb-6">
                {[
                  { value: 'query', label: 'Ask a Query' },
                  { value: 'feedback', label: 'Leave a Feedback' },
                  { value: 'bug', label: 'Report a Bug' }
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={formData.type === option.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.type === option.value
                        ? 'border-genie-500 bg-genie-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.type === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option.label}</span>
                  </motion.label>
                ))}
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-genie-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-genie-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-genie-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-genie-500/20 to-magic-500/20 rounded-3xl blur-3xl"></div>
            
            <div className="relative">
              {/* Contact Information */}
              <div className="card p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-genie-100 rounded-xl mr-4">
                      <Mail className="w-6 h-6 text-genie-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">nsutgenie@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-genie-100 rounded-xl mr-4">
                      <MapPin className="w-6 h-6 text-genie-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">NSUT, Sector 3, Dwarka,<br />New Delhi - 110078</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-genie-100 rounded-xl mr-4">
                      <Phone className="w-6 h-6 text-genie-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 11 2590 7000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connect with us</h3>
                    <p className="text-gray-300">Follow us for updates and announcements</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Subscribe to news</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-genie-500 to-magic-500 hover:from-genie-600 hover:to-magic-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      Subscribe to news
                    </motion.button>
                  </div>
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