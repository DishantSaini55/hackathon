import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Mic } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "✨ Hi! I'm Campus Genie, your AI-powered campus assistant!\n\nI have access to comprehensive NSUT campus data including:\n📚 Library hours & facilities\n🏠 Hostel information & mess timings\n📋 Exam schedules & academic info\n👨‍🏫 Faculty contacts & departments\n🗺️ Campus navigation & locations\n🎉 Events & activities\n📞 Important contact numbers\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    // For now, we'll just toggle the visual state
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("Voice input would be processed here")
      }, 3000)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const campusData = {
    library: {
      hours: {
        weekdays: "8:00 AM - 10:00 PM",
        weekends: "9:00 AM - 6:00 PM",
        holidays: "Closed"
      },
      location: "Main Academic Block, Ground Floor",
      facilities: ["Study halls", "Computer lab", "Reference section", "Group study rooms", "Printing services"],
      contact: "library@nsut.ac.in | +91-11-2590-1000"
    },
    hostels: {
      boys: {
        name: "Boys Hostel Complex",
        location: "Near Sports Complex, East Wing",
        capacity: "500 students",
        facilities: ["WiFi", "Mess", "Laundry", "Recreation room", "Gym"],
        messTimings: "Breakfast: 7:30-9:30 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM"
      },
      girls: {
        name: "Girls Hostel Complex", 
        location: "North Campus, Residential Area",
        capacity: "300 students",
        facilities: ["WiFi", "Mess", "Laundry", "Recreation room", "Medical room"],
        messTimings: "Breakfast: 7:30-9:30 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM"
      }
    },
    departments: [
      "Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering",
      "Civil Engineering", "Electrical Engineering", "Information Technology", "Mathematics",
      "Physics", "Chemistry", "Humanities", "Management Studies"
    ],
    facilities: [
      "Central Library", "Computer Labs", "Workshop", "Auditorium", "Sports Complex",
      "Medical Center", "Cafeteria", "ATM", "Stationary Shop", "Parking Area"
    ],
    contacts: {
      admission: "+91-11-2590-1010",
      academic: "+91-11-2590-1020", 
      hostel: "+91-11-2590-1030",
      medical: "+91-11-2590-1040",
      security: "+91-11-2590-1050"
    },
    events: [
      "Annual Tech Fest - Moksha (October)",
      "Cultural Fest - Zealicon (March)", 
      "Sports Meet (November)",
      "Industry Connect Sessions (Monthly)",
      "Research Symposium (February)"
    ]
  }

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // Library related queries
    if (lowerMessage.includes('library')) {
      if (lowerMessage.includes('hours') || lowerMessage.includes('time')) {
        return `📚 Library Hours:\n• Weekdays: ${campusData.library.hours.weekdays}\n• Weekends: ${campusData.library.hours.weekends}\n• Holidays: ${campusData.library.hours.holidays}\n\nLocation: ${campusData.library.location}`
      } else if (lowerMessage.includes('contact')) {
        return `📞 Library Contact: ${campusData.library.contact}\nLocation: ${campusData.library.location}`
      } else if (lowerMessage.includes('facilities')) {
        return `🏛️ Library Facilities:\n${campusData.library.facilities.map(f => `• ${f}`).join('\n')}\n\nNeed directions to any specific section?`
      }
      return `📚 Central Library Information:\n• Location: ${campusData.library.location}\n• Hours: ${campusData.library.hours.weekdays} (Weekdays)\n• Facilities: Study halls, Computer lab, Reference section\n\nWhat specific information do you need about the library?`
    }
    
    // Hostel related queries
    else if (lowerMessage.includes('hostel')) {
      if (lowerMessage.includes('boys') || lowerMessage.includes('boy')) {
        return `🏠 Boys Hostel Information:\n• Location: ${campusData.hostels.boys.location}\n• Capacity: ${campusData.hostels.boys.capacity}\n• Facilities: ${campusData.hostels.boys.facilities.join(', ')}\n• Mess Timings: ${campusData.hostels.boys.messTimings}`
      } else if (lowerMessage.includes('girls') || lowerMessage.includes('girl')) {
        return `🏠 Girls Hostel Information:\n• Location: ${campusData.hostels.girls.location}\n• Capacity: ${campusData.hostels.girls.capacity}\n• Facilities: ${campusData.hostels.girls.facilities.join(', ')}\n• Mess Timings: ${campusData.hostels.girls.messTimings}`
      } else if (lowerMessage.includes('mess') || lowerMessage.includes('food')) {
        return `🍽️ Mess Timings for both hostels:\n• Breakfast: 7:30-9:30 AM\n• Lunch: 12:30-2:30 PM\n• Dinner: 7:30-9:30 PM\n\nWhich hostel are you asking about specifically?`
      }
      return `🏠 Hostel Information:\n• Boys Hostel: ${campusData.hostels.boys.location}\n• Girls Hostel: ${campusData.hostels.girls.location}\n\nWould you like specific details about either hostel?`
    }
    
    // Exam and schedule queries
    else if (lowerMessage.includes('exam') || lowerMessage.includes('schedule')) {
      return `📋 Exam Information:\n• Exam schedules are released 2 weeks before exam period\n• Check student portal for latest updates\n• Mid-sem exams: Usually in March & October\n• End-sem exams: Usually in May & December\n\nWhich semester or subject schedule do you need?`
    }
    
    // Faculty and department queries
    else if (lowerMessage.includes('faculty') || lowerMessage.includes('professor') || lowerMessage.includes('department')) {
      return `👨‍🏫 Departments at NSUT:\n${campusData.departments.slice(0, 6).map(d => `• ${d}`).join('\n')}\n\nWhich department's faculty are you looking for? I can provide contact details and office hours.`
    }
    
    // Location and map queries
    else if (lowerMessage.includes('map') || lowerMessage.includes('location') || lowerMessage.includes('direction')) {
      return `🗺️ Campus Navigation:\n• Use our interactive campus map for detailed directions\n• Key locations: Library, Hostels, Departments, Sports Complex\n• Campus area: 40 acres with modern infrastructure\n\nWhich specific building or location are you looking for?`
    }
    
    // Facilities queries
    else if (lowerMessage.includes('facilities') || lowerMessage.includes('amenities')) {
      return `🏢 Campus Facilities:\n${campusData.facilities.map(f => `• ${f}`).join('\n')}\n\nNeed more details about any specific facility?`
    }
    
    // Contact information
    else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('number')) {
      return `📞 Important Contacts:\n• Admission Office: ${campusData.contacts.admission}\n• Academic Office: ${campusData.contacts.academic}\n• Hostel Office: ${campusData.contacts.hostel}\n• Medical Center: ${campusData.contacts.medical}\n• Security: ${campusData.contacts.security}\n\nWhich department do you need to contact?`
    }
    
    // Events queries
    else if (lowerMessage.includes('event') || lowerMessage.includes('fest') || lowerMessage.includes('festival')) {
      return `🎉 Upcoming Events:\n${campusData.events.map(e => `• ${e}`).join('\n')}\n\nWant details about any specific event?`
    }
    
    // Sports queries
    else if (lowerMessage.includes('sports') || lowerMessage.includes('gym') || lowerMessage.includes('games')) {
      return `⚽ Sports Complex:\n• Location: East Wing Campus\n• Facilities: Indoor & Outdoor courts\n• Gym: Modern equipment available\n• Sports: Cricket, Football, Basketball, Tennis, Badminton\n• Timings: 6:00 AM - 9:00 PM\n\nWhich sport are you interested in?`
    }
    
    // Medical queries
    else if (lowerMessage.includes('medical') || lowerMessage.includes('health') || lowerMessage.includes('doctor')) {
      return `🏥 Medical Center:\n• Location: Near Main Gate\n• Timings: 8:00 AM - 8:00 PM\n• Emergency: 24/7 available\n• Contact: ${campusData.contacts.medical}\n• Services: First aid, basic treatment, health checkups\n\nNeed emergency assistance?`
    }
    
    // Admission queries
    else if (lowerMessage.includes('admission') || lowerMessage.includes('fees') || lowerMessage.includes('course')) {
      return `🎓 Admission Information:\n• Contact: ${campusData.contacts.admission}\n• Courses: Engineering, Management, Sciences\n• Admission through JEE Main, GATE, CAT\n• Website: nsut.ac.in for detailed information\n\nWhich course are you interested in?`
    }
    
    // Greeting responses
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `👋 Hello! I'm your Campus Genie! I can help you with:\n• Library hours & facilities\n• Hostel information\n• Exam schedules\n• Faculty contacts\n• Campus directions\n• Events & activities\n\nWhat would you like to know about NSUT?`
    }
    
    // Default response with suggestions
    else {
      const suggestions = ['Library hours', 'Hostel info', 'Exam schedule', 'Faculty contacts', 'Campus map', 'Events', 'Sports facilities']
      return `🤖 I'm here to help with campus information! Try asking about:\n${suggestions.map(s => `• ${s}`).join('\n')}\n\nOr ask me anything specific about NSUT campus!`
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-genie-500 to-magic-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-genie-500 to-magic-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Campus Genie</h3>
                  <p className="text-white/80 text-sm">Always here to help</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-genie-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Action Buttons (show after welcome message) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 px-2"
                >
                  {['Library Hours', 'Hostel Info', 'Exam Schedule', 'Campus Map', 'Contact Info'].map((action) => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setInputMessage(action)
                        setTimeout(() => handleSendMessage(), 100)
                      }}
                      className="px-3 py-1 bg-genie-50 text-genie-600 rounded-full text-xs hover:bg-genie-100 transition-colors border border-genie-200"
                    >
                      {action}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-genie-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-genie-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-genie-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Ask me anything about NSUT..."}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-genie-500 focus:border-transparent outline-none"
                  disabled={isListening}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isListening}
                  className="p-2 bg-genie-500 text-white rounded-xl hover:bg-genie-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Quick suggestions when input is empty */}
              {inputMessage === '' && !isListening && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="text-xs text-gray-500 w-full mb-1">Quick search:</div>
                  {['Library hours', 'Mess timings', 'Faculty contacts', 'Campus map'].map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot