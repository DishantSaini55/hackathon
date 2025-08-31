import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  Bookmark,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from 'lucide-react'

interface TimeTableManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  id: string;
  time: string;
  day: string;
  title: string;
  description: string;
  color: string;
  isBookmarked: boolean;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]

const COLORS = [
  { name: "Blue", class: "bg-blue-100 border-blue-300 text-blue-800" },
  { name: "Green", class: "bg-green-100 border-green-300 text-green-800" },
  { name: "Purple", class: "bg-purple-100 border-purple-300 text-purple-800" },
  { name: "Orange", class: "bg-orange-100 border-orange-300 text-orange-800" },
  { name: "Pink", class: "bg-pink-100 border-pink-300 text-pink-800" },
]

const TimeTableManager: React.FC<TimeTableManagerProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<TimeSlot[]>([
    {
      id: "1",
      time: "9:00 AM",
      day: "Monday",
      title: "Team Meeting",
      description: "Weekly sync with development team",
      color: COLORS[0].class,
      isBookmarked: true,
    },
    {
      id: "2",
      time: "2:00 PM",
      day: "Wednesday",
      title: "Client Presentation",
      description: "Project demo for stakeholders",
      color: COLORS[1].class,
      isBookmarked: false,
    },
  ])

  const [draggedEvent, setDraggedEvent] = useState<TimeSlot | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<TimeSlot | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    day: "",
    time: "",
    color: COLORS[0].class,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      day: "",
      time: "",
      color: COLORS[0].class,
    })
  }

  const handleCreateEvent = () => {
    if (!formData.title || !formData.day || !formData.time) return

    const newEvent: TimeSlot = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      day: formData.day,
      time: formData.time,
      color: formData.color,
      isBookmarked: false,
    }

    setEvents([...events, newEvent])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEditEvent = () => {
    if (!editingEvent || !formData.title || !formData.day || !formData.time) return

    setEvents(
      events.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              title: formData.title,
              description: formData.description,
              day: formData.day,
              time: formData.time,
              color: formData.color,
            }
          : event,
      ),
    )
    setIsEditDialogOpen(false)
    setEditingEvent(null)
    resetForm()
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const openEditDialog = (event: TimeSlot) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      day: event.day,
      time: event.time,
      color: event.color,
    })
    setIsEditDialogOpen(true)
  }

  const toggleBookmark = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, isBookmarked: !event.isBookmarked } : event)))
  }

  const getEventForSlot = (day: string, time: string) => {
    return events.find((event) => event.day === day && event.time === time)
  }

  const handleDragStart = (event: TimeSlot) => {
    setDraggedEvent(event)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, day: string, time: string) => {
    e.preventDefault()
    if (draggedEvent) {
      setEvents(events.map((event) => (event.id === draggedEvent.id ? { ...event, day, time } : event)))
      setDraggedEvent(null)
    }
  }

  const bookmarkedEvents = events.filter((event) => event.isBookmarked)

  const exportToCSV = () => {
    const headers = ["Day", "Time", "Title", "Description", "Bookmarked"]
    const csvContent = [
      headers.join(","),
      ...events.map((event) =>
        [event.day, event.time, `"${event.title}"`, `"${event.description}"`, event.isBookmarked ? "Yes" : "No"].join(
          ",",
        ),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `timetable-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      timetable: events.map((event) => ({
        id: event.id,
        day: event.day,
        time: event.time,
        title: event.title,
        description: event.description,
        isBookmarked: event.isBookmarked,
        colorTheme: COLORS.find((c) => c.class === event.color)?.name || "Blue",
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `timetable-${new Date().toISOString().split("T")[0]}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    // Create a printable HTML version
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Timetable - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #374151; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: 600; }
            .event { background-color: #f0f9ff; padding: 8px; border-radius: 4px; margin: 4px 0; }
            .bookmarked { background-color: #fef3c7; }
            .time-header { background-color: #f8fafc; font-weight: 600; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>My Timetable</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          
          <h2>Weekly Schedule</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                ${DAYS.map((day) => `<th>${day}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${TIME_SLOTS.map(
                (time) => `
                <tr>
                  <td class="time-header">${time}</td>
                  ${DAYS.map((day) => {
                    const event = events.find((e) => e.day === day && e.time === time)
                    return `<td>${
                      event
                        ? `
                      <div class="event ${event.isBookmarked ? "bookmarked" : ""}">
                        <strong>${event.title}</strong>
                        ${event.description ? `<br><small>${event.description}</small>` : ""}
                        ${event.isBookmarked ? "<br><small>⭐ Bookmarked</small>" : ""}
                      </div>
                    `
                        : ""
                    }</td>`
                  }).join("")}
                </tr>
              `,
              ).join("")}
            </tbody>
          </table>

          ${
            bookmarkedEvents.length > 0
              ? `
            <h2>Bookmarked Events</h2>
            <ul>
              ${bookmarkedEvents
                .map(
                  (event) => `
                <li><strong>${event.title}</strong> - ${event.day} at ${event.time}
                  ${event.description ? `<br><small>${event.description}</small>` : ""}
                </li>
              `,
                )
                .join("")}
            </ul>
          `
              : ""
          }
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()

    // Auto-print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const handleSlotClick = (day: string, time: string) => {
    const existingEvent = getEventForSlot(day, time)
    if (!existingEvent) {
      setFormData({
        title: "",
        description: "",
        day: day,
        time: time,
        color: COLORS[0].class,
      })
      setIsCreateDialogOpen(true)
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
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/90 w-full max-w-6xl max-h-[90vh]"
          >
            {/* Floating gradient blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
            
            {/* Header */}
            <div className="relative z-10 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-xl border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-500/20 backdrop-blur-xl rounded-xl border border-cyan-400/30">
                    <Calendar className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h1 className="tracking-tighter text-white font-sans text-2xl sm:text-3xl font-bold">
                      Timetable{' '}
                      <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                        Manager
                      </span>
                    </h1>
                    <p className="font-sans text-gray-400 mt-1">Organize your academic schedule with precision</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 backdrop-blur-xl border border-cyan-400/30 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center text-white shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Create Event Dialog */}
            {isCreateDialogOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setIsCreateDialogOpen(false)}>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/90 max-w-md w-full mx-4" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10"></div>
                  <div className="relative z-10 p-6">
                    <h2 className="tracking-tighter text-white font-sans text-xl font-bold mb-6">
                      Create New{' '}
                      <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                        Event
                      </span>
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter event title"
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Enter event description"
                          rows={3}
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                          <select
                            value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white"
                          >
                            <option value="" className="bg-gray-800">Select day</option>
                            {DAYS.map((day) => (
                              <option key={day} value={day} className="bg-gray-800">{day}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white"
                          >
                            <option value="" className="bg-gray-800">Select time</option>
                            {TIME_SLOTS.map((time) => (
                              <option key={time} value={time} className="bg-gray-800">{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                        <select
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white"
                        >
                          {COLORS.map((color) => (
                            <option key={color.name} value={color.class} className="bg-gray-800">{color.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCreateEvent}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg"
                        >
                          Create Event
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsCreateDialogOpen(false)}
                          className="flex-1 bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Edit Event Dialog */}
            {isEditDialogOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setIsEditDialogOpen(false)}>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/90 max-w-md w-full mx-4" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-600/10"></div>
                  <div className="relative z-10 p-6">
                    <h2 className="tracking-tighter text-white font-sans text-xl font-bold mb-6">
                      Edit{' '}
                      <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
                        Event
                      </span>
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter event title"
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Enter event description"
                          rows={3}
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                          <select
                            value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                          >
                            <option value="" className="bg-gray-800">Select day</option>
                            {DAYS.map((day) => (
                              <option key={day} value={day} className="bg-gray-800">{day}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                          >
                            <option value="" className="bg-gray-800">Select time</option>
                            {TIME_SLOTS.map((time) => (
                              <option key={time} value={time} className="bg-gray-800">{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                        <select
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                        >
                          {COLORS.map((color) => (
                            <option key={color.name} value={color.class} className="bg-gray-800">{color.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleEditEvent}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-cyan-600 hover:to-purple-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg"
                        >
                          Save Changes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsEditDialogOpen(false)}
                          className="flex-1 bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            <div className="relative z-10 p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              <div className="flex justify-end mb-6 space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportToPDF}
                  className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-300"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportToCSV}
                  className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-300"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export CSV
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportToJSON}
                  className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-300"
                >
                  <FileJson className="w-4 h-4 mr-2" />
                  Export JSON
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Bookmarks Sidebar */}
                <div className="lg:col-span-1">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10"></div>
                    <div className="relative z-10">
                      <div className="bg-cyan-500/10 backdrop-blur-xl p-4 border-b border-white/10">
                        <h3 className="font-medium flex items-center text-white">
                          <Bookmark className="w-5 h-5 text-cyan-400 mr-2" />
                          Bookmarked Events
                        </h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {bookmarkedEvents.length === 0 ? (
                          <p className="text-sm text-gray-400">No bookmarked events yet</p>
                        ) : (
                          bookmarkedEvents.map((event) => (
                            <motion.div 
                              key={event.id} 
                              whileHover={{ scale: 1.02 }}
                              className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-sm text-white">{event.title}</h4>
                                  <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <div className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs px-2 py-0.5 rounded flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {event.day}
                                    </div>
                                    <div className="bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs px-2 py-0.5 rounded flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {event.time}
                                    </div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleBookmark(event.id)}
                                  className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                  <Bookmark className="w-4 h-4 fill-current" />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timetable Grid */}
                <div className="lg:col-span-3">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-600/10"></div>
                    <div className="relative z-10">
                      <div className="bg-purple-500/10 backdrop-blur-xl p-4 border-b border-white/10">
                        <h3 className="font-medium flex items-center text-white">
                          <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                          Weekly Schedule
                        </h3>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                          {/* Header Row */}
                          <div className="p-3 font-medium text-center text-sm text-gray-400">Time</div>
                          {DAYS.map((day) => (
                            <div key={day} className="p-3 font-medium text-center text-sm bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-lg text-cyan-300">
                              {day}
                            </div>
                          ))}

                        {/* Time Slots */}
                        {TIME_SLOTS.map((time) => (
                          <React.Fragment key={time}>
                            <div className="p-3 text-sm text-gray-400 text-center font-medium">
                              {time}
                            </div>
                            {DAYS.map((day) => {
                              const event = getEventForSlot(day, time)
                              return (
                                <div
                                  key={`${day}-${time}`}
                                  className="min-h-[80px] border-2 border-dashed border-white/20 rounded-lg p-2 hover:border-cyan-400/50 transition-colors cursor-pointer backdrop-blur-xl"
                                  onDragOver={handleDragOver}
                                  onDrop={(e) => handleDrop(e, day, time)}
                                  onClick={() => handleSlotClick(day, time)}
                                >
                                  {event ? (
                                    <div
                                      draggable
                                      onDragStart={() => handleDragStart(event)}
                                      className={`${event.color} p-3 rounded-lg border-2 cursor-move hover:shadow-md transition-all group relative backdrop-blur-xl`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h4 className="font-medium text-sm text-gray-800">{event.title}</h4>
                                          <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => toggleBookmark(event.id)}
                                            className="p-1"
                                          >
                                            <Bookmark className={`w-3 h-3 ${event.isBookmarked ? "fill-current" : ""}`} />
                                          </motion.button>
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => openEditDialog(event)}
                                            className="p-1"
                                          >
                                            <Edit className="w-3 h-3" />
                                          </motion.button>
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="p-1 text-red-600"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </motion.button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                                      <Plus className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </React.Fragment>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TimeTableManager
