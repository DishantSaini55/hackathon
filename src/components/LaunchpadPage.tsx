import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Star, 
  Users, 
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  Heart,
  Building,
  User,
  Mail,
  Phone
} from 'lucide-react'

interface Startup {
  id: string
  name: string
  description: string
  category: string
  founders: string[]
  foundedYear: number
  stage: string
  funding: string
  employees: number
  location: string
  website?: string
  email: string
  phone?: string
  achievements: string[]
  technologies: string[]
  image: string
  rating: number
}

interface Event {
  id: string
  name: string
  date: string
  venue: string
  type: string
  description: string
  registrations: number
  maxParticipants: number
}

const LaunchpadPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStage, setSelectedStage] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const startups: Startup[] = [
    {
      id: '1',
      name: 'EduTech Solutions',
      description: 'AI-powered learning platform that personalizes education for every student with adaptive learning algorithms and real-time performance analytics.',
      category: 'EdTech',
      founders: ['Arjun Sharma', 'Priya Patel'],
      foundedYear: 2023,
      stage: 'Seed',
      funding: '₹50 Lakhs',
      employees: 8,
      location: 'Campus Incubator',
      website: 'https://edutech.solutions',
      email: 'contact@edutech.solutions',
      phone: '+91 98765 43210',
      achievements: ['Winner - University Startup Competition 2023', 'Featured in Tech Magazine', 'Pilot with 5 Schools'],
      technologies: ['React', 'Python', 'Machine Learning', 'AWS'],
      image: '/api/placeholder/300/200',
      rating: 4.8
    },
    {
      id: '2',
      name: 'GreenEnergy Innovations',
      description: 'Developing sustainable energy solutions using IoT and renewable sources for smart campus and residential applications.',
      category: 'CleanTech',
      founders: ['Rahul Singh', 'Kavya Gupta'],
      foundedYear: 2022,
      stage: 'Growth',
      funding: '₹2 Crores',
      employees: 15,
      location: 'Research Lab Block',
      email: 'info@greenenergy.in',
      phone: '+91 98765 43211',
      achievements: ['Government Grant Recipient', 'Patent Filed', 'Revenue ₹50 Lakhs'],
      technologies: ['IoT', 'Solar Technology', 'Mobile App', 'Data Analytics'],
      image: '/api/placeholder/300/200',
      rating: 4.6
    },
    {
      id: '3',
      name: 'HealthCare Connect',
      description: 'Telemedicine platform connecting rural patients with urban healthcare professionals through mobile technology.',
      category: 'HealthTech',
      founders: ['Dr. Anjali Verma', 'Vikash Kumar'],
      foundedYear: 2023,
      stage: 'Pre-Seed',
      funding: '₹25 Lakhs',
      employees: 6,
      location: 'Medical Center',
      website: 'https://healthcareconnect.app',
      email: 'team@healthcareconnect.app',
      achievements: ['Healthcare Innovation Award', 'Partnered with 3 Hospitals', 'Served 1000+ Patients'],
      technologies: ['Flutter', 'Node.js', 'WebRTC', 'MongoDB'],
      image: '/api/placeholder/300/200',
      rating: 4.7
    },
    {
      id: '4',
      name: 'AgriSmart',
      description: 'Smart farming solutions using drones and sensors to optimize crop yield and reduce resource consumption.',
      category: 'AgriTech',
      founders: ['Ravi Sharma', 'Sunita Patel'],
      foundedYear: 2022,
      stage: 'Seed',
      funding: '₹75 Lakhs',
      employees: 12,
      location: 'Agriculture Lab',
      email: 'contact@agrismart.tech',
      phone: '+91 98765 43212',
      achievements: ['AgriTech Startup of the Year', 'Drone Technology Patent', 'Partnered with 50 Farmers'],
      technologies: ['Drone Technology', 'AI/ML', 'IoT Sensors', 'Mobile App'],
      image: '/api/placeholder/300/200',
      rating: 4.5
    },
    {
      id: '5',
      name: 'FinanceFlow',
      description: 'Digital payment and financial literacy platform designed for college students and young professionals.',
      category: 'FinTech',
      founders: ['Amit Kumar', 'Neha Singh'],
      foundedYear: 2023,
      stage: 'Pre-Seed',
      funding: '₹30 Lakhs',
      employees: 5,
      location: 'Business Incubator',
      website: 'https://financeflow.app',
      email: 'hello@financeflow.app',
      achievements: ['FinTech Innovation Award', '10K+ App Downloads', 'RBI Sandbox Approval'],
      technologies: ['React Native', 'Blockchain', 'Payment Gateway', 'Security'],
      image: '/api/placeholder/300/200',
      rating: 4.4
    },
    {
      id: '6',
      name: 'LogisticsPro',
      description: 'Last-mile delivery optimization using AI and route planning for e-commerce and local businesses.',
      category: 'LogTech',
      founders: ['Rohit Verma', 'Pooja Agarwal'],
      foundedYear: 2022,
      stage: 'Growth',
      funding: '₹1.5 Crores',
      employees: 20,
      location: 'Tech Park',
      email: 'business@logisticspro.in',
      phone: '+91 98765 43213',
      achievements: ['Logistics Excellence Award', 'B2B Partnerships', '40% Cost Reduction for Clients'],
      technologies: ['AI/ML', 'GPS Tracking', 'React', 'Microservices'],
      image: '/api/placeholder/300/200',
      rating: 4.9
    }
  ]

  const upcomingEvents: Event[] = [
    {
      id: '1',
      name: 'Startup Pitch Competition 2024',
      date: '2024-04-15',
      venue: 'Main Auditorium',
      type: 'Competition',
      description: 'Annual startup pitch competition with prizes worth ₹10 Lakhs',
      registrations: 45,
      maxParticipants: 50
    },
    {
      id: '2',
      name: 'Investor Connect Session',
      date: '2024-04-20',
      venue: 'Incubation Center',
      type: 'Networking',
      description: 'Meet with angel investors and VCs for funding opportunities',
      registrations: 30,
      maxParticipants: 40
    },
    {
      id: '3',
      name: 'Tech Innovation Workshop',
      date: '2024-04-25',
      venue: 'Engineering Block',
      type: 'Workshop',
      description: 'Hands-on workshop on emerging technologies and innovation',
      registrations: 80,
      maxParticipants: 100
    }
  ]

  const categories = ['EdTech', 'CleanTech', 'HealthTech', 'AgriTech', 'FinTech', 'LogTech']
  const stages = ['Pre-Seed', 'Seed', 'Growth', 'Scale']

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'EdTech': <Lightbulb className="w-5 h-5" />,
      'CleanTech': <Zap className="w-5 h-5" />,
      'HealthTech': <Heart className="w-5 h-5" />,
      'AgriTech': <Target className="w-5 h-5" />,
      'FinTech': <TrendingUp className="w-5 h-5" />,
      'LogTech': <Building className="w-5 h-5" />
    }
    return iconMap[category] || <Rocket className="w-5 h-5" />
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'EdTech': 'from-blue-500 to-blue-600',
      'CleanTech': 'from-green-500 to-green-600',
      'HealthTech': 'from-red-500 to-red-600',
      'AgriTech': 'from-yellow-500 to-yellow-600',
      'FinTech': 'from-purple-500 to-purple-600',
      'LogTech': 'from-orange-500 to-orange-600'
    }
    return colorMap[category] || 'from-gray-500 to-gray-600'
  }

  const getStageColor = (stage: string) => {
    const colorMap: { [key: string]: string } = {
      'Pre-Seed': 'bg-yellow-500/20 text-yellow-400',
      'Seed': 'bg-green-500/20 text-green-400',
      'Growth': 'bg-blue-500/20 text-blue-400',
      'Scale': 'bg-purple-500/20 text-purple-400'
    }
    return colorMap[stage] || 'bg-gray-500/20 text-gray-400'
  }

  const filteredStartups = startups.filter(startup => {
    const matchesCategory = selectedCategory === 'all' || startup.category === selectedCategory
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage
    const matchesSearch = 
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.founders.some(founder => founder.toLowerCase().includes(searchTerm.toLowerCase())) ||
      startup.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesStage && matchesSearch
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
                Startup{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Launchpad
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Discover innovative startups from our campus community. Connect with entrepreneurs, explore opportunities, and be part of the innovation ecosystem.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search startups, founders, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-black text-white">
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Stages</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage} className="bg-black text-white">
                      {stage}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-400">
                Showing {filteredStartups.length} of {startups.length} startups
              </p>
            </div>

            {/* Startups Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Startup Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold text-xl">{startup.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{startup.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getCategoryColor(startup.category)} flex items-center space-x-1`}>
                            {getCategoryIcon(startup.category)}
                            <span>{startup.category}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStageColor(startup.stage)}`}>
                            {startup.stage}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6">{startup.description}</p>

                    {/* Startup Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-white font-semibold">Funding</span>
                        </div>
                        <p className="text-green-400 font-bold">{startup.funding}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-semibold">Team Size</span>
                        </div>
                        <p className="text-blue-400 font-bold">{startup.employees} people</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-semibold">Founded</span>
                        </div>
                        <p className="text-purple-400 font-bold">{startup.foundedYear}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          <span className="text-white font-semibold">Location</span>
                        </div>
                        <p className="text-orange-400 font-bold text-sm">{startup.location}</p>
                      </div>
                    </div>

                    {/* Founders */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <User className="w-5 h-5 text-cyan-400" />
                        <span>Founders</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.founders.map((founder, idx) => (
                          <span key={idx} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                            {founder}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span>Key Achievements</span>
                      </h4>
                      <div className="space-y-2">
                        {startup.achievements.slice(0, 3).map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <Trophy className="w-3 h-3 text-yellow-400" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <a 
                          href={`mailto:${startup.email}`}
                          className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Email</span>
                        </a>
                        {startup.phone && (
                          <a 
                            href={`tel:${startup.phone}`}
                            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">Call</span>
                          </a>
                        )}
                        {startup.website && (
                          <a 
                            href={startup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upcoming Events */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-cyan-400" />
                <span>Upcoming Events</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                  >
                    <h3 className="text-white font-bold text-lg mb-2">{event.name}</h3>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                        {event.type}
                      </span>
                      <span className="text-cyan-400 text-sm">
                        {event.registrations}/{event.maxParticipants} registered
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 border-t border-white/10">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="tracking-tighter text-white font-sans text-3xl font-bold mb-4">
                Ecosystem Overview
              </h2>
              <p className="text-gray-400">Our thriving startup ecosystem at a glance</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{startups.length}</h3>
                <p className="text-gray-400">Active Startups</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">₹4.5 Cr</h3>
                <p className="text-gray-400">Total Funding</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{startups.reduce((acc, s) => acc + s.employees, 0)}</h3>
                <p className="text-gray-400">Jobs Created</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{categories.length}</h3>
                <p className="text-gray-400">Industry Sectors</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LaunchpadPage
