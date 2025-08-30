import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Search, Filter } from 'lucide-react'

const CampusMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const buildings = [
    { id: 1, name: 'Central Library', type: 'library', x: 30, y: 40, description: 'Main library with extensive collection of books and digital resources' },
    { id: 2, name: 'Computer Science Block', type: 'academic', x: 60, y: 30, description: 'Houses CS department, labs, and faculty offices' },
    { id: 3, name: 'Mechanical Engineering', type: 'academic', x: 70, y: 60, description: 'Mechanical engineering department and workshops' },
    { id: 4, name: 'Boys Hostel 1', type: 'hostel', x: 20, y: 70, description: 'Accommodation for male students' },
    { id: 5, name: 'Girls Hostel', type: 'hostel', x: 80, y: 20, description: 'Accommodation for female students' },
    { id: 6, name: 'Administrative Block', type: 'admin', x: 50, y: 50, description: 'Main administrative offices and registrar' },
    { id: 7, name: 'Cafeteria', type: 'facility', x: 40, y: 60, description: 'Main dining facility for students and staff' },
    { id: 8, name: 'Sports Complex', type: 'facility', x: 15, y: 30, description: 'Indoor and outdoor sports facilities' },
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'library': return 'bg-blue-500'
      case 'academic': return 'bg-green-500'
      case 'hostel': return 'bg-purple-500'
      case 'admin': return 'bg-orange-500'
      case 'facility': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="map" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Interactive Campus Map
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Navigate NSUT campus with ease. Find buildings, departments, hostels, and facilities quickly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Search Locations</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search buildings..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-genie-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div className="space-y-2">
                {filteredBuildings.map((building) => (
                  <motion.button
                    key={building.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedBuilding(building)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedBuilding?.id === building.id
                        ? 'bg-genie-100 border-2 border-genie-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(building.type)} mr-3`}></div>
                      <span className="font-medium text-gray-800">{building.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Legend</h3>
              <div className="space-y-3">
                {[
                  { type: 'library', label: 'Library', color: 'bg-blue-500' },
                  { type: 'academic', label: 'Academic Buildings', color: 'bg-green-500' },
                  { type: 'hostel', label: 'Hostels', color: 'bg-purple-500' },
                  { type: 'admin', label: 'Administrative', color: 'bg-orange-500' },
                  { type: 'facility', label: 'Facilities', color: 'bg-pink-500' },
                ].map((item) => (
                  <div key={item.type} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-xl h-96 overflow-hidden">
                {/* Campus Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-300 to-green-400"></div>
                  {/* Paths */}
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-400 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-400 transform -translate-x-1/2"></div>
                </div>

                {/* Buildings */}
                {buildings.map((building) => (
                  <motion.div
                    key={building.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: building.id * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedBuilding(building)}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedBuilding?.id === building.id ? 'z-20' : 'z-10'
                    }`}
                    style={{ left: `${building.x}%`, top: `${building.y}%` }}
                  >
                    <div className={`w-6 h-6 rounded-full ${getTypeColor(building.type)} shadow-lg border-2 border-white ${
                      selectedBuilding?.id === building.id ? 'ring-4 ring-genie-400 animate-pulse' : ''
                    }`}>
                      <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-opacity duration-200 ${
                      selectedBuilding?.id === building.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}>
                      {building.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Building Details */}
              {selectedBuilding && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-genie-50 rounded-xl border border-genie-200"
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full ${getTypeColor(selectedBuilding.type)} mr-3`}></div>
                    <h4 className="text-lg font-bold text-gray-800">{selectedBuilding.name}</h4>
                  </div>
                  <p className="text-gray-600 mb-3">{selectedBuilding.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-genie-500 text-white rounded-lg hover:bg-genie-600 transition-colors duration-200"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CampusMap