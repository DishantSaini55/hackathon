import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Bell,
  Clock,
  GraduationCap,
  Building,
  Phone,
  Star,
  Headphones,
  Heart,
  UserCheck,
  Coffee
} from 'lucide-react'
import EventBoard from './EventBoard'
import MedicalServices from './MedicalServices'
import FacultyDirectory from './FacultyDirectory'
import HostelInformation from './HostelInformation'
import PhoneBook from './PhoneBook'
import Society from './Society'
import CRContacts from './CRContacts'
import CanteenQueue from './CanteenQueue'

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const [isEventBoardOpen, setIsEventBoardOpen] = useState(false)
  const [isMedicalServicesOpen, setIsMedicalServicesOpen] = useState(false)
  const [isFacultyDirectoryOpen, setIsFacultyDirectoryOpen] = useState(false)
  const [isHostelInformationOpen, setIsHostelInformationOpen] = useState(false)
  const [isPhoneBookOpen, setIsPhoneBookOpen] = useState(false)
  const [isSocietyOpen, setIsSocietyOpen] = useState(false)
  const [isCRContactsOpen, setIsCRContactsOpen] = useState(false)
  const [isCanteenQueueOpen, setIsCanteenQueueOpen] = useState(false)

  const allFeatures = [
    {
      icon: Calendar,
      title: 'Event Board',
      description: 'Stay updated with campus events, workshops, seminars, and competitions. Never miss an opportunity to grow and network.',
      color: 'from-blue-500 to-blue-600',
      link: 'View Events'
    },
    {
      icon: Users,
      title: 'Societies & Clubs',
      description: 'Discover student societies and clubs at NSUT. From technical innovations to cultural expressions, find your passion and connect with like-minded students.',
      color: 'from-purple-500 to-purple-600',
      link: 'Explore Societies'
    },
    {
      icon: MapPin,
      title: 'Campus Navigation',
      description: 'Navigate the campus with ease using our interactive maps. Find classrooms, labs, hostels and important buildings quickly.',
      color: 'from-pink-500 to-red-500',
      link: 'Explore Campus',
      paused: true
    },
    {
      icon: BookOpen,
      title: 'Study Hub',
      description: 'Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.',
      color: 'from-green-500 to-green-600',
      link: 'Explore Resources',
      paused: true
    },
    {
      icon: Users,
      title: 'Faculty Directory',
      description: 'Complete directory of faculty members with their contact information, office hours, and specializations.',
      color: 'from-indigo-500 to-indigo-600',
      link: 'View Directory'
    },
    {
      icon: Building,
      title: 'Hostel Information',
      description: 'Get detailed information about hostel facilities, mess timings, warden contacts, and important announcements.',
      color: 'from-orange-500 to-orange-600',
      link: 'Hostel Info'
    },
    {
      icon: Clock,
      title: 'Timetable Manager',
      description: 'Create and manage your personalized timetable with class schedules, exam dates, and important deadlines.',
      color: 'from-yellow-500 to-yellow-600',
      link: 'View Schedule'
    },
    {
      icon: GraduationCap,
      title: 'Senior Guidance',
      description: 'Connect with seniors for mentorship, career guidance, and academic support across all departments.',
      color: 'from-cyan-500 to-cyan-600',
      link: 'Find Mentors',
      paused: true
    },
    {
      icon: Heart,
      title: 'Medical Services',
      description: 'Access comprehensive healthcare services including emergency care, general checkups, pharmacy, mental health support, and medical consultations available 24/7.',
      color: 'from-red-500 to-pink-500',
      link: 'View Details'
    },
    {
      icon: Phone,
      title: 'PhoneBook',
      description: 'Complete contact directory with phone numbers for admissions, banks, services, administration, student welfare, placement, library, and security.',
      color: 'from-red-500 to-red-600',
      link: 'View Contacts'
    },
    {
      icon: UserCheck,
      title: 'CR Contacts',
      description: 'Easily connect with your Class Representatives (CRs) for important class announcements, exam updates, and academic support.',
      color: 'from-teal-500 to-teal-600',
      link: 'Contact CRs'
    },
    {
      icon: Coffee,
      title: 'Canteen Services',
      description: 'Explore campus dining options, check real-time queue status, browse menus, and discover the best food across all canteens. Your complete campus dining companion.',
      color: 'from-orange-500 to-red-500',
      link: 'Coming Soon',
      textOnly: true
    }
  ]

  // Filter out paused features
  const features = allFeatures.filter(feature => !feature.paused)

  return (
    <section id="features" className="py-16 lg:py-24 bg-black relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-15"></div>
      
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="tracking-tighter text-white font-sans text-4xl sm:text-5xl md:text-6xl mb-6">
            What we{' '}
            <span className="block font-serif text-5xl sm:text-6xl md:text-7xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              offer
            </span>
          </h2>
          <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
            From finding your next class to finding your next project team—we've got everything to help you settle in, grow, and thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 min-h-[320px] ${
                feature.textOnly ? 'cursor-default' : 'cursor-pointer'
              }`}
              onClick={() => {
                // Don't navigate if it's text only
                if (feature.textOnly) {
                  return;
                }
                
                if (feature.title === 'Event Board') {
                  window.open('/events', '_blank')
                } else if (feature.title === 'Medical Services') {
                  window.open('/medical', '_blank')
                } else if (feature.title === 'Faculty Directory') {
                  window.open('/faculty', '_blank')
                } else if (feature.title === 'Hostel Information') {
                  window.open('/hostels', '_blank')
                } else if (feature.title === 'PhoneBook') {
                  window.open('/phonebook', '_blank')
                } else if (feature.title === 'Societies & Clubs') {
                  window.open('/societies', '_blank')
                } else if (feature.title === 'CR Contacts') {
                  window.open('/cr-contacts', '_blank')
                } else if (feature.title === 'Timetable Manager') {
                  window.open('/timetable', '_blank')
                } else if (feature.title === 'Campus Navigation') {
                  window.open('/map', '_blank')
                } else if (feature.title === 'Study Hub') {
                  window.open('/study-hub', '_blank')
                } else if (feature.title === 'Senior Guidance') {
                  window.open('/launchpad', '_blank')
                } else if (feature.title === 'Canteen Services') {
                  window.open('/canteen', '_blank')
                }
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative z-10 p-6 sm:p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-white font-semibold group-hover:text-cyan-400 transition-colors duration-300"
                >
                  {feature.link}
                  <motion.div
                    className="ml-2 w-6 h-6 rounded-full bg-white/20 group-hover:bg-cyan-400/20 flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-2 h-2 border-r-2 border-t-2 border-white transform rotate-45"></div>
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Board Modal */}
      <EventBoard 
        isOpen={isEventBoardOpen} 
        onClose={() => setIsEventBoardOpen(false)} 
      />

      {/* Medical Services Modal */}
      <MedicalServices 
        isOpen={isMedicalServicesOpen} 
        onClose={() => setIsMedicalServicesOpen(false)} 
      />

      {/* Faculty Directory Modal */}
      <FacultyDirectory 
        isOpen={isFacultyDirectoryOpen} 
        onClose={() => setIsFacultyDirectoryOpen(false)} 
      />

      {/* Hostel Information Modal */}
      <HostelInformation 
        isOpen={isHostelInformationOpen} 
        onClose={() => setIsHostelInformationOpen(false)} 
      />

      {/* PhoneBook Modal */}
      <PhoneBook 
        isOpen={isPhoneBookOpen} 
        onClose={() => setIsPhoneBookOpen(false)} 
      />

      {/* Society Modal */}
      <Society 
        isOpen={isSocietyOpen} 
        onClose={() => setIsSocietyOpen(false)} 
      />

      {/* CR Contacts Modal */}
      <CRContacts 
        isOpen={isCRContactsOpen} 
        onClose={() => setIsCRContactsOpen(false)} 
      />

      {/* Canteen Queue Modal */}
      <CanteenQueue 
        isOpen={isCanteenQueueOpen} 
        onClose={() => setIsCanteenQueueOpen(false)} 
      />
    </section>
  )
}

export default Features