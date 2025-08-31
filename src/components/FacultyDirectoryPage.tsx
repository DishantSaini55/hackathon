import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Search,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  Building,
  Users
} from 'lucide-react'

interface Faculty {
  id: string
  name: string
  designation: string
  department: string
  email: string
  phone: string
  office: string
  officeHours: string
  specialization: string[]
  experience: string
  education: string
  image: string
  researchAreas: string[]
  publications: number
}

const FacultyDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDesignation, setSelectedDesignation] = useState('all')

  const faculties: Faculty[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar Singh',
      designation: 'Professor & Head',
      department: 'Computer Science Engineering',
      email: 'rajesh.singh@university.edu',
      phone: '+91 98765 43210',
      office: 'CS Building, Room 201',
      officeHours: 'Mon-Fri: 10:00 AM - 4:00 PM',
      specialization: ['Machine Learning', 'Data Science', 'AI'],
      experience: '15 years',
      education: 'Ph.D. Computer Science, IIT Delhi',
      image: '/api/placeholder/150/150',
      researchAreas: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
      publications: 45
    },
    {
      id: '2',
      name: 'Prof. Priya Sharma',
      designation: 'Associate Professor',
      department: 'Electronics & Communication',
      email: 'priya.sharma@university.edu',
      phone: '+91 98765 43211',
      office: 'ECE Building, Room 105',
      officeHours: 'Mon-Wed-Fri: 2:00 PM - 5:00 PM',
      specialization: ['Signal Processing', 'Communication Systems'],
      experience: '12 years',
      education: 'Ph.D. Electronics, IIT Bombay',
      image: '/api/placeholder/150/150',
      researchAreas: ['Digital Signal Processing', '5G Communication', 'IoT'],
      publications: 32
    },
    {
      id: '3',
      name: 'Dr. Amit Patel',
      designation: 'Assistant Professor',
      department: 'Mechanical Engineering',
      email: 'amit.patel@university.edu',
      phone: '+91 98765 43212',
      office: 'ME Building, Room 301',
      officeHours: 'Tue-Thu: 11:00 AM - 3:00 PM',
      specialization: ['Thermal Engineering', 'CAD/CAM'],
      experience: '8 years',
      education: 'Ph.D. Mechanical Engineering, IIT Kanpur',
      image: '/api/placeholder/150/150',
      researchAreas: ['Heat Transfer', 'Manufacturing Technology', 'CFD'],
      publications: 18
    },
    {
      id: '4',
      name: 'Dr. Sunita Gupta',
      designation: 'Professor',
      department: 'Civil Engineering',
      email: 'sunita.gupta@university.edu',
      phone: '+91 98765 43213',
      office: 'CE Building, Room 202',
      officeHours: 'Mon-Fri: 9:00 AM - 12:00 PM',
      specialization: ['Structural Engineering', 'Earthquake Engineering'],
      experience: '18 years',
      education: 'Ph.D. Structural Engineering, IIT Roorkee',
      image: '/api/placeholder/150/150',
      researchAreas: ['Seismic Design', 'Concrete Technology', 'Structural Dynamics'],
      publications: 52
    },
    {
      id: '5',
      name: 'Prof. Rohit Verma',
      designation: 'Associate Professor',
      department: 'Electrical Engineering',
      email: 'rohit.verma@university.edu',
      phone: '+91 98765 43214',
      office: 'EE Building, Room 401',
      officeHours: 'Mon-Wed-Fri: 1:00 PM - 4:00 PM',
      specialization: ['Power Systems', 'Renewable Energy'],
      experience: '10 years',
      education: 'Ph.D. Electrical Engineering, IIT Kharagpur',
      image: '/api/placeholder/150/150',
      researchAreas: ['Smart Grid', 'Solar Energy', 'Power Electronics'],
      publications: 28
    },
    {
      id: '6',
      name: 'Dr. Neha Jain',
      designation: 'Assistant Professor',
      department: 'Information Technology',
      email: 'neha.jain@university.edu',
      phone: '+91 98765 43215',
      office: 'IT Building, Room 102',
      officeHours: 'Tue-Thu: 10:00 AM - 2:00 PM',
      specialization: ['Database Systems', 'Web Technologies'],
      experience: '6 years',
      education: 'Ph.D. Information Technology, NIT Trichy',
      image: '/api/placeholder/150/150',
      researchAreas: ['Big Data', 'Cloud Computing', 'Database Security'],
      publications: 15
    }
  ]

  const departments = [
    'Computer Science Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology'
  ]

  const designations = [
    'Professor & Head',
    'Professor',
    'Associate Professor',
    'Assistant Professor'
  ]

  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
      faculty.researchAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment
    const matchesDesignation = selectedDesignation === 'all' || faculty.designation === selectedDesignation
    
    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const getDepartmentShort = (department: string) => {
    const shortNames: { [key: string]: string } = {
      'Computer Science Engineering': 'CSE',
      'Electronics & Communication': 'ECE',
      'Mechanical Engineering': 'ME',
      'Civil Engineering': 'CE',
      'Electrical Engineering': 'EE',
      'Information Technology': 'IT'
    }
    return shortNames[department] || department
  }

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case 'Professor & Head': return 'from-purple-500 to-purple-600'
      case 'Professor': return 'from-blue-500 to-blue-600'
      case 'Associate Professor': return 'from-green-500 to-green-600'
      case 'Assistant Professor': return 'from-cyan-500 to-cyan-600'
      default: return 'from-gray-500 to-gray-600'
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
                Faculty{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Directory
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Connect with our distinguished faculty members across all departments. Find contact information, office hours, and research interests.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search faculty, department, or research area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-black text-white">
                      {getDepartmentShort(dept)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Designations</option>
                  {designations.map(designation => (
                    <option key={designation} value={designation} className="bg-black text-white">
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-400">
                Showing {filteredFaculties.length} of {faculties.length} faculty members
              </p>
            </div>

            {/* Faculty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFaculties.map((faculty, index) => (
                <motion.div
                  key={faculty.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Faculty Image & Basic Info */}
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">{faculty.name}</h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getDesignationColor(faculty.designation)}`}>
                          {faculty.designation}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Building className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{getDepartmentShort(faculty.department)}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{faculty.office}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-300">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{faculty.officeHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="px-6 pb-4 space-y-2">
                    <a 
                      href={`mailto:${faculty.email}`}
                      className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{faculty.email}</span>
                    </a>
                    <a 
                      href={`tel:${faculty.phone}`}
                      className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{faculty.phone}</span>
                    </a>
                  </div>

                  {/* Specializations */}
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {faculty.specialization.slice(0, 3).map((spec, idx) => (
                        <span 
                          key={idx}
                          className="bg-white/10 text-white px-2 py-1 rounded-full text-xs"
                        >
                          {spec}
                        </span>
                      ))}
                      {faculty.specialization.length > 3 && (
                        <span className="bg-white/10 text-white px-2 py-1 rounded-full text-xs">
                          +{faculty.specialization.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="px-6 pb-6 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span className="text-white font-bold">{faculty.publications}</span>
                        </div>
                        <p className="text-gray-400 text-xs">Publications</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <GraduationCap className="w-4 h-4 text-green-400" />
                          <span className="text-white font-bold">{faculty.experience}</span>
                        </div>
                        <p className="text-gray-400 text-xs">Experience</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredFaculties.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">No faculty members found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Department Statistics */}
        <section className="py-16 border-t border-white/10">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="tracking-tighter text-white font-sans text-3xl font-bold mb-4">
                Department Overview
              </h2>
              <p className="text-gray-400">Faculty distribution across different departments</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {departments.map((dept, index) => {
                const facultyCount = faculties.filter(f => f.department === dept).length
                return (
                  <motion.div
                    key={dept}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{facultyCount}</h3>
                    <p className="text-gray-400 text-sm">{getDepartmentShort(dept)}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FacultyDirectoryPage
