import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Search, 
  Calendar, 
  Download, 
  Copy, 
  CheckCircle2,
  ChevronRight,
  Filter,
  SlidersHorizontal
} from 'lucide-react'

interface StudyHubProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'notes' | 'question-paper' | 'book' | 'code' | 'tutorial';
  subject: string;
  semester: number;
  branch: string;
  uploadDate: string;
  downloadCount: number;
  fileSize: string;
  tags: string[];
}

const StudyHub: React.FC<StudyHubProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All',
    semester: 'All',
    branch: 'All'
  })

  // Example resources data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Data Structures and Algorithms Notes',
      description: 'Comprehensive notes covering all major data structures and algorithms including arrays, linked lists, trees, graphs, sorting and searching algorithms.',
      type: 'notes',
      subject: 'DSA',
      semester: 3,
      branch: 'CSE',
      uploadDate: '15 Aug 2023',
      downloadCount: 423,
      fileSize: '2.4 MB',
      tags: ['data structures', 'algorithms', 'DSA', 'arrays', 'linked lists', 'trees']
    },
    {
      id: '2',
      title: 'Operating Systems Previous Year Question Papers',
      description: 'Collection of last 5 years question papers for Operating Systems course. Includes both mid-semester and end-semester exams with marking schemes.',
      type: 'question-paper',
      subject: 'OS',
      semester: 4,
      branch: 'CSE',
      uploadDate: '10 Sep 2023',
      downloadCount: 315,
      fileSize: '1.8 MB',
      tags: ['operating systems', 'question papers', 'exam', 'OS', 'process management']
    },
    {
      id: '3',
      title: 'Computer Networks Textbook',
      description: 'Digital copy of the recommended textbook for Computer Networks course. Covers OSI model, TCP/IP, routing algorithms, network security and more.',
      type: 'book',
      subject: 'CN',
      semester: 5,
      branch: 'CSE',
      uploadDate: '20 Jul 2023',
      downloadCount: 287,
      fileSize: '12.6 MB',
      tags: ['computer networks', 'book', 'CN', 'networking', 'TCP/IP', 'OSI model']
    },
    {
      id: '4',
      title: 'Web Development Tutorial Series',
      description: 'Step-by-step tutorial series on full-stack web development using React, Node.js, Express and MongoDB. Includes practical examples and projects.',
      type: 'tutorial',
      subject: 'Web Tech',
      semester: 6,
      branch: 'IT',
      uploadDate: '05 Oct 2023',
      downloadCount: 198,
      fileSize: '8.3 MB',
      tags: ['web development', 'tutorial', 'MERN', 'React', 'Node.js', 'full-stack']
    },
    {
      id: '5',
      title: 'Machine Learning Algorithms Implementation',
      description: 'Python code implementations of various machine learning algorithms including linear regression, logistic regression, decision trees, neural networks, etc.',
      type: 'code',
      subject: 'ML',
      semester: 7,
      branch: 'CSE',
      uploadDate: '18 Nov 2023',
      downloadCount: 156,
      fileSize: '3.7 MB',
      tags: ['machine learning', 'code', 'ML', 'Python', 'algorithms', 'neural networks']
    },
    {
      id: '6',
      title: 'Digital Electronics Lab Manual',
      description: 'Comprehensive lab manual for Digital Electronics course with circuit diagrams, truth tables, and practical experiments.',
      type: 'notes',
      subject: 'DE',
      semester: 3,
      branch: 'ECE',
      uploadDate: '22 Aug 2023',
      downloadCount: 201,
      fileSize: '5.2 MB',
      tags: ['digital electronics', 'lab manual', 'circuits', 'experiments', 'logic gates']
    },
    {
      id: '7',
      title: 'Microprocessors and Interfacing Notes',
      description: 'Detailed notes on 8085, 8086 architectures, assembly language programming, memory interfacing and peripheral devices.',
      type: 'notes',
      subject: 'MP',
      semester: 4,
      branch: 'ECE',
      uploadDate: '14 Sep 2023',
      downloadCount: 178,
      fileSize: '4.1 MB',
      tags: ['microprocessors', 'notes', 'assembly', '8086', 'interfacing', 'peripherals']
    },
    {
      id: '8',
      title: 'Thermodynamics Question Bank',
      description: 'Extensive collection of problems and solved examples covering all aspects of engineering thermodynamics.',
      type: 'question-paper',
      subject: 'Thermo',
      semester: 4,
      branch: 'ME',
      uploadDate: '30 Jul 2023',
      downloadCount: 142,
      fileSize: '3.3 MB',
      tags: ['thermodynamics', 'question bank', 'problems', 'mechanical', 'heat transfer']
    },
    {
      id: '9',
      title: 'Power Systems Analysis Software',
      description: 'Custom software tool for power system analysis including load flow studies, fault analysis and stability assessment.',
      type: 'code',
      subject: 'PS',
      semester: 6,
      branch: 'EEE',
      uploadDate: '12 Oct 2023',
      downloadCount: 126,
      fileSize: '6.8 MB',
      tags: ['power systems', 'software', 'analysis', 'load flow', 'electrical', 'MATLAB']
    }
  ]

  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Type filter
    const matchesType = selectedFilters.type === 'All' || resource.type === selectedFilters.type.toLowerCase()
    
    // Semester filter
    const matchesSemester = selectedFilters.semester === 'All' || resource.semester.toString() === selectedFilters.semester
    
    // Branch filter
    const matchesBranch = selectedFilters.branch === 'All' || resource.branch === selectedFilters.branch
    
    return matchesSearch && matchesType && matchesSemester && matchesBranch
  })

  const getColorForType = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-blue-100 text-blue-700';
      case 'question-paper': return 'bg-amber-100 text-amber-700';
      case 'book': return 'bg-emerald-100 text-emerald-700';
      case 'code': return 'bg-purple-100 text-purple-700';
      case 'tutorial': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'notes': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
      case 'question-paper': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'book': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
      case 'code': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
      case 'tutorial': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
      default: return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    }
  }

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
            <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-2xl font-bold">Study Hub</h1>
                    <p className="text-white/80">Find and share academic resources</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search for resources, subjects, topics..."
                  className="w-full bg-white/10 border border-white/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="border-b border-gray-200">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">Filters</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Resource Type</label>
                    <select 
                      className="border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedFilters.type}
                      onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                    >
                      <option value="All">All Types</option>
                      <option value="notes">Notes</option>
                      <option value="question-paper">Question Papers</option>
                      <option value="book">Books</option>
                      <option value="code">Code</option>
                      <option value="tutorial">Tutorials</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Semester</label>
                    <select 
                      className="border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedFilters.semester}
                      onChange={(e) => setSelectedFilters({...selectedFilters, semester: e.target.value})}
                    >
                      <option value="All">All Semesters</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                      <option value="6">Semester 6</option>
                      <option value="7">Semester 7</option>
                      <option value="8">Semester 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Branch</label>
                    <select 
                      className="border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedFilters.branch}
                      onChange={(e) => setSelectedFilters({...selectedFilters, branch: e.target.value})}
                    >
                      <option value="All">All Branches</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="ME">ME</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-330px)]">
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedResource(resource)}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl ${getColorForType(resource.type)}`}>
                            {getIconForType(resource.type)}
                          </div>
                          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                            {resource.subject} • Sem {resource.semester}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{resource.uploadDate}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Download className="w-4 h-4 mr-1" />
                            <span>{resource.downloadCount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-3 bg-gray-50 flex flex-wrap gap-2">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            +{resource.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try changing your search query or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Resource Detail Modal */}
          <AnimatePresence>
            {selectedResource && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setSelectedResource(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${getColorForType(selectedResource.type)}`}>
                        {getIconForType(selectedResource.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{selectedResource.type}</div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedResource.title}</h2>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedResource(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">Subject</div>
                      <div className="font-medium text-gray-900">{selectedResource.subject}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">Semester</div>
                      <div className="font-medium text-gray-900">Semester {selectedResource.semester}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">Branch</div>
                      <div className="font-medium text-gray-900">{selectedResource.branch}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">File Size</div>
                      <div className="font-medium text-gray-900">{selectedResource.fileSize}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">Uploaded On</div>
                      <div className="font-medium text-gray-900">{selectedResource.uploadDate}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-500 mb-1">Downloads</div>
                      <div className="font-medium text-gray-900">{selectedResource.downloadCount}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-gray-700 font-medium mb-2">Description</div>
                    <p className="text-gray-600">{selectedResource.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-gray-700 font-medium mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="flex items-center">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                        <Download className="w-5 h-5 mr-2" />
                        Download Resource
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-indigo-600">
                        <Copy className="w-5 h-5 mr-2" />
                        <span className="text-sm">Copy Link</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-indigo-600">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        <span className="text-sm">Mark as Useful</span>
                      </button>
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

export default StudyHub
