import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building, 
  Phone, 
  Mail, 
  User,
  X,
  Home,
  Shield,
  Clock,
  MapPin
} from 'lucide-react'

interface HostelInfo {
  id: number
  name: string
  type: string
  warden: string
  initials: string
  email: string
  contact: string
  office: string
  capacity: string
  description?: string
}

const HostelInformation = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedHostel, setSelectedHostel] = useState<HostelInfo | null>(null)

  const hostelInfo: HostelInfo[] = [
    {
      id: 1,
      name: "Boys Hostel Block A",
      type: "Boys Hostel",
      warden: "Dr. Rajesh Kumar",
      initials: "BHA",
      email: "warden.bhA@nsut.ac.in",
      contact: "011-25000212",
      office: "Ground Floor, Block A",
      capacity: "200 Students",
      description: "Modern accommodation facility for male students with all essential amenities and 24/7 security."
    },
    {
      id: 2,
      name: "Boys Hostel Block B",
      type: "Boys Hostel",
      warden: "Prof. Suresh Singh",
      initials: "BHB",
      email: "warden.bhB@nsut.ac.in",
      contact: "011-25000212",
      office: "Ground Floor, Block B",
      capacity: "250 Students",
      description: "Well-equipped hostel facility with modern infrastructure and recreational facilities."
    },
    {
      id: 3,
      name: "Girls Hostel Block A",
      type: "Girls Hostel",
      warden: "Dr. Priya Sharma",
      initials: "GHA",
      email: "warden.ghA@nsut.ac.in",
      contact: "011-25000212",
      office: "Ground Floor, Block A",
      capacity: "180 Students",
      description: "Safe and secure accommodation for female students with dedicated facilities and support."
    },
    {
      id: 4,
      name: "Girls Hostel Block B",
      type: "Girls Hostel",
      warden: "Prof. Meena Gupta",
      initials: "GHB",
      email: "warden.ghB@nsut.ac.in",
      contact: "011-25000212",
      office: "Ground Floor, Block B",
      capacity: "150 Students",
      description: "Comfortable living space with modern amenities and 24/7 security for female students."
    },
    {
      id: 5,
      name: "Dean Student Welfare",
      type: "Administration",
      warden: "Dr. Vinod Kumar",
      initials: "DSW",
      email: "dsw@nsut.ac.in",
      contact: "011-25099072",
      office: "Administrative Block",
      capacity: "All Hostels",
      description: "Overall supervision and welfare of all hostel students. Main contact for hostel-related issues and concerns."
    },
    {
      id: 6,
      name: "Hostel Office General",
      type: "Administration",
      warden: "Administrative Staff",
      initials: "HO",
      email: "hostel.office@nsut.ac.in",
      contact: "011-25000212",
      office: "Central Hostel Office",
      capacity: "All Hostels",
      description: "Central hostel administration office for admissions, fee payments, and general hostel inquiries."
    },
    {
      id: 7,
      name: "Security Office",
      type: "Security",
      warden: "Security Supervisor",
      initials: "SEC",
      email: "security.hostel@nsut.ac.in",
      contact: "011-25000212",
      office: "Main Gate & Hostels",
      capacity: "24/7 Security",
      description: "Round-the-clock security services for all hostel blocks ensuring student safety and security."
    },
    {
      id: 8,
      name: "Mess Committee",
      type: "Facilities",
      warden: "Mess Supervisor",
      initials: "MESS",
      email: "mess.committee@nsut.ac.in",
      contact: "011-25000212",
      office: "Mess Complex",
      capacity: "All Students",
      description: "Managing dining facilities, meal planning, and food quality across all hostel mess facilities."
    }
  ]

  const getInitialsColor = (index: number) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-orange-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ]
    return colors[index % colors.length]
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Boys Hostel': return 'bg-blue-500'
      case 'Girls Hostel': return 'bg-pink-500'
      case 'Administration': return 'bg-green-500'
      case 'Security': return 'bg-red-500'
      case 'Facilities': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Building className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">Hostel Information</h1>
                    <p className="text-white/90 text-lg">Hostel Office & Warden Contacts</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Hostel Contact Information */}
              <div className="bg-green-50 rounded-2xl p-6 mb-8 border border-green-200">
                <div className="flex items-center mb-4">
                  <Home className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-green-800">NSUT Hostel Facilities</h3>
                </div>
                <p className="text-green-700 text-lg leading-relaxed mb-4">
                  Every hostel has its own office and warden contact. While exact wardens' personal numbers are not always public, 
                  you can reach them via the hostel office or through the Dean of Student Welfare (DSW).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-green-600">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Dean Student Welfare (DSW): 011-25099072</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Hostel Office (Boys & Girls): 011-25000212</span>
                  </div>
                </div>
              </div>

              {/* Hostel Directory - Same grid style as Event Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hostelInfo.map((hostel, index) => (
                  <motion.div
                    key={hostel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedHostel(hostel)}
                    className="bg-gray-800 text-white rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                  >
                    {/* Capacity Badge - same as Event Board date badge */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      {hostel.capacity.includes('Students') ? hostel.capacity.split(' ')[0] : hostel.capacity.split(' ')[0]}
                    </div>

                    {/* Hostel Initials - larger like Event Board */}
                    <div className={`w-16 h-16 ${getInitialsColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mt-8`}>
                      {hostel.initials}
                    </div>

                    {/* Hostel Name */}
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      {hostel.name}
                    </h3>

                    {/* Type Badge - same as Event Board category */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getTypeColor(hostel.type)} text-white`}>
                      {hostel.type}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                      {hostel.description}
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span className="truncate">{hostel.warden}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="truncate">{hostel.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{hostel.office}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hostel Detail Modal */}
          <AnimatePresence>
            {selectedHostel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setSelectedHostel(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${getInitialsColor(selectedHostel.id - 1)} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                        {selectedHostel.initials}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedHostel.name}</h2>
                        <p className="text-gray-600 text-lg">{selectedHostel.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedHostel(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {selectedHostel.description && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedHostel.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <User className="w-5 h-5 mr-2 text-blue-500" />
                          Warden/Contact Person
                        </div>
                        <div className="text-gray-600 ml-7">{selectedHostel.warden}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <MapPin className="w-5 h-5 mr-2 text-green-500" />
                          Office Location
                        </div>
                        <div className="text-gray-600 ml-7">{selectedHostel.office}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <Phone className="w-5 h-5 mr-2 text-red-500" />
                          Contact Number
                        </div>
                        <div className="text-gray-600 ml-7">{selectedHostel.contact}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <Home className="w-5 h-5 mr-2 text-purple-500" />
                          Capacity
                        </div>
                        <div className="text-gray-600 ml-7">{selectedHostel.capacity}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-700 mb-2">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Important Contact Information</span>
                    </div>
                    <p className="text-green-600 text-sm">
                      For urgent matters, contact Dean Student Welfare at 011-25099072 or the general Hostel Office at 011-25000212. 
                      Office hours are typically 9:00 AM - 6:00 PM on weekdays.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HostelInformation
