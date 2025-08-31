import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Calendar,
  Stethoscope,
  Pill,
  Thermometer,
  Activity,
  Shield,
  AlertTriangle,
  Download
} from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialization: string
  availability: string
  phone: string
  image: string
  experience: string
}

interface MedicalService {
  id: string
  name: string
  description: string
  availability: string
  location: string
  emergency: boolean
  icon: string
}

const MedicalServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      specialization: 'General Medicine',
      availability: 'Mon-Fri: 9:00 AM - 5:00 PM',
      phone: '+91 98765 43210',
      image: '/api/placeholder/150/150',
      experience: '15 years'
    },
    {
      id: '2',
      name: 'Dr. Priya Patel',
      specialization: 'Psychiatrist',
      availability: 'Mon, Wed, Fri: 2:00 PM - 6:00 PM',
      phone: '+91 98765 43211',
      image: '/api/placeholder/150/150',
      experience: '10 years'
    },
    {
      id: '3',
      name: 'Dr. Amit Kumar',
      specialization: 'Dermatologist',
      availability: 'Tue, Thu: 10:00 AM - 4:00 PM',
      phone: '+91 98765 43212',
      image: '/api/placeholder/150/150',
      experience: '8 years'
    },
    {
      id: '4',
      name: 'Dr. Sunita Singh',
      specialization: 'Gynecologist',
      availability: 'Mon-Wed: 11:00 AM - 3:00 PM',
      phone: '+91 98765 43213',
      image: '/api/placeholder/150/150',
      experience: '12 years'
    }
  ]

  const medicalServices: MedicalService[] = [
    {
      id: '1',
      name: 'Emergency Care',
      description: '24/7 emergency medical assistance for critical health issues',
      availability: '24/7',
      location: 'Medical Center - Ground Floor',
      emergency: true,
      icon: 'AlertTriangle'
    },
    {
      id: '2',
      name: 'General Consultation',
      description: 'Routine health checkups and general medical consultation',
      availability: 'Mon-Fri: 9:00 AM - 5:00 PM',
      location: 'Medical Center - Room 101',
      emergency: false,
      icon: 'Stethoscope'
    },
    {
      id: '3',
      name: 'Mental Health Support',
      description: 'Counseling and mental health support services',
      availability: 'Mon, Wed, Fri: 2:00 PM - 6:00 PM',
      location: 'Counseling Center - Room 201',
      emergency: false,
      icon: 'Heart'
    },
    {
      id: '4',
      name: 'Pharmacy',
      description: 'On-campus pharmacy with essential medicines and prescriptions',
      availability: 'Mon-Sat: 8:00 AM - 8:00 PM',
      location: 'Medical Center - Ground Floor',
      emergency: false,
      icon: 'Pill'
    },
    {
      id: '5',
      name: 'Health Checkups',
      description: 'Regular health screenings and preventive care',
      availability: 'Mon-Fri: 10:00 AM - 4:00 PM',
      location: 'Medical Center - Room 102',
      emergency: false,
      icon: 'Activity'
    },
    {
      id: '6',
      name: 'First Aid',
      description: 'Basic first aid and immediate medical assistance',
      availability: 'Mon-Sat: 8:00 AM - 10:00 PM',
      location: 'Multiple Locations',
      emergency: true,
      icon: 'Shield'
    }
  ]

  const emergencyContacts = [
    { name: 'Campus Emergency', number: '100', description: 'Primary emergency contact' },
    { name: 'Medical Center', number: '+91 98765 43200', description: 'Direct medical assistance' },
    { name: 'Ambulance', number: '108', description: 'Emergency ambulance service' },
    { name: 'Poison Control', number: '1066', description: 'Poison control hotline' }
  ]

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'AlertTriangle': <AlertTriangle className="w-6 h-6" />,
      'Stethoscope': <Stethoscope className="w-6 h-6" />,
      'Heart': <Heart className="w-6 h-6" />,
      'Pill': <Pill className="w-6 h-6" />,
      'Activity': <Activity className="w-6 h-6" />,
      'Shield': <Shield className="w-6 h-6" />
    }
    return iconMap[iconName] || <Heart className="w-6 h-6" />
  }

  const filteredServices = medicalServices.filter(service => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'emergency' && service.emergency) ||
      (selectedCategory === 'regular' && !service.emergency)
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                Medical{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Services
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Comprehensive healthcare services available on campus. Access emergency care, regular consultations, mental health support, and more.
              </p>
            </motion.div>

            {/* Emergency Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 mb-12"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Emergency Contact</h3>
                    <p className="text-gray-300">24/7 medical assistance available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:100" 
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call 100</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search services or doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="flex gap-4">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'emergency', label: 'Emergency' },
                  { id: 'regular', label: 'Regular' }
                ].map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Medical Services Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Stethoscope className="w-8 h-8 text-cyan-400" />
                <span>Available Services</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400/50 ${
                      service.emergency ? 'border-red-500/30 bg-red-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        service.emergency 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : 'bg-gradient-to-r from-cyan-400 to-purple-600'
                      }`}>
                        {getIcon(service.icon)}
                      </div>
                      {service.emergency && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          EMERGENCY
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-white font-bold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{service.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Doctors Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <User className="w-8 h-8 text-cyan-400" />
                <span>Available Doctors</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-1">{doctor.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-2">{doctor.specialization}</p>
                    <p className="text-gray-400 text-sm mb-3">{doctor.experience} experience</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">{doctor.availability}</span>
                      </div>
                      <a 
                        href={`tel:${doctor.phone}`}
                        className="flex items-center justify-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{doctor.phone}</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Phone className="w-8 h-8 text-red-400" />
                <span>Emergency Contacts</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={`tel:${contact.number}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:bg-red-500/20"
                  >
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-1">{contact.name}</h3>
                    <p className="text-red-400 font-semibold mb-2">{contact.number}</p>
                    <p className="text-gray-400 text-sm">{contact.description}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MedicalServicesPage
