import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin,
  X,
  Building,
  Shield,
  GraduationCap,
  CreditCard,
  Wrench,
  Users,
  Briefcase,
  BookOpen,
  Monitor,
  Heart
} from 'lucide-react'

interface ContactInfo {
  id: number
  name: string
  category: string
  department: string
  phone: string
  email: string
  office: string
  hours: string
  description: string
  icon: any
}

const PhoneBook = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedContact, setSelectedContact] = useState<ContactInfo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const contacts: ContactInfo[] = [
    // Admissions Contact Numbers
    {
      id: 1,
      name: "B.Tech Admissions",
      category: "Admissions",
      department: "BTECH",
      phone: "9205475102 / 9205475103 / 011-25099290",
      email: "admissions@nsut.ac.in",
      office: "Administrative Block, Admissions Office",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      description: "Dedicated support for B.Tech program admissions, counselling, seat allocation, and undergraduate application processing.",
      icon: GraduationCap
    },
    {
      id: 2,
      name: "M.Tech Admissions",
      category: "Admissions",
      department: "MTECH",
      phone: "9205475084 / 9205475085",
      email: "academicpg@gmail.com / mtech.admissions.helpdesk2025@nsut.ac.in",
      office: "Administrative Block, PG Office",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      description: "M.Tech admissions support, postgraduate counselling, and master's program application assistance. Fax: 011-25099022",
      icon: GraduationCap
    },
    {
      id: 3,
      name: "Ph.D Admissions",
      category: "Admissions",
      department: "PHD",
      phone: "9205475048",
      email: "helpdesk.phd@nsut.ac.in / nsutphd2020@gmail.com",
      office: "Administrative Block, Research Office",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      description: "Ph.D admissions guidance, research program support, and doctoral application processing. Fax: 011-25099022",
      icon: GraduationCap
    },

    // Banks Contact Numbers
    {
      id: 4,
      name: "State Bank of India (SBI)",
      category: "Banks",
      department: "SBI",
      phone: "011-25099079 / 011-28525883 / 011-28525897",
      email: "sbi.10650@sbi.co.in",
      office: "Administrative Block Basement",
      hours: "10:00 AM - 4:00 PM (Mon-Sat, closed 2nd & 4th Saturdays)",
      description: "On-campus SBI branch for student accounts, fee payments, educational loans. IFSC: SBIN0010650. Fax: 011-25099091",
      icon: CreditCard
    },
    {
      id: 5,
      name: "Andhra Bank",
      category: "Banks",
      department: "ANDHRA",
      phone: "011-2509907",
      email: "andhra.nsut@andrabank.co.in",
      office: "Administrative Block Basement",
      hours: "10:00 AM - 4:00 PM (Mon-Fri)",
      description: "On-campus Andhra Bank branch providing banking services, account management, and financial assistance to students and staff.",
      icon: CreditCard
    },
    {
      id: 6,
      name: "SBI Customer Care (Toll-Free)",
      category: "Banks",
      department: "SBI-CF",
      phone: "1800-425-3800",
      email: "customercare@sbi.co.in",
      office: "Toll-Free Service",
      hours: "24/7 Customer Support",
      description: "SBI toll-free customer care for account queries, card issues, and general banking support for NSUT SBI account holders.",
      icon: CreditCard
    },

    // Service Contact Details
    {
      id: 7,
      name: "Central Library Enquiry",
      category: "Library & IT",
      department: "LIB",
      phone: "011-25000183",
      email: "library@nsut.ac.in",
      office: "Central Library Building",
      hours: "8:00 AM - 8:00 PM (Mon-Sat)",
      description: "Digital and physical library resources, book lending, research support, and academic database access.",
      icon: BookOpen
    },
    {
      id: 8,
      name: "Computer Centre",
      category: "Library & IT",
      department: "IT",
      phone: "011-25000180",
      email: "computercentre@nsut.ac.in",
      office: "Computer Centre Building",
      hours: "9:00 AM - 6:00 PM (Mon-Fri)",
      description: "Technical support for computers, network issues, software installation, and IT infrastructure maintenance.",
      icon: Monitor
    },

    // NSUT Central & Administrative Contacts
    {
      id: 9,
      name: "NSUT General Helpline",
      category: "Administrative",
      department: "HELP",
      phone: "9205475071",
      email: "info@nsut.ac.in",
      office: "Central Reception",
      hours: "9:00 AM - 6:00 PM (Mon-Fri)",
      description: "Main helpline for general inquiries, information, and assistance for students, parents, and visitors.",
      icon: Building
    },
    {
      id: 10,
      name: "Reception / Academic Section",
      category: "Administrative",
      department: "REC",
      phone: "+91-11-2509 9017",
      email: "academic@nsut.ac.in",
      office: "Administrative Block Reception",
      hours: "9:30 AM - 6:00 PM (Mon-Fri)",
      description: "Main reception and academic section for general queries, academic records, and administrative assistance.",
      icon: Building
    },

    // Counselling & Student Welfare
    {
      id: 11,
      name: "Counselling Services",
      category: "Student Welfare",
      department: "COUNS",
      phone: "9810435544",
      email: "counselling@nsut.ac.in",
      office: "Student Counselling Center",
      hours: "3:00 PM - 5:00 PM (Tue-Thu)",
      description: "Professional counselling services for academic stress, personal issues, and mental health support for students.",
      icon: Heart
    },
    {
      id: 12,
      name: "Internal Complaint Committee",
      category: "Student Welfare",
      department: "ICC",
      phone: "011-23317004 / 1091 (Toll-free)",
      email: "icc@nsut.ac.in",
      office: "ICC Office, Administrative Block",
      hours: "9:00 AM - 5:00 PM (Mon-Fri)",
      description: "Committee for handling complaints related to sexual harassment and ensuring safe campus environment. Confidential support available.",
      icon: Shield
    },

    // Placement Cell
    {
      id: 13,
      name: "Training & Placement Cell",
      category: "Placement",
      department: "TPC",
      phone: "011-25099095",
      email: "placement@nsut.ac.in",
      office: "Placement Block",
      hours: "9:00 AM - 6:00 PM (Mon-Fri)",
      description: "Career guidance, placement assistance, industry interface, and internship coordination for students across all departments.",
      icon: Briefcase
    },

    // Campus Security
    {
      id: 14,
      name: "NSUT Security Office",
      category: "Security",
      department: "SEC",
      phone: "011-25000225",
      email: "security@nsut.ac.in",
      office: "Main Gate, Dwarka Campus",
      hours: "24/7 Security Services",
      description: "Campus security office at main gate providing 24/7 security services, visitor management, and safety coordination.",
      icon: Shield
    },
    {
      id: 15,
      name: "Delhi Police Dwarka Sector-3",
      category: "Security",
      department: "POLICE",
      phone: "011-28032100 / 100 (Emergency)",
      email: "ps.dwarka3@delhipolice.nic.in",
      office: "Dwarka Sector-3 Police Station",
      hours: "24/7 Emergency Services",
      description: "Nearest police station for emergency situations, crime reporting, and law enforcement support. Use 100 for immediate emergencies.",
      icon: Shield
    },

    // Additional Services
    {
      id: 16,
      name: "Dean Student Welfare",
      category: "Student Welfare",
      department: "DSW",
      phone: "011-25099072",
      email: "dsw@nsut.ac.in",
      office: "Student Welfare Office",
      hours: "9:00 AM - 5:00 PM (Mon-Fri)",
      description: "Overall student welfare, hostel matters, grievance redressal, and comprehensive student support services.",
      icon: Users
    },
    {
      id: 17,
      name: "Emergency Helpline",
      category: "Security",
      department: "EMRG",
      phone: "100 / 102 / 108",
      email: "emergency@nsut.ac.in",
      office: "Emergency Services",
      hours: "24/7 Emergency Hotline",
      description: "National emergency numbers: 100 (Police), 102 (Ambulance), 108 (Emergency Response). Use for immediate medical or security emergencies.",
      icon: Shield
    }
  ]

  const categories = ['All', 'Admissions', 'Banks', 'Services', 'Administrative', 'Student Welfare', 'Placement', 'Library & IT', 'Security']

  const filteredContacts = selectedCategory === 'All' 
    ? contacts 
    : contacts.filter(contact => contact.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Admissions': return 'bg-blue-500'
      case 'Banks': return 'bg-green-500'
      case 'Services': return 'bg-orange-500'
      case 'Administrative': return 'bg-purple-500'
      case 'Student Welfare': return 'bg-pink-500'
      case 'Placement': return 'bg-indigo-500'
      case 'Library & IT': return 'bg-cyan-500'
      case 'Security': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDepartmentColor = (index: number) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-orange-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
      'bg-cyan-500', 'bg-yellow-500', 'bg-gray-500', 'bg-violet-500'
    ]
    return colors[index % colors.length]
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
                                          className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">PhoneBook</h1>
                    <p className="text-white/90 text-lg">NSUT Contact Directory</p>
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
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-200">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-2xl font-bold text-red-800">Emergency Contacts</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-red-700">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">NSUT General Helpline: 9205475071</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Campus Security: 011-25000225</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Police Emergency: 100</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Sexual Harassment: 1091</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Medical Emergency: 102/108</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Reception: +91-11-2509 9017</span>
                  </div>
                </div>
              </div>

              {/* Contact Directory - Same grid style as other modals */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredContacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedContact(contact)}
                    className="bg-gray-800 text-white rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                  >
                    {/* Department Badge - same as Event Board date badge */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      {contact.department}
                    </div>

                    {/* Contact Icon - larger like Event Board */}
                    <div className={`w-16 h-16 ${getDepartmentColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mt-8`}>
                      <contact.icon className="w-8 h-8" />
                    </div>

                    {/* Contact Name */}
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      {contact.name}
                    </h3>

                    {/* Category Badge - same as Event Board category */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(contact.category)} text-white`}>
                      {contact.category}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                      {contact.description}
                    </p>

                    {/* Quick Contact Details */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="truncate">{contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="truncate">{contact.hours.split('(')[0]}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{contact.office}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Detail Modal */}
          <AnimatePresence>
            {selectedContact && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setSelectedContact(null)}
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
                      <div className={`w-16 h-16 ${getDepartmentColor(selectedContact.id - 1)} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                        <selectedContact.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedContact.name}</h2>
                        <p className="text-gray-600 text-lg">{selectedContact.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedContact.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <Phone className="w-5 h-5 mr-2 text-blue-500" />
                          Phone Number
                        </div>
                        <div className="text-gray-600 ml-7">{selectedContact.phone}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <Mail className="w-5 h-5 mr-2 text-green-500" />
                          Email Address
                        </div>
                        <div className="text-gray-600 ml-7">{selectedContact.email}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <MapPin className="w-5 h-5 mr-2 text-red-500" />
                          Office Location
                        </div>
                        <div className="text-gray-600 ml-7">{selectedContact.office}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center font-semibold text-gray-800 mb-2">
                          <Clock className="w-5 h-5 mr-2 text-purple-500" />
                          Office Hours
                        </div>
                        <div className="text-gray-600 ml-7">{selectedContact.hours}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-700 mb-2">
                      <Phone className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Quick Contact Guide</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                      For urgent matters, call directly. For general inquiries, email is preferred. 
                      Please respect office hours for non-emergency situations.
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

export default PhoneBook