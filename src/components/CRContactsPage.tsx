import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  Users,
  MapPin,
  Star,
  Search,
  Building,
  Calendar,
  Award,
  MessageCircle
} from 'lucide-react'

interface CR {
  id: string
  name: string
  branch: string
  semester: number
  section: string
  email: string
  phone: string
  alternatePhone?: string
  rollNumber: string
  address: string
  responsibilities: string[]
  achievements: string[]
  rating: number
  image: string
  joinedAs: string
  experience: string
}

const CRContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedSemester, setSelectedSemester] = useState('all')

  const crs: CR[] = [
    {
      id: '1',
      name: 'Arjun Sharma',
      branch: 'Computer Science Engineering',
      semester: 5,
      section: 'A',
      email: 'arjun.sharma@student.university.edu',
      phone: '+91 98765 43210',
      alternatePhone: '+91 98765 43211',
      rollNumber: 'CSE2022001',
      address: 'Room 205, Raman Hostel',
      responsibilities: ['Academic Coordination', 'Event Management', 'Student Grievances', 'Attendance Monitoring'],
      achievements: ['Best CR Award 2023', 'Academic Excellence', 'Leadership Certificate'],
      rating: 4.8,
      image: '/api/placeholder/150/150',
      joinedAs: 'September 2023',
      experience: '1.5 years'
    },
    {
      id: '2',
      name: 'Priya Patel',
      branch: 'Electronics & Communication',
      semester: 6,
      section: 'B',
      email: 'priya.patel@student.university.edu',
      phone: '+91 98765 43212',
      rollNumber: 'ECE2021045',
      address: 'Room 301, Kalpana Chawla Hostel',
      responsibilities: ['Lab Coordination', 'Project Management', 'Peer Support', 'Faculty Liaison'],
      achievements: ['Outstanding Student Leader', 'Technical Event Coordinator', 'Merit Scholarship'],
      rating: 4.9,
      image: '/api/placeholder/150/150',
      joinedAs: 'August 2022',
      experience: '2 years'
    },
    {
      id: '3',
      name: 'Rahul Singh',
      branch: 'Mechanical Engineering',
      semester: 4,
      section: 'A',
      email: 'rahul.singh@student.university.edu',
      phone: '+91 98765 43213',
      rollNumber: 'ME2022087',
      address: 'Room 156, Abdul Kalam Hostel',
      responsibilities: ['Workshop Coordination', 'Safety Management', 'Equipment Handling', 'Documentation'],
      achievements: ['Safety Excellence Award', 'Workshop Leader', 'Innovation Award'],
      rating: 4.6,
      image: '/api/placeholder/150/150',
      joinedAs: 'January 2024',
      experience: '8 months'
    },
    {
      id: '4',
      name: 'Kavya Gupta',
      branch: 'Information Technology',
      semester: 7,
      section: 'A',
      email: 'kavya.gupta@student.university.edu',
      phone: '+91 98765 43214',
      rollNumber: 'IT2020023',
      address: 'Room 402, Sarojini Naidu Hostel',
      responsibilities: ['Placement Coordination', 'Industry Connect', 'Career Guidance', 'Alumni Relations'],
      achievements: ['Placement Coordinator of the Year', '100% Placement Record', 'Industry Recognition'],
      rating: 4.7,
      image: '/api/placeholder/150/150',
      joinedAs: 'July 2021',
      experience: '3 years'
    },
    {
      id: '5',
      name: 'Vikash Kumar',
      branch: 'Civil Engineering',
      semester: 3,
      section: 'B',
      email: 'vikash.kumar@student.university.edu',
      phone: '+91 98765 43215',
      rollNumber: 'CE2023056',
      address: 'Room 234, Raman Hostel',
      responsibilities: ['Field Work Coordination', 'Survey Management', 'Resource Planning', 'Team Leadership'],
      achievements: ['Best Newcomer CR', 'Field Work Excellence', 'Team Player Award'],
      rating: 4.5,
      image: '/api/placeholder/150/150',
      joinedAs: 'December 2023',
      experience: '4 months'
    },
    {
      id: '6',
      name: 'Anjali Verma',
      branch: 'Electrical Engineering',
      semester: 8,
      section: 'A',
      email: 'anjali.verma@student.university.edu',
      phone: '+91 98765 43216',
      rollNumber: 'EE2020012',
      address: 'Room 501, Kalpana Chawla Hostel',
      responsibilities: ['Final Year Projects', 'Industry Visits', 'Seminar Organization', 'Career Counseling'],
      achievements: ['Senior Student Leader', 'Project Excellence Award', 'Mentorship Recognition'],
      rating: 4.8,
      image: '/api/placeholder/150/150',
      joinedAs: 'August 2020',
      experience: '4 years'
    }
  ]

  const branches = [
    'Computer Science Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Information Technology',
    'Civil Engineering',
    'Electrical Engineering'
  ]

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  const getBranchShort = (branch: string) => {
    const shortNames: { [key: string]: string } = {
      'Computer Science Engineering': 'CSE',
      'Electronics & Communication': 'ECE',
      'Mechanical Engineering': 'ME',
      'Information Technology': 'IT',
      'Civil Engineering': 'CE',
      'Electrical Engineering': 'EE'
    }
    return shortNames[branch] || branch
  }

  const getBranchColor = (branch: string) => {
    const colorMap: { [key: string]: string } = {
      'Computer Science Engineering': 'from-blue-500 to-blue-600',
      'Electronics & Communication': 'from-purple-500 to-purple-600',
      'Mechanical Engineering': 'from-orange-500 to-orange-600',
      'Information Technology': 'from-green-500 to-green-600',
      'Civil Engineering': 'from-yellow-500 to-yellow-600',
      'Electrical Engineering': 'from-red-500 to-red-600'
    }
    return colorMap[branch] || 'from-gray-500 to-gray-600'
  }

  const filteredCRs = crs.filter(cr => {
    const matchesSearch = 
      cr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cr.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cr.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cr.responsibilities.some(resp => resp.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesBranch = selectedBranch === 'all' || cr.branch === selectedBranch
    const matchesSemester = selectedSemester === 'all' || cr.semester.toString() === selectedSemester
    
    return matchesSearch && matchesBranch && matchesSemester
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
                CR{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Contacts
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
                Connect with your Class Representatives across all departments. Get help with academic matters, events, and student concerns.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search CRs, branches, or responsibilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch} className="bg-black text-white">
                      {getBranchShort(branch)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="all" className="bg-black text-white">All Semesters</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem.toString()} className="bg-black text-white">
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-400">
                Showing {filteredCRs.length} of {crs.length} Class Representatives
              </p>
            </div>

            {/* CRs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCRs.map((cr, index) => (
                <motion.div
                  key={cr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* CR Header */}
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-bold text-xl">{cr.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{cr.rating}</span>
                          </div>
                        </div>
                        <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getBranchColor(cr.branch)} mb-2`}>
                          {getBranchShort(cr.branch)} - Sem {cr.semester} ({cr.section})
                        </div>
                        <p className="text-gray-400 text-sm">{cr.rollNumber}</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                      <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <a 
                          href={`tel:${cr.phone}`}
                          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{cr.phone}</span>
                        </a>
                        {cr.alternatePhone && (
                          <a 
                            href={`tel:${cr.alternatePhone}`}
                            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{cr.alternatePhone} (Alt)</span>
                          </a>
                        )}
                        <a 
                          href={`mailto:${cr.email}`}
                          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{cr.email}</span>
                        </a>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{cr.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-green-400" />
                        <span>Key Responsibilities</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cr.responsibilities.map((responsibility, idx) => (
                          <div key={idx} className="bg-white/10 text-white px-3 py-2 rounded-lg text-sm">
                            {responsibility}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span>Achievements</span>
                      </h4>
                      <div className="space-y-2">
                        {cr.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience & Tenure */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-white/10 rounded-xl">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span className="text-white font-bold">{cr.experience}</span>
                        </div>
                        <p className="text-gray-400 text-xs">Experience</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <User className="w-4 h-4 text-green-400" />
                          <span className="text-white font-bold text-sm">{cr.joinedAs}</span>
                        </div>
                        <p className="text-gray-400 text-xs">Joined As CR</p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3 mt-6">
                      <a 
                        href={`tel:${cr.phone}`}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </a>
                      <a 
                        href={`mailto:${cr.email}`}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </a>
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredCRs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">No CRs found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters</p>
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
                CR Network Overview
              </h2>
              <p className="text-gray-400">Your student representatives across all departments</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{crs.length}</h3>
                <p className="text-gray-400">Active CRs</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{branches.length}</h3>
                <p className="text-gray-400">Departments</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{semesters.length}</h3>
                <p className="text-gray-400">Semesters</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {(crs.reduce((acc, cr) => acc + cr.rating, 0) / crs.length).toFixed(1)}
                </h3>
                <p className="text-gray-400">Avg Rating</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CRContactsPage
