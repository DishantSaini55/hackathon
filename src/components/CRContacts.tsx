import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, MessageCircle } from 'lucide-react'

interface CRContactsProps {
  isOpen: boolean
  onClose: () => void
}

const CRContacts: React.FC<CRContactsProps> = ({ isOpen, onClose }) => {
  // Sample CR data - replace with actual CR information
  const crList = [
    {
      name: 'Naman Arora',
      year: 'First Year',
      branch: 'CSE',
      section: 'A',
      phone: '+91 9876543210',
      email: 'naman.arora@nsut.ac.in',
      socialHandle: '@naman_arora'
    },
    {
      name: 'Priya Sharma',
      year: 'First Year',
      branch: 'ECE',
      section: 'B',
      phone: '+91 9876543211',
      email: 'priya.sharma@nsut.ac.in',
      socialHandle: '@priya_sharma'
    },
    {
      name: 'Rahul Gupta',
      year: 'Second Year',
      branch: 'IT',
      section: 'A',
      phone: '+91 9876543212',
      email: 'rahul.gupta@nsut.ac.in',
      socialHandle: '@rahul_gupta'
    },
    {
      name: 'Aisha Khan',
      year: 'Second Year',
      branch: 'MPAE',
      section: 'B',
      phone: '+91 9876543213',
      email: 'aisha.khan@nsut.ac.in',
      socialHandle: '@aisha_khan'
    },
    {
      name: 'Vikram Singh',
      year: 'Third Year',
      branch: 'ME',
      section: 'A',
      phone: '+91 9876543214',
      email: 'vikram.singh@nsut.ac.in',
      socialHandle: '@vikram_singh'
    },
    {
      name: 'Neha Patel',
      year: 'Third Year',
      branch: 'CSE',
      section: 'B',
      phone: '+91 9876543215',
      email: 'neha.patel@nsut.ac.in',
      socialHandle: '@neha_patel'
    },
    {
      name: 'Karan Malhotra',
      year: 'Final Year',
      branch: 'ECE',
      section: 'A',
      phone: '+91 9876543216',
      email: 'karan.malhotra@nsut.ac.in',
      socialHandle: '@karan_malhotra'
    },
    {
      name: 'Sanya Joshi',
      year: 'Final Year',
      branch: 'IT',
      section: 'B',
      phone: '+91 9876543217',
      email: 'sanya.joshi@nsut.ac.in',
      socialHandle: '@sanya_joshi'
    }
  ]

  // Group CRs by year and branch
  const groupedCRs = crList.reduce((acc, cr) => {
    const key = `${cr.year}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cr)
    return acc
  }, {} as Record<string, typeof crList>)

  // Modal variants for animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  }

  // Backdrop variants for animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-genie-500 to-genie-600 flex justify-between items-center">
              <h2 className="tracking-tighter text-white font-sans text-2xl font-bold">Class Representative Contacts</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <p className="text-gray-600">
                  Need to connect with your Class Representative? Find their contact information below. CRs are the bridge between students and faculty and can help with class announcements, exam updates, and academic support.
                </p>
              </div>

              {/* Search box */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, branch, or year..."
                    className="w-full p-4 bg-gray-100 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-genie-500"
                  />
                  <div className="absolute right-4 top-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CR List grouped by year */}
              <div className="space-y-8">
                {Object.entries(groupedCRs).map(([year, crs]) => (
                  <div key={year} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{year}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {crs.map((cr) => (
                        <motion.div
                          key={cr.name}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-genie-500 to-genie-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {cr.name.split(' ').map(word => word[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800">{cr.name}</h4>
                              <p className="text-gray-600 text-sm">{cr.branch} - Section {cr.section}</p>
                              
                              <div className="mt-3 space-y-2">
                                <a href={`tel:${cr.phone}`} className="flex items-center text-sm text-gray-600 hover:text-genie-600">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {cr.phone}
                                </a>
                                <a href={`mailto:${cr.email}`} className="flex items-center text-sm text-gray-600 hover:text-genie-600">
                                  <Mail className="w-4 h-4 mr-2" />
                                  {cr.email}
                                </a>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  {cr.socialHandle}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Last updated: August 2025
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg text-gray-700 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CRContacts
