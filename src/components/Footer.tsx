import { motion } from 'framer-motion'
import { Sparkles, Heart, Calendar, Coffee, Phone, Users, Building, Clock, GraduationCap, Heart as MedicalIcon, UserCheck, MapPin, BookOpen } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Event Board', href: '/events', icon: Calendar },
    { name: 'Medical Services', href: '/medical', icon: MedicalIcon },
    { name: 'Faculty Directory', href: '/faculty', icon: Users },
    { name: 'Hostel Information', href: '/hostels', icon: Building },
    { name: 'PhoneBook', href: '/phonebook', icon: Phone },
    { name: 'Societies & Clubs', href: '/societies', icon: Users },
    { name: 'CR Contacts', href: '/cr-contacts', icon: UserCheck },
    { name: 'Timetable Manager', href: '/timetable', icon: Clock },
    { name: 'Canteen Services', href: '#', icon: Coffee, comingSoon: true },
    { name: 'Study Hub', href: '#', icon: BookOpen, comingSoon: true },
    { name: 'Campus Navigation', href: '#', icon: MapPin, comingSoon: true },
    { name: 'Senior Guidance', href: '#', icon: GraduationCap, comingSoon: true }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-gold-400" />
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-lg"></div>
              </div>
              <span className="text-2xl font-bold text-white">Campus Genie</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your magical companion for campus life at NSUT. From finding events to managing schedules, 
              we've got everything to make your university experience seamless and enjoyable.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for NSUT Students
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.comingSoon ? '#' : link.href}
                  onClick={(e) => {
                    if (link.comingSoon) {
                      e.preventDefault()
                      return
                    }
                    if (!link.href.startsWith('#')) {
                      e.preventDefault()
                      window.open(link.href, '_blank')
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center space-x-2 text-sm p-2 rounded-lg transition-all duration-200 ${
                    link.comingSoon 
                      ? 'text-gray-500 cursor-default' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-xs">{link.name}</span>
                  {link.comingSoon && (
                    <span className="text-xs bg-gray-700 text-gray-400 px-1 py-0.5 rounded">Soon</span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="space-y-2">
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Contact Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Support
              </a>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs">
                © 2025 Campus Genie. All Rights Reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Netaji Subhas University of Technology
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer