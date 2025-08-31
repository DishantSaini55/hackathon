import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock,
  Calendar,
  Bookmark,
  Download,
  Plus,
  Edit,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileJson,
  X
} from 'lucide-react'

interface TimeSlot {
  id: string
  time: string
  day: string
  title: string
  description: string
  color: string
  isBookmarked: boolean
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
  { name: "Blue", class: "bg-blue-500/20 border-blue-400/50 text-blue-300" },
  { name: "Green", class: "bg-green-500/20 border-green-400/50 text-green-300" },
  { name: "Purple", class: "bg-purple-500/20 border-purple-400/50 text-purple-300" },
  { name: "Orange", class: "bg-orange-500/20 border-orange-400/50 text-orange-300" },
  { name: "Pink", class: "bg-pink-500/20 border-pink-400/50 text-pink-300" },
]

const TimeTableManagerPage = () => {
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
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Timetable - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #1f2937; color: white; }
            h1 { color: #60a5fa; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #374151; padding: 12px; text-align: left; }
            th { background-color: #374151; font-weight: 600; color: #60a5fa; }
            .event { background-color: #374151; padding: 8px; border-radius: 4px; margin: 4px 0; }
            .bookmarked { background-color: #f59e0b; }
            .time-header { background-color: #374151; font-weight: 600; color: #60a5fa; }
            @media print { body { margin: 0; background: white; color: black; } }
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
      <div className="relative z-10 min-h-screen p-6 pt-24">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 mt-8"
          >
            <h1 className="tracking-tighter text-white font-sans text-5xl sm:text-6xl md:text-7xl mb-6">
              Timetable{' '}
              <span className="block font-serif text-6xl sm:text-7xl md:text-8xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Manager
              </span>
            </h1>
            <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
              Organize your schedule with ease. Create, manage, and track your weekly timetable with drag-and-drop functionality, bookmarks, and export options.
            </p>
          </motion.div>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">My Timetable</h2>
              <p className="text-gray-400 mt-1">Organize your schedule with ease</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateDialogOpen(true)}
                className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const menu = document.getElementById('export-menu')
                    menu?.classList.toggle('hidden')
                  }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>

                <div id="export-menu" className="hidden absolute right-0 mt-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl py-2 w-48 z-50">
                  <button
                    onClick={exportToPDF}
                    className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button
                    onClick={exportToJSON}
                    className="w-full px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                  >
                    <FileJson className="w-4 h-4" />
                    <span>Export as JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Bookmarks Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
                  <Bookmark className="w-5 h-5 text-cyan-400" />
                  Bookmarked Events
                </h3>
                <div className="space-y-3">
                  {bookmarkedEvents.length === 0 ? (
                    <p className="text-sm text-gray-400">No bookmarked events yet</p>
                  ) : (
                    bookmarkedEvents.map((event) => (
                      <div key={event.id} className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-white">{event.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {event.day}
                              </span>
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {event.time}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleBookmark(event.id)}
                            className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Timetable Grid */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Weekly Schedule
                </h3>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                    {/* Header Row */}
                    <div className="p-3 font-medium text-center text-sm text-gray-400">Time</div>
                    {DAYS.map((day) => (
                      <div key={day} className="p-3 font-medium text-center text-sm bg-white/10 rounded-lg text-white">
                        {day}
                      </div>
                    ))}

                    {/* Time Slots */}
                    {TIME_SLOTS.map((time) => (
                      <>
                        <div key={time} className="p-3 text-sm text-gray-400 text-center font-medium">
                          {time}
                        </div>
                        {DAYS.map((day) => {
                          const event = getEventForSlot(day, time)
                          return (
                            <div
                              key={`${day}-${time}`}
                              className="min-h-[80px] border-2 border-dashed border-white/20 rounded-lg p-2 hover:border-cyan-400/50 transition-colors cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, day, time)}
                              onClick={() => handleSlotClick(day, time)}
                            >
                              {event ? (
                                <div
                                  draggable
                                  onDragStart={() => handleDragStart(event)}
                                  className={`${event.color} p-3 rounded-lg border-2 cursor-move hover:shadow-md transition-all group relative`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm">{event.title}</h4>
                                      <p className="text-xs opacity-80 mt-1">{event.description}</p>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => toggleBookmark(event.id)}
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                      >
                                        <Bookmark className={`w-3 h-3 ${event.isBookmarked ? "fill-current" : ""}`} />
                                      </button>
                                      <button
                                        onClick={() => openEditDialog(event)}
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                      >
                                        <Edit className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="p-1 hover:bg-white/20 rounded transition-colors text-red-400"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
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
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Create New Event</h3>
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Event Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select day</option>
                    {DAYS.map((day) => (
                      <option key={day} value={day} className="bg-gray-800">
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select time</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time} className="bg-gray-800">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Color Theme</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  {COLORS.map((color) => (
                    <option key={color.name} value={color.class} className="bg-gray-800">
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-300 hover:to-purple-500 transition-all duration-300"
                >
                  Create Event
                </button>
                <button
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Edit Event</h3>
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Event Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select day</option>
                    {DAYS.map((day) => (
                      <option key={day} value={day} className="bg-gray-800">
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select time</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time} className="bg-gray-800">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Color Theme</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  {COLORS.map((color) => (
                    <option key={color.name} value={color.class} className="bg-gray-800">
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleEditEvent}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-300 hover:to-purple-500 transition-all duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default TimeTableManagerPage
