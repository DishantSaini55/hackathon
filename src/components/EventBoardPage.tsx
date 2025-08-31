import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User,
  X
} from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  time: string
  venue: string
  organizer: string
  category: string
  description: string
  color: string
}

const EventBoardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)) // August 2025
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const events: Event[] = [
    {
      id: 1,
      title: "180DC - Orientation",
      date: "6 Aug, 2025",
      time: "16:00",
      venue: "Mini Audi (Second Floor)",
      organizer: "180 Degrees Consulting NSUT",
      category: "ORIENTATION",
      description: "180 Degrees Consulting NSUT is hosting its orientation for freshers. Curious about consulting? Wondering who we are and what we actually do? Come find out what 180DC is all about, how we blend business thinking with strategy to help our clients grow. Join us to explore the world of consulting and to meet our team. From impactful projects to real-world experience, this is your chance to be part of something bigger.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "TDR orientation",
      date: "6 Aug, 2025",
      time: "18:30",
      venue: "Main Audi (Second Floor)",
      organizer: "Team Daedalus Racing",
      category: "ORIENTATION",
      description: "TDR – Team Daedalus Racing, the official ATV (All-Terrain Vehicle) team of NSUT, is hosting its orientation for freshers. Curious about how a 200+ kg machine runs over rocks, mud, and steep slopes? Ever wondered what it's like to design, manufacture, and race an off-road vehicle from scratch? Join us and dive into the world of engineering, adrenaline, and teamwork. TDR is more than a team—it's a legacy of innovation, grit, and national-level glory.",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "MINET orientation",
      date: "7 Aug, 2025",
      time: "16:00",
      venue: "Mini Audi (Second Floor)",
      organizer: "MINET",
      category: "ORIENTATION",
      description: "MINET - The Information Networking Society of NSUT is hosting its orientation for all freshers. Interested in Machine Learning, Artificial Intelligence, Data Science or Web Development? MINET is the perfect place to dive deep into the world of technology. From hands-on workshops to cutting-edge projects, join us to explore infinite possibilities in tech. Discover how we're shaping the future, one algorithm at a time!",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Troupe Mania",
      date: "8 Aug, 2025",
      time: "17:00",
      venue: "Main Audi (Second Floor)",
      organizer: "Cultural Society",
      category: "EVENT",
      description: "Get ready for Troupe Mania! A spectacular showcase of talent, creativity, and campus culture. Watch as various societies and clubs present their unique performances, from dance and music to drama and comedy. It's not just an event—it's a celebration of the diverse talents that make our campus vibrant. Come witness the magic, energy, and passion of our student community!",
      color: "from-pink-500 to-red-500"
    },
    {
      id: 5,
      title: "Orientation Programme",
      date: "9 Aug, 2025",
      time: "10:00",
      venue: "Main Audi (Second Floor)",
      organizer: "NSUT Administration",
      category: "ORIENTATION",
      description: "Official orientation programme for first-year students. Welcome to NSUT! This comprehensive orientation will introduce you to university life, academic expectations, campus resources, and student services. Meet your faculty, learn about various opportunities, and get all the information you need to start your journey successfully. Your adventure begins here!",
      color: "from-blue-500 to-indigo-600"
    }
  ]

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ORIENTATION': return 'bg-yellow-500'
      case 'SEMINAR': return 'bg-blue-500'
      case 'WORKSHOP': return 'bg-green-500'
      case 'EVENT': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
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
                Event{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Board
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Stay updated with campus events, workshops, seminars, and competitions. Never miss an opportunity to grow and network.
              </p>
            </motion.div>

            {/* Month Navigation */}
            <div className="flex items-center justify-center mb-12 space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('prev')}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-xl border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <div className="bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 rounded-full text-white font-semibold text-lg">
                <Calendar className="w-6 h-6 inline mr-3" />
                {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('next')}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-xl border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Events Grid */}
            {currentDate.getMonth() === 7 && currentDate.getFullYear() === 2025 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEvent(event)}
                    className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 min-h-[400px] cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    
                    <div className="relative z-10 p-6">
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                        {event.date}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-2xl font-bold mb-4 mt-8 leading-tight text-white">
                        {event.title}
                      </h3>

                      {/* Category Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(event.category)} text-white`}>
                        {event.category}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-6 line-clamp-4">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span>{event.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-2xl mx-auto"
                >
                  <h2 className="tracking-tighter text-white font-sans text-4xl font-bold mb-6">
                    Want your event listed?
                  </h2>
                  <p className="text-lg text-gray-400 mb-8">
                    Submit the form to get your event listed on the Event Board. (To be filled by Society POCs)
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-xl"
                  >
                    Submit Event Form
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="tracking-tighter text-white font-sans text-2xl font-bold">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-white/10 rounded-full backdrop-blur-xl border border-white/20 text-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(selectedEvent.category)} text-white`}>
                {selectedEvent.category}
              </div>
              
              <p className="text-gray-300 mb-6">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-white">Date & Time</div>
                  <div className="text-gray-400">{selectedEvent.date} at {selectedEvent.time}</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Venue</div>
                  <div className="text-gray-400">{selectedEvent.venue}</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Organizer</div>
                  <div className="text-gray-400">{selectedEvent.organizer}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventBoardPage
