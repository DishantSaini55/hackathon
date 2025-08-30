import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  X,
  Star,
  Music,
  Code,
  Palette,
  Mic,
  BookOpen,
  Zap,
  Target,
  Trophy,
  Shield,
  Monitor,
  Briefcase,
  Heart,
  Instagram
} from 'lucide-react'

interface SocietyInfo {
  id: number
  name: string
  category: string
  description: string
  instagram: string
  icon: any
}

const Society = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const societies: SocietyInfo[] = [
    // Technical Societies
    {
      id: 1,
      name: "GDSC",
      category: "Technical",
      description: "Google Developer Student Club - Building solutions for local communities with Google technologies.",
      instagram: "https://www.instagram.com/gdsc_nsut/",
      icon: Code
    },
    {
      id: 2,
      name: "CLITCH",
      category: "Technical", 
      description: "Technical society focused on innovation and technology development.",
      instagram: "https://www.instagram.com/clitchnsut/",
      icon: Zap
    },
    {
      id: 3,
      name: "DEVCOMM",
      category: "Technical",
      description: "Developer community promoting software development and open source contributions.",
      instagram: "https://www.instagram.com/devcomm.nsut/",
      icon: Code
    },
    {
      id: 4,
      name: "IEEE",
      category: "Technical",
      description: "IEEE NSUT Student Branch - Advancing technology for humanity through innovative projects.",
      instagram: "https://www.instagram.com/ieee_nsut/",
      icon: Zap
    },
    {
      id: 5,
      name: "DCODE",
      category: "Technical",
      description: "Competitive programming society focused on algorithmic challenges and coding contests.",
      instagram: "https://www.instagram.com/dcode_nsut/",
      icon: Code
    },
    {
      id: 6,
      name: "HACKETHIX",
      category: "Technical",
      description: "Ethical hacking and cybersecurity society focusing on security research.",
      instagram: "https://www.instagram.com/hackethix/",
      icon: Shield
    },
    {
      id: 7,
      name: "TDS",
      category: "Technical",
      description: "The Debugging Society - Dedicated to problem-solving and programming excellence.",
      instagram: "https://www.instagram.com/thedebuggingsocietynsut/",
      icon: Target
    },
    {
      id: 8,
      name: "CSI",
      category: "Technical",
      description: "Computer Society of India - Promoting computer science education and professional development.",
      instagram: "https://www.instagram.com/csi.nsut/",
      icon: Monitor
    },
    {
      id: 9,
      name: "ARESROBOTICS",
      category: "Technical",
      description: "Advanced robotics and automation society focusing on robotic innovations.",
      instagram: "https://www.instagram.com/aresrobotics.nsut/",
      icon: Target
    },
    {
      id: 10,
      name: "TEAMKALPANA",
      category: "Technical",
      description: "Technical team focused on space and aerospace projects.",
      instagram: "https://www.instagram.com/teamkalpanansut/",
      icon: Target
    },

    // Business & Entrepreneurship
    {
      id: 11,
      name: "ECELL",
      category: "Business",
      description: "Entrepreneurship Cell - Fostering entrepreneurial spirit and startup ecosystem.",
      instagram: "https://www.instagram.com/ecell.nsut/",
      icon: Briefcase
    },
    {
      id: 12,
      name: "FINSOC",
      category: "Business",
      description: "Finance Society - Promoting financial literacy and investment knowledge.",
      instagram: "https://www.instagram.com/finsoc.nsut/",
      icon: Star
    },
    {
      id: 13,
      name: "180DC",
      category: "Business",
      description: "180 Degrees Consulting - Pro-bono consulting services to social impact organizations.",
      instagram: "https://www.instagram.com/180dcnsut/",
      icon: Users
    },

    // Cultural Societies
    {
      id: 14,
      name: "CRESCENDO",
      category: "Cultural",
      description: "Music society promoting musical excellence through performances and concerts.",
      instagram: "https://www.instagram.com/crescendonsut/",
      icon: Music
    },
    {
      id: 15,
      name: "JUNOON",
      category: "Cultural",
      description: "Cultural society celebrating passion for arts and creative expression.",
      instagram: "https://www.instagram.com/junoon.nsut/",
      icon: Star
    },
    {
      id: 16,
      name: "INTAGLIOS",
      category: "Cultural",
      description: "Fine arts and creative design society focusing on visual arts.",
      instagram: "https://www.instagram.com/intaglios.nsut/",
      icon: Palette
    },
    {
      id: 17,
      name: "MUDRAKALA",
      category: "Cultural",
      description: "Traditional and contemporary dance society celebrating diverse dance forms.",
      instagram: "https://www.instagram.com/mudrakala.nsut/",
      icon: Users
    },
    {
      id: 18,
      name: "MIRAGEDANCECREW",
      category: "Cultural",
      description: "Contemporary dance group specializing in modern choreography and hip-hop.",
      instagram: "https://www.instagram.com/miragedancecrew.nsut/",
      icon: Users
    },
    {
      id: 19,
      name: "CANVAS",
      category: "Cultural",
      description: "Visual arts and painting society promoting creativity through artistic mediums.",
      instagram: "https://www.instagram.com/canvasnsut/",
      icon: Palette
    },
    {
      id: 20,
      name: "SHAKESJEER",
      category: "Cultural",
      description: "Drama and theatre society bringing literature to life through performances.",
      instagram: "https://www.instagram.com/shakesjeer.nsut/",
      icon: Mic
    },
    {
      id: 21,
      name: "ANTARMANN",
      category: "Cultural",
      description: "Cultural society promoting inner expression and artistic development.",
      instagram: "https://www.instagram.com/antarmann.nsut/",
      icon: Star
    },
    {
      id: 22,
      name: "IGTS",
      category: "Cultural",
      description: "Cultural society promoting traditional and modern cultural activities.",
      instagram: "https://www.instagram.com/igts_nsut/",
      icon: Users
    },
    {
      id: 23,
      name: "DHIRAH",
      category: "Cultural",
      description: "Cultural society focusing on traditional arts and cultural preservation.",
      instagram: "https://www.instagram.com/dhirah_nsut/",
      icon: Star
    },
    {
      id: 24,
      name: "CAPELLA",
      category: "Cultural",
      description: "Musical society promoting vocal performances and musical excellence.",
      instagram: "https://www.instagram.com/capella.nsut/",
      icon: Music
    },

    // Literary & Debate
    {
      id: 25,
      name: "DEBSOC",
      category: "Literary",
      description: "Debate Society - Promoting eloquence and critical thinking through debates.",
      instagram: "https://www.instagram.com/debsocnsut/",
      icon: Mic
    },
    {
      id: 26,
      name: "ENAC",
      category: "Literary",
      description: "English Narrative and Creative Writing - Literary society fostering creative writing.",
      instagram: "https://www.instagram.com/enac.nsut/",
      icon: BookOpen
    },

    // Social Service & Community
    {
      id: 27,
      name: "ROTARACT",
      category: "Social Service",
      description: "Service above self through community development and humanitarian work.",
      instagram: "https://www.instagram.com/rotaract_nsut/",
      icon: Heart
    },
    {
      id: 28,
      name: "AAGAAZ",
      category: "Social Service",
      description: "Social initiative society focusing on community outreach and awareness.",
      instagram: "https://www.instagram.com/aagaaznsut/",
      icon: Users
    },
    {
      id: 29,
      name: "ASN",
      category: "Social Service",
      description: "Social service organization promoting community welfare and development.",
      instagram: "https://www.instagram.com/asn.nsut/",
      icon: Heart
    },
    {
      id: 30,
      name: "TATSAM",
      category: "Social Service",
      description: "Social awareness and community service organization.",
      instagram: "https://www.instagram.com/tatsam.nsut/",
      icon: Users
    },

    // Special Interest & Multi-disciplinary
    {
      id: 31,
      name: "CROSSLINKS",
      category: "Networking",
      description: "Networking society connecting students with professionals and alumni.",
      instagram: "https://www.instagram.com/crosslinks.nsut/",
      icon: Users
    },
    {
      id: 32,
      name: "ASHWAMEDH",
      category: "Multi-disciplinary",
      description: "Multi-disciplinary society promoting diverse academic interests.",
      instagram: "https://www.instagram.com/ashwamedh.nsut/",
      icon: BookOpen
    },
    {
      id: 33,
      name: "IIF",
      category: "Multi-disciplinary",
      description: "Innovation and entrepreneurship focused society.",
      instagram: "https://www.instagram.com/iifnsut/",
      icon: Star
    },
    {
      id: 34,
      name: "FES",
      category: "Multi-disciplinary",
      description: "Student organization promoting academic and co-curricular excellence.",
      instagram: "https://www.instagram.com/fes.nsut/",
      icon: Users
    },
    {
      id: 35,
      name: "AXIOM",
      category: "Multi-disciplinary",
      description: "Student society promoting logical thinking and problem-solving.",
      instagram: "https://www.instagram.com/axiomnsut/",
      icon: Target
    },
    {
      id: 36,
      name: "VAJRA",
      category: "Multi-disciplinary",
      description: "Student organization focused on strength, determination and excellence.",
      instagram: "https://www.instagram.com/vajra.nsut/",
      icon: Star
    },
    {
      id: 37,
      name: "NAKSHATRA",
      category: "Multi-disciplinary",
      description: "Student society promoting academic and cultural activities.",
      instagram: "https://www.instagram.com/nakshatra_nsut/",
      icon: Star
    },
    {
      id: 38,
      name: "VENATUS",
      category: "Gaming",
      description: "Gaming and esports society promoting competitive gaming culture.",
      instagram: "https://www.instagram.com/venatusnsut/",
      icon: Trophy
    }
  ]

  const categories = ['All', 'Technical', 'Business', 'Cultural', 'Literary', 'Social Service', 'Networking', 'Multi-disciplinary', 'Gaming']

  const filteredSocieties = selectedCategory === 'All' 
    ? societies 
    : societies.filter(society => society.category === selectedCategory)

  const openInstagram = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">NSUT Societies & Clubs</h2>
                  <p className="text-yellow-100">Connect with student organizations and communities</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  <X size={32} />
                </motion.button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Societies Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSocieties.map((society) => (
                  <motion.div
                    key={society.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-yellow-500 rounded-xl">
                        <society.icon size={24} className="text-black" />
                      </div>
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        {society.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{society.name}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {society.description}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openInstagram(society.instagram)}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                    >
                      <Instagram size={20} />
                      Follow on Instagram
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <p className="text-center text-gray-400 text-sm">
                Total Societies: {filteredSocieties.length} • Connect with the communities that inspire you
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Society
