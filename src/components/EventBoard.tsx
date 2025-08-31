import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User,
  X,
  Star
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

const EventBoard = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
      title: "Nakshatra - Orientation",
      date: "6 Aug, 2025",
      time: "15:30",
      venue: "Mini Audi (First Floor)",
      organizer: "Nakshatra",
      category: "SEMINAR",
      description: "Ever wondered what lies beyond the stars... or within an equation? Join Nakshatra, The Astronomy & Mathematics Society, as we launch into a new academic orbit with our Orientation for freshers! From black holes to integrals, from equations to comics— we explore the universe, one equation at a time. Date: 6th August ⏰ Time: 3:30 PM Venue: Mini Audi Come meet like-minded stargazers and math geeks, learn what we do, and how you can be a part of this cosmic journey!",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "FES Orientation'25",
      date: "8 Aug, 2025",
      time: "16:00",
      venue: "Mini Audi (First Floor)",
      organizer: "FES",
      category: "ORIENTATION",
      description: "The Finance and Economic Society is hosting its orientation for the Batch of 2029. Ever wondered why prices rise, what causes recessions, or how a nation's budget is decided? If so, then FES is your go-to place! Discover the world of finance, economic trends and global decision-making with us. Join the FES and start decoding the story behind every price tag, policy and market shift.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Enactus - Orientation",
      date: "8 Aug, 2025",
      time: "16:00",
      venue: "APJ - 11",
      organizer: "Enactus",
      category: "ORIENTATION",
      description: "Step into a world where innovation meets impact. 🌍 Join us for the official Enactus NSUT Orientation and discover how we blend entrepreneurship with social good to create real-world change. Whether you're passionate about solving societal challenges, building meaningful projects, or collaborating with driven individuals — this is where your journey begins. 🚀 Get to know our vision, our ongoing projects, and how you can be part of the change. Let's create. Let's empower. Let's Enactus.",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 6,
      title: "Ashwamedh - Orientation",
      date: "11 Aug, 2025",
      time: "16:00",
      venue: "Main Audi (Second Floor)",
      organizer: "Ashwamedh",
      category: "ORIENTATION",
      description: "रंगमंच है हमारा घर, कितनार है हमारे दोस्त, हर कहानी में मिलती है जिंदगी की खोज। तुम आओ, बस अपने दिल की आवाज़ के साथ, यहाँ अपनेपन में कोई नहीं आगे पीछे। Freshers! Ready to raise your voice and own the artform of theatre? Ashwamedh, The dramatic society of NSUT, is hosting its orientation - and we're inviting you and your art, write, or just feel strongly about change, this is your space. We perform both artforms street theatre and stage theatre where voices rise, stories unfold, and emotions take the centre stage. Come learn how we do it, and how you can be part of the movement. 😊 Yes, The revolution has a voice and maybe you will be the leading voice of change.",
      color: "from-red-500 to-red-600"
    },
    {
      id: 7,
      title: "Crescendo Open Jam",
      date: "11 Aug, 2025",
      time: "16:00",
      venue: "Music Room (Crescendo)",
      organizer: "Crescendo",
      category: "CULTURAL FEST",
      description: "Crescendo, the official music society of NSUT is back with a bang to welcome the new batch! Sing along or dance as we mix our old school vibes with your favourite songs and let's take some steam off from the first week of college! Join us on 11th August, 2025 @ 4 PM in Smart Block Parking for golden vibes and fun times. ✨",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 8,
      title: "Spic Macay - Orientation",
      date: "12 Aug, 2025",
      time: "14:00",
      venue: "Main Audi (Second Floor)",
      organizer: "Spic Macay",
      category: "ORIENTATION",
      description: "SPIC MACAY – The Society for the Promotion of Indian Classical Art forms and Culture Amongst Youth is hosting its orientation for freshers. Join us to explore the rich tapestry of India's classical heritage. This session will introduce you to SPIC MACAY's vision, past events, and how you can be part of preserving and promoting our cultural legacy through music, dance, art, and tradition. Whether you're an enthusiast or just curious — all are welcome.",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 9,
      title: "Crescendo - Orientation",
      date: "12 Aug, 2025",
      time: "18:00",
      venue: "Main Audi (Second Floor)",
      organizer: "Crescendo",
      category: "ORIENTATION",
      description: "Crescendo – The Official Music Society of NSUT is hosting its orientation for freshers. Come be a part of the melody! This session will introduce you to the society, its vibrant culture, past performances, and upcoming opportunities. Whether you're a vocalist, instrumentalist, or just passionate about music — Crescendo welcomes you to explore, engage, and express.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 10,
      title: "Pink Wednesday",
      date: "13 Aug, 2025",
      time: "16:00",
      venue: "Between APJ and Canteen",
      organizer: "Clitch - The Fashion Society",
      category: "PR EVENT",
      description: "Pink Wednesday is an annual celebration organised by Clitch – The Fashion Society of NSUT – to welcome the incoming batch of students and introduce them to the creative spirit of the university. This year, the event will take place on 13th August, 2025, from 4:00 PM, in the open space between APJ and the canteen. The theme of the day, pink, has been chosen for its symbolism of warmth, creativity, and innocence – qualities that embody the aspirations of the new academic year. The programme aims to foster interaction between freshers and seniors while showcasing the diverse talents of the student community. Key segments of the evening will include: Fashion Showcase – A presentation by Clitch members featuring original styling concepts. Icebreaker Session – An interactive activity designed to encourage engagement and connections. Fresher's Ramp – A fresher-exclusive ramp walk, providing new students an opportunity to take the spotlight. Pink Wednesday stands as more than a welcome event; it is a platform for self-expression, inclusivity, and the celebration of individuality. It serves as the first step for many into NSUT's vibrant cultural landscape, setting the tone for a year filled with creativity and collaboration.",
      color: "from-pink-400 to-rose-500"
    }
  ]

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-6 text-white border-b border-white/10">
              <div className="flex items-center justify-between">
                <h1 className="tracking-tighter text-white font-sans text-4xl font-bold">Event Board</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-xl border border-white/20"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-xl border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <div className="bg-gradient-to-r from-cyan-400 to-purple-600 px-6 py-2 rounded-full text-white font-semibold">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-xl border border-white/20"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Show events for August 2025, otherwise show "Want your event listed?" */}
              {currentDate.getMonth() === 7 && currentDate.getFullYear() === 2025 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer relative overflow-hidden group hover:bg-white/10 transition-all duration-300"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-2 py-1 rounded-lg text-sm font-semibold z-10">
                        {event.date}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-bold mb-4 mt-8 leading-tight text-white relative z-10">
                        {event.title}
                      </h3>

                      {/* Category Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(event.category)} text-white relative z-10`}>
                        {event.category}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-4 relative z-10">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-gray-400 relative z-10">
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
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* No Events - Submit Event Form Section */
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

                  {/* Navigation arrows for empty months */}
                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigateMonth('prev')}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-xl border border-white/20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                  </div>
                  
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigateMonth('next')}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-xl border border-white/20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Event Detail Modal */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EventBoard
