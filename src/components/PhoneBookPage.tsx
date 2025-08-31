import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Search, 
  Mail, 
  MapPin, 
  Clock,
  Building
} from 'lucide-react'

interface Contact {
  id: number
  name: string
  category: string
  phone: string
  email?: string
  department?: string
  location?: string
  hours?: string
  description: string
}

const PhoneBookPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Main Reception",
      category: "Administration",
      phone: "+91-11-25000010",
      email: "info@nsut.ac.in",
      department: "Main Office",
      location: "Administrative Block",
      hours: "9:00 AM - 5:00 PM",
      description: "General inquiries and visitor information"
    },
    {
      id: 2,
      name: "Admissions Office",
      category: "Admissions",
      phone: "+91-11-25000020",
      email: "admissions@nsut.ac.in",
      department: "Admissions",
      location: "Administrative Block",
      hours: "9:00 AM - 5:00 PM",
      description: "Undergraduate and postgraduate admissions"
    },
    {
      id: 3,
      name: "Academic Section",
      category: "Academics",
      phone: "+91-11-25000030",
      email: "academics@nsut.ac.in",
      department: "Academic Affairs",
      location: "Administrative Block",
      hours: "9:00 AM - 5:00 PM",
      description: "Academic records, transcripts, and certificates"
    },
    {
      id: 4,
      name: "Student Welfare",
      category: "Student Services",
      phone: "+91-11-25000040",
      email: "welfare@nsut.ac.in",
      department: "Student Affairs",
      location: "Student Activity Center",
      hours: "10:00 AM - 4:00 PM",
      description: "Student support, counseling, and welfare services"
    },
    {
      id: 5,
      name: "Security Office",
      category: "Security",
      phone: "+91-11-25000050",
      department: "Security",
      location: "Main Gate",
      hours: "24/7",
      description: "Campus security and emergency services"
    },
    {
      id: 6,
      name: "Medical Center",
      category: "Medical",
      phone: "+91-11-25000060",
      email: "medical@nsut.ac.in",
      department: "Health Services",
      location: "Medical Block",
      hours: "9:00 AM - 6:00 PM",
      description: "Medical consultations and health services"
    },
    {
      id: 7,
      name: "Library",
      category: "Library",
      phone: "+91-11-25000070",
      email: "library@nsut.ac.in",
      department: "Library Services",
      location: "Central Library",
      hours: "8:00 AM - 10:00 PM",
      description: "Library services, book issues, and research assistance"
    },
    {
      id: 8,
      name: "Placement Cell",
      category: "Placement",
      phone: "+91-11-25000080",
      email: "placements@nsut.ac.in",
      department: "Training & Placement",
      location: "T&P Block",
      hours: "9:00 AM - 5:00 PM",
      description: "Job placements, internships, and career guidance"
    }
  ]

  const categories = ['All', 'Administration', 'Admissions', 'Academics', 'Student Services', 'Security', 'Medical', 'Library', 'Placement']

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.department?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || contact.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 py-16 lg:py-24">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="tracking-tighter text-white font-sans text-5xl sm:text-6xl md:text-7xl mb-6">
                Phone{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Directory
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Find contact information for all campus departments, services, and important numbers. Your complete directory for university contacts.
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-black text-white">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 p-6"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Contact Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 text-white">
                          {contact.category}
                        </span>
                      </div>
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Phone className="w-4 h-4 mr-3 text-cyan-400" />
                        <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                      
                      {contact.email && (
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-3 text-purple-400" />
                          <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                            {contact.email}
                          </a>
                        </div>
                      )}
                      
                      {contact.location && (
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-3 text-amber-400" />
                          <span>{contact.location}</span>
                        </div>
                      )}
                      
                      {contact.hours && (
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-3 text-green-400" />
                          <span>{contact.hours}</span>
                        </div>
                      )}
                      
                      {contact.department && (
                        <div className="flex items-center text-gray-300">
                          <Building className="w-4 h-4 mr-3 text-blue-400" />
                          <span>{contact.department}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm">{contact.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredContacts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">No contacts found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Emergency Section */}
        <section className="py-16 border-t border-white/10">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="tracking-tighter text-white font-sans text-3xl font-bold mb-4">
                Emergency Contacts
              </h2>
              <p className="text-gray-400">Important numbers for emergency situations</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Campus Security</h3>
                <p className="text-red-300 text-2xl font-bold">+91-11-25000050</p>
                <p className="text-gray-400 text-sm mt-2">24/7 Emergency Response</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Medical Emergency</h3>
                <p className="text-blue-300 text-2xl font-bold">+91-11-25000060</p>
                <p className="text-gray-400 text-sm mt-2">Health Services</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Student Helpline</h3>
                <p className="text-green-300 text-2xl font-bold">+91-11-25000040</p>
                <p className="text-gray-400 text-sm mt-2">Student Support</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PhoneBookPage
