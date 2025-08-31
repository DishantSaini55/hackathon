import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Coffee, 
  Clock, 
  Users, 
  MapPin,
  Star,
  ChefHat,
  Utensils,
  DollarSign,
  Timer,
  Bell,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  rating: number
  preparationTime: number
  available: boolean
  image: string
  tags: string[]
}

interface Canteen {
  id: string
  name: string
  location: string
  openingHours: string
  phone: string
  email: string
  currentQueue: number
  averageWaitTime: number
  specialties: string[]
  rating: number
  isOpen: boolean
}

const CanteenPage = () => {
  const [selectedCanteen, setSelectedCanteen] = useState('main')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cartItems, setCartItems] = useState<string[]>([])

  const canteens: Canteen[] = [
    {
      id: 'main',
      name: 'Main Campus Canteen',
      location: 'Academic Block - Ground Floor',
      openingHours: '7:00 AM - 10:00 PM',
      phone: '+91 98765 43220',
      email: 'canteen@university.edu',
      currentQueue: 15,
      averageWaitTime: 12,
      specialties: ['North Indian', 'South Indian', 'Chinese', 'Snacks'],
      rating: 4.2,
      isOpen: true
    },
    {
      id: 'hostel',
      name: 'Hostel Mess',
      location: 'Hostel Complex',
      openingHours: '6:30 AM - 9:30 PM',
      phone: '+91 98765 43221',
      email: 'hostelmess@university.edu',
      currentQueue: 8,
      averageWaitTime: 8,
      specialties: ['Home Food', 'Regional Cuisine', 'Healthy Options'],
      rating: 4.0,
      isOpen: true
    },
    {
      id: 'cafe',
      name: 'Campus Café',
      location: 'Library Building',
      openingHours: '8:00 AM - 8:00 PM',
      phone: '+91 98765 43222',
      email: 'cafe@university.edu',
      currentQueue: 5,
      averageWaitTime: 5,
      specialties: ['Coffee', 'Beverages', 'Light Snacks', 'Pastries'],
      rating: 4.5,
      isOpen: true
    },
    {
      id: 'food-court',
      name: 'Food Court',
      location: 'Student Center',
      openingHours: '10:00 AM - 10:00 PM',
      phone: '+91 98765 43223',
      email: 'foodcourt@university.edu',
      currentQueue: 22,
      averageWaitTime: 18,
      specialties: ['Multi-Cuisine', 'Fast Food', 'Street Food', 'Desserts'],
      rating: 4.3,
      isOpen: false
    }
  ]

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Butter Chicken',
      category: 'Main Course',
      price: 180,
      description: 'Creamy tomato-based curry with tender chicken pieces',
      rating: 4.5,
      preparationTime: 15,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Popular', 'Non-Veg', 'Spicy']
    },
    {
      id: '2',
      name: 'Masala Dosa',
      category: 'South Indian',
      price: 80,
      description: 'Crispy rice crepe filled with spiced potato mixture',
      rating: 4.3,
      preparationTime: 10,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Vegetarian', 'Healthy', 'Popular']
    },
    {
      id: '3',
      name: 'Chicken Biryani',
      category: 'Rice',
      price: 220,
      description: 'Aromatic basmati rice cooked with marinated chicken and spices',
      rating: 4.7,
      preparationTime: 20,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Bestseller', 'Non-Veg', 'Aromatic']
    },
    {
      id: '4',
      name: 'Veg Thali',
      category: 'Thali',
      price: 120,
      description: 'Complete meal with dal, sabzi, rice, roti, and sweet',
      rating: 4.2,
      preparationTime: 8,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Vegetarian', 'Complete Meal', 'Value']
    },
    {
      id: '5',
      name: 'Cold Coffee',
      category: 'Beverages',
      price: 60,
      description: 'Refreshing iced coffee with cream and sugar',
      rating: 4.4,
      preparationTime: 3,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Cold', 'Refreshing', 'Quick']
    },
    {
      id: '6',
      name: 'Samosa Chat',
      category: 'Snacks',
      price: 50,
      description: 'Crispy samosas topped with chutneys and yogurt',
      rating: 4.1,
      preparationTime: 5,
      available: true,
      image: '/api/placeholder/200/150',
      tags: ['Street Food', 'Vegetarian', 'Spicy']
    }
  ]

  const categories = ['Main Course', 'South Indian', 'Rice', 'Thali', 'Beverages', 'Snacks', 'Chinese', 'Desserts']

  const getCurrentCanteen = () => canteens.find(c => c.id === selectedCanteen) || canteens[0]

  const getFilteredMenu = () => {
    return menuItems.filter(item => 
      selectedCategory === 'all' || item.category === selectedCategory
    )
  }

  const getQueueStatus = (queue: number) => {
    if (queue <= 5) return { text: 'Low', color: 'text-green-400', bgColor: 'bg-green-500/20' }
    if (queue <= 15) return { text: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' }
    return { text: 'High', color: 'text-red-400', bgColor: 'bg-red-500/20' }
  }

  const addToCart = (itemId: string) => {
    setCartItems([...cartItems, itemId])
  }

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
                Campus{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Canteen
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Discover delicious food options across campus. Check real-time wait times, browse menus, and order your favorite meals from multiple canteens.
              </p>
            </motion.div>

            {/* Canteen Selection */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {canteens.map(canteen => (
                <motion.button
                  key={canteen.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCanteen(canteen.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    selectedCanteen === canteen.id
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <Coffee className="w-5 h-5" />
                  <span>{canteen.name}</span>
                  {!canteen.isOpen && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">Closed</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Current Canteen Info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Canteen Details */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{getCurrentCanteen().name}</h2>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400">{getCurrentCanteen().rating}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          getCurrentCanteen().isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {getCurrentCanteen().isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{getCurrentCanteen().location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{getCurrentCanteen().openingHours}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <a href={`tel:${getCurrentCanteen().phone}`} className="text-cyan-400 hover:text-cyan-300">
                        {getCurrentCanteen().phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <a href={`mailto:${getCurrentCanteen().email}`} className="text-cyan-400 hover:text-cyan-300">
                        {getCurrentCanteen().email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {getCurrentCanteen().specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Queue Status */}
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center space-x-2">
                    <Timer className="w-6 h-6 text-yellow-400" />
                    <span>Live Queue Status</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">Current Queue</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">{getCurrentCanteen().currentQueue}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getQueueStatus(getCurrentCanteen().currentQueue).bgColor} ${getQueueStatus(getCurrentCanteen().currentQueue).color}`}>
                          {getQueueStatus(getCurrentCanteen().currentQueue).text}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-white font-semibold">Avg Wait Time</span>
                      </div>
                      <span className="text-2xl font-bold text-green-400">{getCurrentCanteen().averageWaitTime} min</span>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bell className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-semibold">Quick Tip</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Best time to visit: 11:30 AM - 12:00 PM or 2:30 PM - 3:30 PM for shorter queues
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <Utensils className="w-8 h-8 text-cyan-400" />
                  <span>Menu</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">Cart:</span>
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full font-bold">
                    {cartItems.length}
                  </span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  All Items
                </motion.button>
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredMenu().map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                  >
                    <div className="aspect-video bg-gradient-to-r from-cyan-400/20 to-purple-600/20 flex items-center justify-center">
                      <Utensils className="w-12 h-12 text-white/50" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{item.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400 text-sm">{item.preparationTime} min</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-lg">₹{item.price}</p>
                          {item.available ? (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Available</span>
                          ) : (
                            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Out of Stock</span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item.id)}
                        disabled={!item.available}
                        className="w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-300 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </motion.button>
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
                Campus Dining Stats
              </h2>
              <p className="text-gray-400">Overview of our campus food services</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{canteens.length}</h3>
                <p className="text-gray-400">Dining Locations</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{menuItems.length}+</h3>
                <p className="text-gray-400">Menu Items</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">4.2</h3>
                <p className="text-gray-400">Avg Rating</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">12</h3>
                <p className="text-gray-400">Avg Wait (min)</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CanteenPage
