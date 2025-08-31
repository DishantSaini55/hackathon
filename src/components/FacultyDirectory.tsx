import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  User,
  X,
  Building,
  Users
} from 'lucide-react'

interface FacultyMember {
  id: number
  name: string
  designation: string
  department: string
  departmentCode: string
  initials: string
  email: string
  contact: string
  description?: string
}

const FacultyDirectory = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null)

  const facultyMembers: FacultyMember[] = [
    {
      id: 1,
      name: "Prof. Bijendra Kumar",
      designation: "Professor & Head",
      department: "Computer Science & Engineering",
      departmentCode: "CSE",
      initials: "BK",
      email: "bijendra.kumar@nsut.ac.in",
      contact: "9205475069, 9868769007",
      description: "Leading the Computer Science & Engineering department with expertise in advanced computing technologies and research."
    },
    {
      id: 2,
      name: "Prof. Asha Rani",
      designation: "Professor & Head",
      department: "Electrical & Electronics Engineering",
      departmentCode: "EEE",
      initials: "AR",
      email: "asha.rani@nsut.ac.in",
      contact: "+91-9953681254",
      description: "Head of Electrical & Electronics Engineering department, specializing in power systems and electronics."
    },
    {
      id: 3,
      name: "Prof. J K Singh",
      designation: "Head of Department",
      department: "Mathematics",
      departmentCode: "MATH",
      initials: "JKS",
      email: "jk.singh@nsut.ac.in",
      contact: "9205475013 (Office)",
      description: "Leading the Mathematics department with focus on applied mathematics and computational methods."
    },
    {
      id: 4,
      name: "Prof. Ranjana Jha",
      designation: "Professor & Head",
      department: "Physics",
      departmentCode: "PHY",
      initials: "RJ",
      email: "ranjana.jha@nsut.ac.in",
      contact: "011-25000187, +91-9810210255",
      description: "Head of Physics department with research interests in theoretical and applied physics."
    },
    {
      id: 5,
      name: "Prof. Anjana Sarkar",
      designation: "Professor & Head",
      department: "Chemistry",
      departmentCode: "CHEM",
      initials: "AS",
      email: "anjana.sarkar@nsut.ac.in",
      contact: "Office: 011-25000240",
      description: "Professor and Head with expertise in chemical sciences and research methodologies."
    },
    {
      id: 6,
      name: "Prof. Tanushree Choudhary",
      designation: "Professor & Head",
      department: "Mechanical Engineering",
      departmentCode: "MECH",
      initials: "TC",
      email: "tanushree.choudhary@nsut.ac.in",
      contact: "011-25000257",
      description: "Leading the Mechanical Engineering department with focus on advanced manufacturing and design."
    },
    {
      id: 7,
      name: "Prof. Jainendra Kumar Singh",
      designation: "Professor & Head",
      department: "Civil Engineering",
      departmentCode: "CIVIL",
      initials: "JKS",
      email: "jainendra.singh@nsut.ac.in",
      contact: "9968184765 (Mobile), 9205475013 (Office)",
      description: "Head of Civil Engineering department specializing in structural engineering and construction management."
    },
    {
      id: 8,
      name: "Prof. Sanjay Kumar Dhurandher",
      designation: "Professor & Head",
      department: "Information Technology",
      departmentCode: "IT",
      initials: "SKD",
      email: "sanjay.dhurandher@nsut.ac.in",
      contact: "011-25000170",
      description: "Professor and Head of IT department with expertise in network technologies and information systems."
    }
  ]

  const getInitialsColor = (index: number) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-orange-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
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
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">Faculty Directory</h1>
                    <p className="text-white/90 text-lg">Department Heads & Contact Numbers</p>
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
              {/* Faculty Information */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-800">NSUT Faculty Leadership</h3>
                </div>
                <p className="text-blue-700 text-lg leading-relaxed mb-4">
                  Connect with department heads and senior faculty members across all engineering and science departments at NSUT. 
                  Our experienced leadership team is committed to academic excellence and student success.
                </p>
                <div className="flex items-center text-blue-600">
                  <Building className="w-5 h-5 mr-2" />
                  <span className="font-semibold">All Departments - Main Campus</span>
                </div>
              </div>

              {/* Faculty Directory - Same grid style as Event Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {facultyMembers.map((faculty, index) => (
                  <motion.div
                    key={faculty.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedFaculty(faculty)}
                    className="bg-gray-800 text-white rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                  >
                    {/* Department Code Badge - same as Event Board date badge */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      {faculty.departmentCode}
                    </div>

                    {/* Faculty Initials - larger like Event Board */}
                    <div className={`w-16 h-16 ${getInitialsColor(index)} rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mt-8`}>
                      {faculty.initials}
                    </div>

                    {/* Faculty Name */}
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      {faculty.name}
                    </h3>

                    {/* Designation Badge - same as Event Board category */}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-green-500 text-white">
                      {faculty.designation}
                    </div>

                    {/* Department */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                      {faculty.department}
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="truncate">{faculty.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="truncate">{faculty.email}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Faculty Detail Modal */}
          <AnimatePresence>
            {selectedFaculty && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setSelectedFaculty(null)}
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
                      <div className={`w-16 h-16 ${getInitialsColor(selectedFaculty.id - 1)} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                        {selectedFaculty.initials}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedFaculty.name}</h2>
                        <p className="text-gray-600 text-lg">{selectedFaculty.designation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFaculty(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center font-semibold text-gray-800 mb-2">
                      <Building className="w-5 h-5 mr-2 text-blue-500" />
                      Department
                    </div>
                    <div className="text-gray-600 ml-7 text-lg">{selectedFaculty.department}</div>
                  </div>
                  
                  {selectedFaculty.description && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedFaculty.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center font-semibold text-gray-800 mb-2">
                        <Phone className="w-5 h-5 mr-2 text-green-500" />
                        Contact Numbers
                      </div>
                      <div className="text-gray-600 ml-7">{selectedFaculty.contact}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center font-semibold text-gray-800 mb-2">
                        <Mail className="w-5 h-5 mr-2 text-blue-500" />
                        Email
                      </div>
                      <div className="text-gray-600 ml-7">{selectedFaculty.email}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-700 mb-2">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Office Hours & Contact</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                      For academic inquiries and appointments, please contact the department office during regular business hours 
                      or reach out via the provided contact numbers and email.
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

export default FacultyDirectory
