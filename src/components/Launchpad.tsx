import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Search,
  X, 
  Layers,
  BookOpen,
  Coffee,
  Bus,
  Calendar,
  Calculator,
  Map,
  Mail,
  Music,
  Phone,
  PieChart,
  Settings,
  ShoppingCart,
  Star,
  Users,
  Video,
  Zap,
  Share2,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  HelpCircle
} from 'lucide-react'

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: 'Active' | 'Maintenance' | 'Beta';
  updated: string;
  features: string[];
  popular?: boolean;
}

const Launchpad: React.FC<LaunchpadProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  // Available categories
  const categories = ['All', 'Academics', 'Campus', 'Entertainment', 'Utilities']

  // Sample apps data
  const apps: App[] = [
    {
      id: '1',
      name: 'Student Portal',
      description: 'Access your academic records, course registrations, fees and examination details.',
      icon: 'layers',
      category: 'Academics',
      status: 'Active',
      updated: '2 days ago',
      features: ['Course Registration', 'Fee Payment', 'Result Access', 'Attendance Tracking'],
      popular: true
    },
    {
      id: '2',
      name: 'Library Manager',
      description: 'Browse, reserve and manage borrowed books. Check availability and due dates.',
      icon: 'book',
      category: 'Academics',
      status: 'Active',
      updated: '1 week ago',
      features: ['Book Search', 'Reservation System', 'Renewal Requests', 'Digital Access']
    },
    {
      id: '3',
      name: 'Cafeteria Order',
      description: 'Order food online from various campus cafeterias with scheduled pickup times.',
      icon: 'coffee',
      category: 'Campus',
      status: 'Active',
      updated: '3 days ago',
      features: ['Menu Browsing', 'Online Payment', 'Order Tracking', 'Pickup Scheduling'],
      popular: true
    },
    {
      id: '4',
      name: 'Transport Tracker',
      description: 'Real-time tracking of campus shuttle buses and public transport options.',
      icon: 'bus',
      category: 'Campus',
      status: 'Beta',
      updated: '5 days ago',
      features: ['Live Tracking', 'Route Information', 'Schedule Updates', 'Notifications']
    },
    {
      id: '5',
      name: 'Event Calendar',
      description: 'Stay updated with all campus events, workshops, seminars and cultural activities.',
      icon: 'calendar',
      category: 'Campus',
      status: 'Active',
      updated: '1 day ago',
      features: ['Event Listings', 'Registration', 'Reminders', 'Personalized Recommendations'],
      popular: true
    },
    {
      id: '6',
      name: 'CGPA Calculator',
      description: 'Calculate your cumulative GPA and semester GPA with course credit weighting.',
      icon: 'calculator',
      category: 'Academics',
      status: 'Active',
      updated: '2 weeks ago',
      features: ['GPA Calculation', 'Grade Tracking', 'Target Setting', 'Improvement Planning']
    },
    {
      id: '7',
      name: 'Campus Navigator',
      description: 'Interactive map to help you find your way around campus buildings and facilities.',
      icon: 'map',
      category: 'Utilities',
      status: 'Active',
      updated: '1 month ago',
      features: ['Indoor Navigation', 'Points of Interest', 'Shortest Path', 'Accessibility Options']
    },
    {
      id: '8',
      name: 'Mail Client',
      description: 'Access your university email account with enhanced features for students.',
      icon: 'mail',
      category: 'Utilities',
      status: 'Maintenance',
      updated: '2 months ago',
      features: ['Email Access', 'File Attachment', 'Calendar Integration', 'Contact Management']
    },
    {
      id: '9',
      name: 'Music Player',
      description: 'Stream and discover music created by talented students from the university.',
      icon: 'music',
      category: 'Entertainment',
      status: 'Beta',
      updated: '3 weeks ago',
      features: ['Music Streaming', 'Playlist Creation', 'Artist Discovery', 'Event Announcements']
    },
    {
      id: '10',
      name: 'Campus Directory',
      description: 'Find contact information for faculty, staff, departments and services.',
      icon: 'phone',
      category: 'Utilities',
      status: 'Active',
      updated: '2 weeks ago',
      features: ['Contact Search', 'Department Listings', 'Quick Dial', 'Email Integration']
    },
    {
      id: '11',
      name: 'Academic Analytics',
      description: 'Visualize your academic performance trends and compare with class averages.',
      icon: 'chart',
      category: 'Academics',
      status: 'Beta',
      updated: '1 month ago',
      features: ['Performance Tracking', 'Comparative Analysis', 'Goal Setting', 'Improvement Suggestions']
    },
    {
      id: '12',
      name: 'Settings Hub',
      description: 'Manage all your application preferences and account settings in one place.',
      icon: 'settings',
      category: 'Utilities',
      status: 'Active',
      updated: '1 week ago',
      features: ['Profile Management', 'Notification Settings', 'Privacy Controls', 'Theme Customization']
    },
    {
      id: '13',
      name: 'Campus Store',
      description: 'Shop for university merchandise, books, supplies and digital resources.',
      icon: 'shopping',
      category: 'Campus',
      status: 'Active',
      updated: '2 days ago',
      features: ['Product Browsing', 'Secure Checkout', 'Order Tracking', 'Wishlist']
    },
    {
      id: '14',
      name: 'Rate My Professor',
      description: 'View and submit ratings and reviews for professors and courses.',
      icon: 'star',
      category: 'Academics',
      status: 'Active',
      updated: '3 days ago',
      features: ['Professor Ratings', 'Course Reviews', 'Anonymous Feedback', 'Helpful Metrics']
    },
    {
      id: '15',
      name: 'Student Clubs',
      description: 'Discover and join student clubs, organizations and interest groups.',
      icon: 'users',
      category: 'Campus',
      status: 'Active',
      updated: '1 week ago',
      features: ['Club Directory', 'Event Calendar', 'Membership Management', 'Discussion Forums']
    },
    {
      id: '16',
      name: 'Lecture Capture',
      description: 'Access recorded lectures and educational videos for your courses.',
      icon: 'video',
      category: 'Academics',
      status: 'Active',
      updated: '4 days ago',
      features: ['Video Playback', 'Note Taking', 'Bookmarking', 'Offline Access'],
      popular: true
    },
    {
      id: '17',
      name: 'Quick Tools',
      description: 'Collection of handy utilities for students including calculator, converter, etc.',
      icon: 'zap',
      category: 'Utilities',
      status: 'Active',
      updated: '2 weeks ago',
      features: ['Scientific Calculator', 'Unit Converter', 'Note Taking', 'QR Scanner']
    },
    {
      id: '18',
      name: 'Gaming Zone',
      description: 'Relax with a collection of games developed by the university game design students.',
      icon: 'zap',
      category: 'Entertainment',
      status: 'Beta',
      updated: '1 month ago',
      features: ['Multiple Games', 'Leaderboards', 'Multiplayer Support', 'Achievement System']
    }
  ]

  // Filter apps based on search query and active category
  const filteredApps = apps.filter(app => {
    const matchesSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get popular apps
  const popularApps = apps.filter(app => app.popular);

  // Helper function to get icon component
  const getIconForApp = (iconName: string) => {
    switch (iconName) {
      case 'layers': return <Layers className="w-6 h-6 text-white" />;
      case 'book': return <BookOpen className="w-6 h-6 text-white" />;
      case 'coffee': return <Coffee className="w-6 h-6 text-white" />;
      case 'bus': return <Bus className="w-6 h-6 text-white" />;
      case 'calendar': return <Calendar className="w-6 h-6 text-white" />;
      case 'calculator': return <Calculator className="w-6 h-6 text-white" />;
      case 'map': return <Map className="w-6 h-6 text-white" />;
      case 'mail': return <Mail className="w-6 h-6 text-white" />;
      case 'music': return <Music className="w-6 h-6 text-white" />;
      case 'phone': return <Phone className="w-6 h-6 text-white" />;
      case 'chart': return <PieChart className="w-6 h-6 text-white" />;
      case 'settings': return <Settings className="w-6 h-6 text-white" />;
      case 'shopping': return <ShoppingCart className="w-6 h-6 text-white" />;
      case 'star': return <Star className="w-6 h-6 text-white" />;
      case 'users': return <Users className="w-6 h-6 text-white" />;
      case 'video': return <Video className="w-6 h-6 text-white" />;
      case 'zap': return <Zap className="w-6 h-6 text-white" />;
      default: return <Rocket className="w-6 h-6 text-white" />;
    }
  };

  // Helper function to get color for app category
  const getColorForCategory = (category: string) => {
    switch (category) {
      case 'Academics': return 'bg-blue-600/80';
      case 'Campus': return 'bg-amber-600/80';
      case 'Entertainment': return 'bg-rose-600/80';
      case 'Utilities': return 'bg-emerald-600/80';
      default: return 'bg-purple-600/80';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-400';
      case 'Maintenance': return 'bg-amber-400';
      case 'Beta': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-6 text-white relative overflow-hidden border-b border-white/10">
              {/* Cosmic particles animation */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute bg-white rounded-full z-0"
                    style={{
                      width: `${1 + Math.random() * 3}px`,
                      height: `${1 + Math.random() * 3}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.6,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, Math.random() * 10 - 5, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">Launchpad</h1>
                    <p className="text-white/90 text-lg">Quick access to all NSUT services</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Search Bar */}
              <div className="mt-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search for applications..."
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Tabs */}
              <div className="mt-6 flex items-center space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors relative overflow-hidden ${
                      activeCategory === category 
                        ? 'text-white border border-white/30 shadow-glow' 
                        : 'text-white/70 bg-white/10 hover:bg-white/20 border border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeCategory === category && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-indigo-600/50 to-blue-600/50 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layoutId="categoryBackground"
                      />
                    )}
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              {/* Popular Apps Row */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Popular Apps
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {popularApps.map((app) => (
                    <motion.div
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedApp(app)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${getColorForCategory(app.category)}`}>
                          {getIconForApp(app.icon)}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-white font-medium">{app.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(app.status)}`}></div>
                            <span className="text-white/60 text-xs ml-1">{app.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* All Apps Grid */}
              {filteredApps.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-400" />
                    {activeCategory === 'All' ? 'All Applications' : activeCategory}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredApps.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.03, 
                          boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" 
                        }}
                        onClick={() => setSelectedApp(app)}
                        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden cursor-pointer group"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${getColorForCategory(app.category)}`}>
                              {getIconForApp(app.icon)}
                            </div>
                            <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/20 text-white">
                              {app.category}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {app.name}
                          </h3>
                          <p className="text-white/70 text-sm line-clamp-3 mb-4">
                            {app.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(app.status)}`}></div>
                              <span className="text-white/80">{app.status}</span>
                            </div>
                            <motion.div 
                              whileHover={{ scale: 1.1 }} 
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center justify-center rounded-full p-1 bg-white/20 text-white"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-white/40" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No applications found</h3>
                  <p className="text-white/60 text-center max-w-md">
                    Try changing your search query or selecting a different category.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* App Detail Modal */}
          <AnimatePresence>
            {selectedApp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedApp(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-purple-500/30 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-xl ${getColorForCategory(selectedApp.category)} backdrop-blur-md`}>
                        {getIconForApp(selectedApp.icon)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-300">{selectedApp.category}</div>
                        <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedApp(null)}
                      className="p-2 hover:bg-white/10 rounded-full"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                  
                  {/* App screenshots carousel */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-black/20">
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                        backgroundSize: ['100%', '120%'],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url('https://source.unsplash.com/random/800x600?${selectedApp.category.toLowerCase()},app')`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/80 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                        App Screenshots Available in Full Version
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6 leading-relaxed">{selectedApp.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <div className="text-purple-300 text-sm mb-1">Status</div>
                      <div className="flex items-center text-white">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(selectedApp.status)}`}></div>
                        {selectedApp.status}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <div className="text-purple-300 text-sm mb-1">Last Updated</div>
                      <div className="text-white">{selectedApp.updated}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-purple-300 text-sm mb-2">Features</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedApp.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-white/80">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl px-6 py-3 flex items-center justify-center"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Launch Application
                    </motion.button>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-3"
                      >
                        <Star className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-3"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
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

export default Launchpad
