import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  AlertCircle,
  X,
  Stethoscope,
  Mail,
  Calendar,
  Shield
} from 'lucide-react'

interface Doctor {
  id: number
  name: string
  specialization: string
  initials: string
  email: string
  schedule: string
  description?: string
}

const MedicalServices = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. MP Agarwal",
      specialization: "Consultant Physician",
      initials: "MA",
      email: "mp.agarwal@nsut.ac.in",
      schedule: "Wednesday, 2–5 PM",
      description: "Experienced consultant physician specializing in internal medicine and general health consultation."
    },
    {
      id: 2,
      name: "Dr. RK Sharma",
      specialization: "Physician & Cardiologist",
      initials: "RS",
      email: "rk.sharma@nsut.ac.in",
      schedule: "Monday, 4–6 PM",
      description: "Specialist in cardiology and internal medicine with expertise in heart-related conditions."
    },
    {
      id: 3,
      name: "Dr. PP Singh",
      specialization: "Medical Officer, General Physician",
      initials: "PS",
      email: "pp.singh@nsut.ac.in",
      schedule: "Mon–Fri, 9:30 AM–6 PM",
      description: "Primary care physician available for general medical consultation and routine health checkups."
    },
    {
      id: 4,
      name: "Dr. SB Pathak",
      specialization: "Homeopathic Consultant",
      initials: "SP",
      email: "sb.pathak@nsut.ac.in",
      schedule: "Saturday, 9:30–11:30 AM",
      description: "Qualified homeopathic doctor providing alternative medicine consultation and treatment."
    },
    {
      id: 5,
      name: "Dr. ON Goel",
      specialization: "Eye Surgeon",
      initials: "OG",
      email: "on.goel@nsut.ac.in",
      schedule: "Thursday, 3:30–5:30 PM",
      description: "Specialist eye surgeon providing comprehensive eye care and surgical procedures."
    },
    {
      id: 6,
      name: "Dr. Meet Wadhwa",
      specialization: "Gynecologist",
      initials: "MW",
      email: "meet.wadhwa@nsut.ac.in",
      schedule: "Friday, 3–5 PM",
      description: "Women's health specialist providing gynecological consultation and care."
    },
    {
      id: 7,
      name: "Mrs. Sosamma Mathew",
      specialization: "Staff Nurse",
      initials: "SM",
      email: "sosamma.mathew@nsut.ac.in",
      schedule: "24/7 Available",
      description: "Experienced nursing staff providing immediate medical care and patient assistance."
    },
    {
      id: 8,
      name: "Mr. Sanjeev Chopra",
      specialization: "Pharmacist",
      initials: "SC",
      email: "sanjeev.chopra@nsut.ac.in",
      schedule: "Mon–Sat, 9 AM–6 PM",
      description: "Licensed pharmacist managing medical supplies and providing medication guidance."
    }
  ]

  const getInitialsColor = (index: number) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-orange-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
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
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">Medical Services</h1>
                    <p className="text-white/90 text-lg">24-hour medical facility for students, staff, and dependents</p>
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
              {/* Medical Facility Information */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-800">NSUT Medical Facility</h3>
                </div>
                <p className="text-blue-700 text-lg leading-relaxed mb-4">
                  NSUT offers a 24-hour medical facility near the Type 5 faculty housing, serving students, staff, and their dependents. 
                  It provides immediate care—including ECG, blood sugar tests, nebulizer services, and minor procedures—all free of cost.
                </p>
                <div className="flex items-center text-blue-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Location: Near Type 5 Faculty Housing</span>
                </div>
              </div>

              {/* Doctors Directory - Same grid style as Event Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDoctor(doctor)}
                    className="bg-gray-800 text-white rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                  >
                    {/* Schedule Badge - same as Event Board date badge */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      {doctor.schedule.includes('24/7') ? '24/7' : doctor.schedule.split(',')[0]}
                    </div>

                    {/* Doctor Initials - larger like Event Board */}
                    <div className={`w-16 h-16 ${getInitialsColor(index)} rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mt-8`}>
                      {doctor.initials}
                    </div>

                    {/* Doctor Name */}
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      {doctor.name}
                    </h3>

                    {/* Specialization Badge - same as Event Board category */}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-blue-500 text-white">
                      {doctor.specialization}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                      {doctor.description}
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{doctor.schedule}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="truncate">{doctor.email}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Doctor Detail Modal */}
          <AnimatePresence>
            {selectedDoctor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setSelectedDoctor(null)}
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
                      <div className={`w-16 h-16 ${getInitialsColor(selectedDoctor.id - 1)} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                        {selectedDoctor.initials}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                        <p className="text-gray-600 text-lg">{selectedDoctor.specialization}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {selectedDoctor.description && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedDoctor.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center font-semibold text-gray-800 mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                        Schedule
                      </div>
                      <div className="text-gray-600 ml-7 font-medium">{selectedDoctor.schedule}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center font-semibold text-gray-800 mb-2">
                        <Mail className="w-5 h-5 mr-2 text-green-500" />
                        Email
                      </div>
                      <div className="text-gray-600 ml-7">{selectedDoctor.email}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-700 mb-2">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Appointment Information</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                      Visit the medical facility during the scheduled hours or call +91-11-2590-1040 for emergencies. 
                      All services are provided free of cost to students, staff, and dependents.
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

export default MedicalServices
