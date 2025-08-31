import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  Download, 
  Star,
  Clock,
  User,
  Filter,
  FileText,
  Video,
  Link as LinkIcon,
  Code,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  Award,
  Target,
  Zap,
  BookMarked
} from 'lucide-react'

interface Subject {
  subject: string
  syllabus: string
  books: string[]
  units: { [key: string]: string }
  notes: string[]
  playlists: string[]
  tutorial_sheets: { [key: string]: string }
  practical_files: string[]
  previous_year_questions: { [key: string]: string }
  extra_resources: string[]
}

interface Resource {
  id: string
  title: string
  description: string
  type: 'notes' | 'question-paper' | 'book' | 'video' | 'tutorial'
  subject: string
  semester: number
  branch: string
  uploadDate: string
  downloadCount: number
  fileSize?: string
  rating: number
  author: string
}

const StudyHubPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedSemester, setSelectedSemester] = useState('All')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState('subjects')
  const [subjects, setSubjects] = useState<Subject[]>([])

  // Load subjects data
  useEffect(() => {
    const subjectsData: Subject[] = [
      {
        subject: "Mathematics-1",
        syllabus: "FCMT0101_Mathematics-1",
        books: ["Jaggi Mathur", "G.B. Thomas", "Kreyszig"],
        units: {
          "Unit-1": "Hyperbolic Functions",
          "Unit-2": "Successive Differentiation",
          "Unit-3": "Application of Integrals, Gamma & Beta Functions",
          "Unit-4": "Multiple Integrals",
          "Unit-5": "Infinite Series, Maclaurin's and Taylor's Theorem"
        },
        notes: [
          "Complete Mathematics-1 Notes",
          "Unit-wise Study Material"
        ],
        playlists: [
          "Mathematics-1 Video Lectures",
          "Calculus Fundamentals"
        ],
        tutorial_sheets: {
          "Tut-1": "Limit, Continuity, Differentiability, Hyperbolic functions",
          "Tut-2": "Successive Differentiation, Taylor/Maclaurin Series",
          "Tut-3": "Applications of Integrals"
        },
        practical_files: ["Mathematics Lab Manual"],
        previous_year_questions: {
          "Midsem": "Mathematics-1 Midsem Papers",
          "Endsem": "Mathematics-1 Endsem Papers"
        },
        extra_resources: ["Revision Notes", "Short Notes PDF", "Formula Sheet", "One-shot revision video"]
      },
      {
        subject: "Data Structures and Algorithms",
        syllabus: "FCCT0201_DSA",
        books: ["Introduction to Algorithms by CLRS", "Data Structures Using C by Reema Thareja"],
        units: {
          "Unit-1": "Introduction to Data Structures and Algorithms",
          "Unit-2": "Arrays, Linked Lists, Stacks and Queues",
          "Unit-3": "Trees and Graphs",
          "Unit-4": "Searching and Sorting Algorithms",
          "Unit-5": "Algorithm Design Techniques"
        },
        notes: [
          "Complete DSA Notes",
          "Algorithm Analysis Guide"
        ],
        playlists: [
          "DSA Video Course",
          "Competitive Programming Prep"
        ],
        tutorial_sheets: {
          "Tut-1": "Arrays and Linked Lists Problems",
          "Tut-2": "Trees and Graph Algorithms",
          "Tut-3": "Sorting and Searching Algorithms"
        },
        practical_files: ["DSA Lab Assignments"],
        previous_year_questions: {
          "Midsem": "DSA Midsem Papers",
          "Endsem": "DSA Endsem Papers"
        },
        extra_resources: ["DSA Cheat Sheet", "Competitive Programming Resources", "Time Complexity Analysis Guide"]
      },
      {
        subject: "Computer Programming",
        syllabus: "FCCT0101_Computer_Programming",
        books: ["Let Us C by Yashavant Kanetkar", "The C Programming Language by Kernighan and Ritchie"],
        units: {
          "Unit-1": "Basics of Programming and C",
          "Unit-2": "Control Structures and Functions",
          "Unit-3": "Arrays and Strings",
          "Unit-4": "Pointers and Dynamic Memory Allocation",
          "Unit-5": "Structures, Unions and File Handling"
        },
        notes: [
          "C Programming Complete Notes",
          "Programming Concepts Guide"
        ],
        playlists: [
          "C Programming Tutorial Series",
          "Programming Fundamentals"
        ],
        tutorial_sheets: {
          "Tut-1": "Basic C Programs",
          "Tut-2": "Arrays and Functions",
          "Tut-3": "Pointers and Structures"
        },
        practical_files: ["C Programming Lab Files"],
        previous_year_questions: {
          "Midsem": "Programming Midsem Papers",
          "Endsem": "Programming Endsem Papers"
        },
        extra_resources: ["C Programming Handbook", "Common C Programming Errors", "Programming Exercises"]
      },
      {
        subject: "English",
        syllabus: "FCEN0101_English",
        books: ["Technical Communication by Meenakshi Raman"],
        units: {
          "Unit-1": "Introduction to Technical Communication",
          "Unit-2": "Grammar and Usage",
          "Unit-3": "Technical Writing",
          "Unit-4": "Presentation Skills",
          "Unit-5": "Group Discussion and Interview Skills"
        },
        notes: [
          "Technical Communication Notes",
          "Grammar and Writing Guide"
        ],
        playlists: [
          "Communication Skills Videos",
          "English Grammar Tutorials"
        ],
        tutorial_sheets: {
          "Tut-1": "Grammar and Comprehension",
          "Tut-2": "Letter Writing and Technical Reports"
        },
        practical_files: ["Communication Lab Activities"],
        previous_year_questions: {
          "Midsem": "English Midsem Papers",
          "Endsem": "English Endsem Papers"
        },
        extra_resources: ["Communication Skills PDF", "Common Errors in English"]
      },
      {
        subject: "Environmental Science",
        syllabus: "FCEN0102_Environmental_Science",
        books: ["Environmental Studies by Erach Bharucha"],
        units: {
          "Unit-1": "Introduction to Environmental Studies",
          "Unit-2": "Ecosystems and Biodiversity",
          "Unit-3": "Environmental Pollution",
          "Unit-4": "Social Issues and the Environment",
          "Unit-5": "Human Population and the Environment"
        },
        notes: [
          "Environmental Science Notes",
          "Ecosystem Study Guide"
        ],
        playlists: [
          "Environmental Studies Videos",
          "Ecology and Conservation"
        ],
        tutorial_sheets: {
          "Tut-1": "Ecosystem Analysis",
          "Tut-2": "Environmental Impact Assessment"
        },
        practical_files: ["Environmental Lab Manual"],
        previous_year_questions: {
          "Midsem": "Environmental Science Midsem",
          "Endsem": "Environmental Science Endsem"
        },
        extra_resources: ["Environmental Case Studies", "Environmental Awareness Projects"]
      }
    ]
    setSubjects(subjectsData)
  }, [])

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Data Structures and Algorithms - Complete Notes',
      description: 'Comprehensive notes covering arrays, linked lists, trees, graphs, sorting and searching algorithms with examples.',
      type: 'notes',
      subject: 'DSA',
      semester: 3,
      branch: 'CSE',
      uploadDate: '2 days ago',
      downloadCount: 245,
      fileSize: '2.3 MB',
      rating: 4.8,
      author: 'Rohit Kumar'
    },
    {
      id: '2',
      title: 'Computer Networks Previous Year Questions',
      description: 'Collection of previous year question papers from 2020-2024 with solutions.',
      type: 'question-paper',
      subject: 'Computer Networks',
      semester: 5,
      branch: 'CSE',
      uploadDate: '1 week ago',
      downloadCount: 189,
      fileSize: '4.1 MB',
      rating: 4.6,
      author: 'Priya Sharma'
    },
    {
      id: '3',
      title: 'Digital Electronics Handbook',
      description: 'Complete reference guide for digital electronics with circuit diagrams and truth tables.',
      type: 'book',
      subject: 'Digital Electronics',
      semester: 4,
      branch: 'ECE',
      uploadDate: '3 days ago',
      downloadCount: 156,
      fileSize: '8.7 MB',
      rating: 4.9,
      author: 'Dr. Amit Singh'
    },
    {
      id: '4',
      title: 'Machine Learning Tutorial Series',
      description: 'Video tutorials covering basic to advanced ML concepts with Python implementation.',
      type: 'video',
      subject: 'Machine Learning',
      semester: 7,
      branch: 'CSE',
      uploadDate: '1 day ago',
      downloadCount: 312,
      rating: 4.7,
      author: 'AI Club NSUT'
    }
  ]

  const types = ['All', 'notes', 'question-paper', 'book', 'video', 'tutorial']
  const semesters = ['All', '1', '2', '3', '4', '5', '6', '7', '8']

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'All' || resource.type === selectedType
    const matchesSemester = selectedSemester === 'All' || resource.semester.toString() === selectedSemester
    return matchesSearch && matchesType && matchesSemester
  })

  const filteredSubjects = subjects.filter(subject =>
    subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return <FileText className="w-5 h-5" />
      case 'question-paper': return <FileText className="w-5 h-5" />
      case 'book': return <BookOpen className="w-5 h-5" />
      case 'video': return <Video className="w-5 h-5" />
      case 'tutorial': return <LinkIcon className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'from-blue-500 to-blue-600'
      case 'question-paper': return 'from-green-500 to-green-600'
      case 'book': return 'from-purple-500 to-purple-600'
      case 'video': return 'from-red-500 to-red-600'
      case 'tutorial': return 'from-orange-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const openSubjectModal = (subject: Subject) => {
    setSelectedSubject(subject)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSubject(null)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-24">
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
        <section className="py-16 lg:py-24">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="tracking-tighter text-white font-sans text-5xl sm:text-6xl md:text-7xl mb-6">
                Your Academic{' '}
                <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  Genie
                </span>
              </h1>
              <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto mb-8">
                Unlock your academic potential with Study Hub's comprehensive resources. We're here to make your learning journey magical with curated materials designed for success!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('subjects')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === 'subjects' 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Explore Subjects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('dsa')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === 'dsa' 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  DSA Special
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('brahmastra')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === 'brahmastra' 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Brahmastra Resources
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('resources')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === 'resources' 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Community Resources
                </motion.button>
              </div>
            </motion.div>

            {/* Search and Filter Section */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={activeSection === 'subjects' ? "Search subjects..." : "Search resources..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {activeSection === 'resources' && (
                <div className="flex gap-4">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {types.map(type => (
                      <option key={type} value={type} className="bg-black text-white">
                        {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem} className="bg-black text-white">
                        {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Dynamic Content Based on Active Section */}
            {activeSection === 'subjects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubjects.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer"
                    onClick={() => openSubjectModal(subject)}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{subject.subject}</h3>
                      <p className="text-gray-300 text-sm mb-4">{subject.syllabus}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <BookMarked className="w-4 h-4 mr-2" />
                          <span>{subject.books.length} Reference Books</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>{Object.keys(subject.units).length} Units</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Video className="w-4 h-4 mr-2" />
                          <span>{subject.playlists.length} Video Playlists</span>
                        </div>
                      </div>

                      <div className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">
                        Click to explore resources →
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSection === 'dsa' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-white mb-4">Why DSA is Important?</h2>
                      <p className="text-gray-300 mb-6">
                        Data Structures and Algorithms form the foundation of computer science and are crucial for problem-solving and efficient programming.
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {[
                          'Essential for technical interviews',
                          'Improves problem-solving skills',
                          'Makes your code efficient',
                          'Foundation for advanced topics'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-cyan-300 hover:to-purple-500 transition-all duration-300"
                        >
                          View DSA Resources
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border border-cyan-400 text-cyan-400 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                        >
                          Practice Problems
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-full blur-3xl"></div>
                    <img 
                      src="/public/DISHANT.jpg" 
                      alt="DSA Illustration" 
                      className="relative z-10 w-full h-auto rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'brahmastra' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 p-8">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 to-red-600/20 blur-2xl opacity-20"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-white mb-4">What is Brahmastra?</h2>
                      <p className="text-gray-300 mb-6">
                        Brahmastra is our collection of high-impact resources that can transform your academic performance. These carefully curated materials are designed to give you an edge in your studies.
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {[
                          { icon: <Zap className="w-4 h-4" />, text: 'Quick revision materials' },
                          { icon: <Target className="w-4 h-4" />, text: 'Important topic summaries' },
                          { icon: <Award className="w-4 h-4" />, text: 'Exam strategy guides' },
                          { icon: <BookMarked className="w-4 h-4" />, text: 'Special cheat sheets' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <div className="text-amber-400 mr-3">{item.icon}</div>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-400 to-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-amber-300 hover:to-red-500 transition-all duration-300 w-full"
                      >
                        Access Brahmastra Resources
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-red-600/30 rounded-full blur-3xl"></div>
                    <img 
                      src="/public/genie.png" 
                      alt="Brahmastra Illustration" 
                      className="relative z-10 w-full h-auto rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 p-6"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${getTypeColor(resource.type)}`}>
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-semibold">{resource.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{resource.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{resource.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Subject:</span>
                          <span className="text-white font-semibold">{resource.subject}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Semester:</span>
                          <span className="text-white">{resource.semester}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Branch:</span>
                          <span className="text-white">{resource.branch}</span>
                        </div>
                        {resource.fileSize && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Size:</span>
                            <span className="text-white">{resource.fileSize}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloadCount} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{resource.uploadDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">{resource.author}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-300 hover:to-purple-500 transition-all duration-300"
                        >
                          <Download className="w-4 h-4 inline mr-1" />
                          Download
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {((activeSection === 'subjects' && filteredSubjects.length === 0) || 
              (activeSection === 'resources' && filteredResources.length === 0)) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">No results found</h3>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/10">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="tracking-tighter text-white font-sans text-3xl font-bold mb-4">
                Contribute to Study Hub
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Help your fellow students by sharing your notes, question papers, and study materials. Together, we can build the best academic resource collection.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Upload Resource
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Subject Details Modal */}
      {showModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">{selectedSubject.subject}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Units */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Course Units</h3>
                {Object.entries(selectedSubject.units).map(([unit, description]) => (
                  <div key={unit} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold">{unit}</h4>
                    <p className="text-gray-300 text-sm">{description}</p>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="space-y-6">
                {/* Books */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Reference Books</h3>
                  <div className="space-y-2">
                    {selectedSubject.books.map((book, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <BookOpen className="w-4 h-4 mr-2 text-purple-400" />
                        <span>{book}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Study Notes</h3>
                  <div className="space-y-2">
                    {selectedSubject.notes.map((note, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-gray-300">{note}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-400 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Playlists */}
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-3">Video Lectures</h3>
                  <div className="space-y-2">
                    {selectedSubject.playlists.map((playlist, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <div className="flex items-center">
                          <PlayCircle className="w-4 h-4 mr-2 text-red-400" />
                          <span className="text-gray-300">{playlist}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-red-400 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tutorial Sheets */}
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Tutorial Sheets</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedSubject.tutorial_sheets).map(([tut, description]) => (
                      <div key={tut} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-semibold">{tut}</h4>
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer" />
                        </div>
                        <p className="text-gray-300 text-sm">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Resources */}
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Extra Resources</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject.extra_resources.map((resource, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-sm"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default StudyHubPage
