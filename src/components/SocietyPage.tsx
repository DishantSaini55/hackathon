import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  MapPin, 
  User, 
  Mail,
  Phone,
  ExternalLink,
  Star,
  Award,
  Camera,
  Music,
  Palette,
  Code,
  BookOpen,
  Heart,
  Zap,
  Trophy
} from 'lucide-react'

interface Society {
  id: string
  name: string
  category: string
  description: string
  president: string
  contact: string
  email: string
  members: number
  established: string
  achievements: string[]
  upcomingEvents: Event[]
  image: string
  rating: number
  socialLinks: SocialLinks
}

interface Event {
  id: string
  name: string
  date: string
  venue: string
  description: string
}

interface SocialLinks {
  website?: string
  instagram?: string
  linkedin?: string
}

const SocietyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const societies: Society[] = [
    {
      id: '1',
      name: 'Coding Club',
      category: 'Technical',
      description: 'A community of passionate programmers and developers working on cutting-edge technologies and participating in competitive programming.',
      president: 'Arjun Sharma',
      contact: '+91 98765 43210',
      email: 'coding.club@university.edu',
      members: 120,
      established: '2015',
      achievements: ['Winner - Smart India Hackathon 2023', 'ICPC Regional Finalist', '50+ Open Source Contributions'],
      upcomingEvents: [
        {
          id: '1',
          name: 'HackFest 2024',
          date: '2024-03-15',
          venue: 'Computer Lab A',
          description: '48-hour hackathon with exciting prizes'
        },
        {
          id: '2',
          name: 'Tech Talk Series',
          date: '2024-03-20',
          venue: 'Auditorium',
          description: 'Industry experts sharing insights on AI/ML'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.8,
      socialLinks: {
        website: 'https://codingclub.university.edu',
        instagram: '@coding_club_uni',
        linkedin: 'coding-club-university'
      }
    },
    {
      id: '2',
      name: 'Drama Society',
      category: 'Cultural',
      description: 'Bringing stories to life through theater, drama, and performing arts. Join us for an exciting journey of creativity and expression.',
      president: 'Priya Patel',
      contact: '+91 98765 43211',
      email: 'drama.society@university.edu',
      members: 85,
      established: '2012',
      achievements: ['Best Drama Award - Inter-University Festival', 'Performed 15+ Plays', 'National Level Recognition'],
      upcomingEvents: [
        {
          id: '3',
          name: 'Annual Play - Romeo & Juliet',
          date: '2024-04-10',
          venue: 'Main Auditorium',
          description: 'Classic Shakespearean tragedy with modern twist'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.6,
      socialLinks: {
        instagram: '@drama_society_uni',
        linkedin: 'drama-society-university'
      }
    },
    {
      id: '3',
      name: 'Photography Club',
      category: 'Creative',
      description: 'Capturing moments and creating memories. Learn photography techniques, participate in photo walks, and showcase your artistic vision.',
      president: 'Rahul Singh',
      contact: '+91 98765 43212',
      email: 'photo.club@university.edu',
      members: 95,
      established: '2016',
      achievements: ['Published Photography Magazine', 'Exhibition in City Gallery', '100+ Photo Walks Organized'],
      upcomingEvents: [
        {
          id: '4',
          name: 'Nature Photography Workshop',
          date: '2024-03-25',
          venue: 'Campus Garden',
          description: 'Learn landscape and macro photography techniques'
        },
        {
          id: '5',
          name: 'Photo Exhibition',
          date: '2024-04-05',
          venue: 'Art Gallery',
          description: 'Showcase of best student photographs'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.5,
      socialLinks: {
        website: 'https://photoclub.university.edu',
        instagram: '@photo_club_uni'
      }
    },
    {
      id: '4',
      name: 'Music Society',
      category: 'Cultural',
      description: 'Harmonizing talents and creating beautiful music. From classical to contemporary, we celebrate all forms of musical expression.',
      president: 'Anjali Gupta',
      contact: '+91 98765 43213',
      email: 'music.society@university.edu',
      members: 110,
      established: '2010',
      achievements: ['State Level Music Competition Winner', 'Released Album "Campus Vibes"', 'Performed at National Events'],
      upcomingEvents: [
        {
          id: '6',
          name: 'Spring Concert',
          date: '2024-04-15',
          venue: 'Open Air Theater',
          description: 'Grand musical evening with all society members'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.7,
      socialLinks: {
        instagram: '@music_society_uni',
        linkedin: 'music-society-university'
      }
    },
    {
      id: '5',
      name: 'Robotics Club',
      category: 'Technical',
      description: 'Building the future with robotics and automation. Design, build, and program robots for various competitions and real-world applications.',
      president: 'Vikash Kumar',
      contact: '+91 98765 43214',
      email: 'robotics.club@university.edu',
      members: 75,
      established: '2017',
      achievements: ['National Robotics Championship 2023', 'Published Research Papers', 'Industry Collaboration Projects'],
      upcomingEvents: [
        {
          id: '7',
          name: 'Robo Soccer Competition',
          date: '2024-03-30',
          venue: 'Engineering Lab',
          description: 'Autonomous robots competing in soccer match'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.9,
      socialLinks: {
        website: 'https://robotics.university.edu',
        linkedin: 'robotics-club-university'
      }
    },
    {
      id: '6',
      name: 'Literary Society',
      category: 'Academic',
      description: 'Celebrating the power of words through poetry, storytelling, debates, and literary discussions. Express your thoughts and ideas.',
      president: 'Kavya Sharma',
      contact: '+91 98765 43215',
      email: 'literary.society@university.edu',
      members: 90,
      established: '2013',
      achievements: ['Published Literary Magazine', 'Poetry Slam Champions', 'Debate Competition Winners'],
      upcomingEvents: [
        {
          id: '8',
          name: 'Poetry Night',
          date: '2024-04-02',
          venue: 'Library Auditorium',
          description: 'Open mic poetry and storytelling session'
        }
      ],
      image: '/api/placeholder/300/200',
      rating: 4.4,
      socialLinks: {
        instagram: '@literary_society_uni'
      }
    }
  ]

  const categories = ['Technical', 'Cultural', 'Creative', 'Academic', 'Sports', 'Social']

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Technical': <Code className="w-5 h-5" />,
      'Cultural': <Music className="w-5 h-5" />,
      'Creative': <Palette className="w-5 h-5" />,
      'Academic': <BookOpen className="w-5 h-5" />,
      'Sports': <Trophy className="w-5 h-5" />,
      'Social': <Heart className="w-5 h-5" />
    }
    return iconMap[category] || <Users className="w-5 h-5" />
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Technical': 'from-blue-500 to-blue-600',
      'Cultural': 'from-purple-500 to-purple-600',
      'Creative': 'from-pink-500 to-pink-600',
      'Academic': 'from-green-500 to-green-600',
      'Sports': 'from-orange-500 to-orange-600',
      'Social': 'from-red-500 to-red-600'
    }
    return colorMap[category] || 'from-gray-500 to-gray-600'
  }

  const filteredSocieties = societies.filter(society => {
    const matchesCategory = selectedCategory === 'all' || society.category === selectedCategory
    const matchesSearch = 
      society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      society.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      society.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
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
                Student{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Societies
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Discover and join vibrant student communities. Explore clubs and societies that match your interests and passions, and make lasting connections.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search societies, activities, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  All
                </motion.button>
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {getCategoryIcon(category)}
                    <span>{category}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-400">
                Showing {filteredSocieties.length} of {societies.length} societies
              </p>
            </div>

            {/* Societies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredSocieties.map((society, index) => (
                <motion.div
                  key={society.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Society Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold text-xl">{society.name}</h3>
                          <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getCategoryColor(society.category)} flex items-center space-x-1`}>
                            {getCategoryIcon(society.category)}
                            <span>{society.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-300 text-sm mb-3">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{society.members} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Est. {society.established}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{society.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                        {getCategoryIcon(society.category)}
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6">{society.description}</p>

                    {/* President & Contact */}
                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">President: {society.president}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <a href={`tel:${society.contact}`} className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{society.contact}</span>
                              </a>
                              <a href={`mailto:${society.email}`} className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>Email</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span>Key Achievements</span>
                      </h4>
                      <div className="space-y-2">
                        {society.achievements.slice(0, 3).map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Events */}
                    {society.upcomingEvents.length > 0 && (
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-green-400" />
                          <span>Upcoming Events</span>
                        </h4>
                        <div className="space-y-3">
                          {society.upcomingEvents.map((event, idx) => (
                            <div key={idx} className="bg-white/10 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="text-white font-medium">{event.name}</h5>
                                <span className="text-cyan-400 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-gray-400 text-sm mb-2">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{event.venue}</span>
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm">{event.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        {society.socialLinks.website && (
                          <a 
                            href={society.socialLinks.website}
                            className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                          </a>
                        )}
                        {society.socialLinks.instagram && (
                          <a 
                            href={`https://instagram.com/${society.socialLinks.instagram.replace('@', '')}`}
                            className="p-2 bg-pink-500/20 rounded-lg hover:bg-pink-500/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Camera className="w-4 h-4 text-pink-400" />
                          </a>
                        )}
                        {society.socialLinks.linkedin && (
                          <a 
                            href={`https://linkedin.com/company/${society.socialLinks.linkedin}`}
                            className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredSocieties.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">No societies found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or explore different categories</p>
              </motion.div>
            )}
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
                Community Overview
              </h2>
              <p className="text-gray-400">Join our thriving student community</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{societies.length}</h3>
                <p className="text-gray-400">Active Societies</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{societies.reduce((acc, s) => acc + s.members, 0)}</h3>
                <p className="text-gray-400">Total Members</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {societies.reduce((acc, s) => acc + s.upcomingEvents.length, 0)}
                </h3>
                <p className="text-gray-400">Upcoming Events</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{categories.length}</h3>
                <p className="text-gray-400">Categories</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SocietyPage
