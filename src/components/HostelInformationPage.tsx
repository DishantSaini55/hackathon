import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  MapPin, 
  Users, 
  Wifi, 
  Utensils,
  Shield,
  Bed,
  Bath,
  Zap,
  Phone,
  User,
  Building,
  Star
} from 'lucide-react'

interface Hostel {
  id: string
  name: string
  type: 'boys' | 'girls'
  capacity: number
  occupied: number
  warden: string
  wardenPhone: string
  location: string
  facilities: string[]
  roomTypes: RoomType[]
  image: string
  rating: number
  description: string
}

interface RoomType {
  type: string
  capacity: number
  available: number
  fee: number
  amenities: string[]
}

const HostelInformationPage = () => {
  const [selectedType, setSelectedType] = useState('all')

  const hostels: Hostel[] = [
    {
      id: '1',
      name: 'Raman Hostel',
      type: 'boys',
      capacity: 400,
      occupied: 385,
      warden: 'Dr. Rajesh Kumar',
      wardenPhone: '+91 98765 43210',
      location: 'Near Main Gate, Block A',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Recreation Room', 'Gym', 'Library'],
      roomTypes: [
        {
          type: 'Single AC',
          capacity: 50,
          available: 5,
          fee: 25000,
          amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Single Non-AC',
          capacity: 150,
          available: 8,
          fee: 18000,
          amenities: ['Fan', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared AC',
          capacity: 100,
          available: 2,
          fee: 15000,
          amenities: ['AC', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared Non-AC',
          capacity: 100,
          available: 0,
          fee: 12000,
          amenities: ['Fan', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        }
      ],
      image: '/api/placeholder/400/250',
      rating: 4.2,
      description: 'Modern hostel with excellent facilities and close proximity to academic buildings.'
    },
    {
      id: '2',
      name: 'Kalpana Chawla Hostel',
      type: 'girls',
      capacity: 350,
      occupied: 340,
      warden: 'Dr. Priya Sharma',
      wardenPhone: '+91 98765 43211',
      location: 'Near Library, Block B',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Common Room', 'Gym', 'Medical Room'],
      roomTypes: [
        {
          type: 'Single AC',
          capacity: 40,
          available: 2,
          fee: 26000,
          amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Single Non-AC',
          capacity: 120,
          available: 5,
          fee: 19000,
          amenities: ['Fan', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared AC',
          capacity: 90,
          available: 3,
          fee: 16000,
          amenities: ['AC', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared Non-AC',
          capacity: 100,
          available: 0,
          fee: 13000,
          amenities: ['Fan', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        }
      ],
      image: '/api/placeholder/400/250',
      rating: 4.5,
      description: 'Safe and secure hostel for female students with 24/7 security and modern amenities.'
    },
    {
      id: '3',
      name: 'Abdul Kalam Hostel',
      type: 'boys',
      capacity: 450,
      occupied: 430,
      warden: 'Prof. Amit Singh',
      wardenPhone: '+91 98765 43212',
      location: 'Sports Complex Area, Block C',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Sports Room', 'Study Hall', 'Canteen'],
      roomTypes: [
        {
          type: 'Single AC',
          capacity: 60,
          available: 8,
          fee: 24000,
          amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Single Non-AC',
          capacity: 180,
          available: 12,
          fee: 17000,
          amenities: ['Fan', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared AC',
          capacity: 110,
          available: 0,
          fee: 14000,
          amenities: ['AC', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared Non-AC',
          capacity: 100,
          available: 0,
          fee: 11000,
          amenities: ['Fan', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        }
      ],
      image: '/api/placeholder/400/250',
      rating: 4.0,
      description: 'Spacious hostel near sports facilities with excellent recreational amenities.'
    },
    {
      id: '4',
      name: 'Sarojini Naidu Hostel',
      type: 'girls',
      capacity: 300,
      occupied: 285,
      warden: 'Dr. Sunita Gupta',
      wardenPhone: '+91 98765 43213',
      location: 'Academic Block Area, Block D',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Reading Room', 'Yoga Hall', 'Parlour'],
      roomTypes: [
        {
          type: 'Single AC',
          capacity: 30,
          available: 3,
          fee: 27000,
          amenities: ['AC', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Single Non-AC',
          capacity: 100,
          available: 8,
          fee: 20000,
          amenities: ['Fan', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared AC',
          capacity: 85,
          available: 4,
          fee: 17000,
          amenities: ['AC', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        },
        {
          type: 'Shared Non-AC',
          capacity: 85,
          available: 0,
          fee: 14000,
          amenities: ['Fan', 'Shared Bathroom', 'Study Table', 'Wardrobe', 'WiFi']
        }
      ],
      image: '/api/placeholder/400/250',
      rating: 4.3,
      description: 'Peaceful hostel environment perfect for focused study and personal growth.'
    }
  ]

  const getFacilityIcon = (facility: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'WiFi': <Wifi className="w-5 h-5" />,
      'Mess': <Utensils className="w-5 h-5" />,
      'Laundry': <Bath className="w-5 h-5" />,
      'Recreation Room': <Users className="w-5 h-5" />,
      'Gym': <Zap className="w-5 h-5" />,
      'Library': <Home className="w-5 h-5" />,
      'Common Room': <Users className="w-5 h-5" />,
      'Medical Room': <Shield className="w-5 h-5" />,
      'Sports Room': <Zap className="w-5 h-5" />,
      'Study Hall': <Home className="w-5 h-5" />,
      'Canteen': <Utensils className="w-5 h-5" />,
      'Reading Room': <Home className="w-5 h-5" />,
      'Yoga Hall': <Zap className="w-5 h-5" />,
      'Parlour': <Users className="w-5 h-5" />
    }
    return iconMap[facility] || <Home className="w-5 h-5" />
  }

  const getTypeColor = (type: string) => {
    return type === 'boys' ? 'from-blue-500 to-blue-600' : 'from-pink-500 to-pink-600'
  }

  const filteredHostels = hostels.filter(hostel => 
    selectedType === 'all' || hostel.type === selectedType
  )

  const getAvailabilityStatus = (available: number) => {
    if (available === 0) return { text: 'Full', color: 'text-red-400' }
    if (available <= 5) return { text: 'Limited', color: 'text-yellow-400' }
    return { text: 'Available', color: 'text-green-400' }
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
                Hostel{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Information
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Find your home away from home. Explore our comfortable and secure hostel accommodations with modern amenities and facilities.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {[
                { id: 'all', label: 'All Hostels', icon: Building },
                { id: 'boys', label: 'Boys Hostels', icon: User },
                { id: 'girls', label: 'Girls Hostels', icon: User }
              ].map(filter => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(filter.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    selectedType === filter.id
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <filter.icon className="w-5 h-5" />
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Hostels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredHostels.map((hostel, index) => (
                <motion.div
                  key={hostel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Hostel Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold text-xl">{hostel.name}</h3>
                          <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getTypeColor(hostel.type)}`}>
                            {hostel.type === 'boys' ? 'Boys' : 'Girls'}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-300 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hostel.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{hostel.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6">{hostel.description}</p>

                    {/* Occupancy Info */}
                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">Occupancy</span>
                        <span className="text-cyan-400">{hostel.occupied} / {hostel.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(hostel.occupied / hostel.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Warden Info */}
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Warden: {hostel.warden}</p>
                          <a href={`tel:${hostel.wardenPhone}`} className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                            {hostel.wardenPhone}
                          </a>
                        </div>
                      </div>
                      <a 
                        href={`tel:${hostel.wardenPhone}`}
                        className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-white" />
                      </a>
                    </div>

                    {/* Facilities */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Facilities</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {hostel.facilities.map((facility, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-300 text-sm">
                            {getFacilityIcon(facility)}
                            <span>{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Room Types */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Room Types & Availability</h4>
                      <div className="space-y-3">
                        {hostel.roomTypes.map((room, idx) => {
                          const availability = getAvailabilityStatus(room.available)
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                              <div>
                                <p className="text-white font-medium">{room.type}</p>
                                <p className="text-gray-400 text-sm">₹{room.fee.toLocaleString()}/semester</p>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${availability.color}`}>{availability.text}</p>
                                <p className="text-gray-400 text-sm">{room.available} / {room.capacity}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Overall Statistics */}
        <section className="py-16 border-t border-white/10">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="tracking-tighter text-white font-sans text-3xl font-bold mb-4">
                Hostel Statistics
              </h2>
              <p className="text-gray-400">Overview of our campus accommodation facilities</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{hostels.length}</h3>
                <p className="text-gray-400">Total Hostels</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{hostels.reduce((acc, h) => acc + h.capacity, 0)}</h3>
                <p className="text-gray-400">Total Capacity</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bed className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{hostels.reduce((acc, h) => acc + h.occupied, 0)}</h3>
                <p className="text-gray-400">Current Residents</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {hostels.reduce((acc, h) => acc + h.capacity - h.occupied, 0)}
                </h3>
                <p className="text-gray-400">Available Rooms</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HostelInformationPage
