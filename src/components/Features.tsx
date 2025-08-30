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
  Heart
} from 'lucide-react'
import EventBoard from './EventBoard'
import MedicalServices from './MedicalServices'
import FacultyDirectory from './FacultyDirectory'
import HostelInformation from './HostelInformation'
import PhoneBook from './PhoneBook'
import Society from './Society'

const Features = () => {
  const [isEventBoardOpen, setIsEventBoardOpen] = useState(false)
  const [isMedicalServicesOpen, setIsMedicalServicesOpen] = useState(false)
  const [isFacultyDirectoryOpen, setIsFacultyDirectoryOpen] = useState(false)
  const [isHostelInformationOpen, setIsHostelInformationOpen] = useState(false)
  const [isPhoneBookOpen, setIsPhoneBookOpen] = useState(false)
  const [isSocietyOpen, setIsSocietyOpen] = useState(false)

  const features = [
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
      link: 'Explore Campus'
    },
    {
      icon: BookOpen,
      title: 'Study Hub',
      description: 'Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.',
      color: 'from-green-500 to-green-600',
      link: 'Explore Resources'
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
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Receive personalized notifications for exam dates, assignment deadlines, events, and important announcements.',
      color: 'from-teal-500 to-teal-600',
      link: 'Manage Alerts'
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
      link: 'Find Mentors'
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
      icon: Star,
      title: 'Premium Chat-U',
      description: 'Get priority support with our premium AI assistant for complex queries and personalized assistance.',
      color: 'from-gold-500 to-gold-600',
      link: 'Upgrade Now'
    },
    {
      icon: Headphones,
      title: 'Voice Assistant',
      description: 'Use voice commands for hands-free navigation and accessibility. Ask questions naturally in multiple languages.',
      color: 'from-violet-500 to-violet-600',
      link: 'Try Voice'
    }
  ]

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What we offer
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From finding your next class to finding your next project team—we've got everything to help you settle in, grow, and thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="card p-8 group cursor-pointer"
              onClick={() => {
                if (feature.title === 'Event Board') {
                  setIsEventBoardOpen(true)
                } else if (feature.title === 'Medical Services') {
                  setIsMedicalServicesOpen(true)
                } else if (feature.title === 'Faculty Directory') {
                  setIsFacultyDirectoryOpen(true)
                } else if (feature.title === 'Hostel Information') {
                  setIsHostelInformationOpen(true)
                } else if (feature.title === 'PhoneBook') {
                  setIsPhoneBookOpen(true)
                } else if (feature.title === 'Societies & Clubs') {
                  setIsSocietyOpen(true)
                }
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center text-gray-800 font-semibold group-hover:text-genie-600 transition-colors duration-300"
              >
                {feature.link}
                <motion.div
                  className="ml-2 w-6 h-6 rounded-full bg-gray-800 group-hover:bg-genie-600 flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-2 h-2 border-r-2 border-t-2 border-white transform rotate-45"></div>
                </motion.div>
              </motion.button>
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
    </section>
  )
}

export default Features