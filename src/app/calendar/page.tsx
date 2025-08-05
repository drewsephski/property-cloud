"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Wrench,
  DollarSign,
  Home,
  AlertTriangle,
  Edit,
  Trash2,
  Search,
  Filter,
  Download
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'maintenance' | 'inspection' | 'lease' | 'payment' | 'showing'
  location?: string
  tenant?: string
  priority?: 'low' | 'medium' | 'high'
  status: 'scheduled' | 'completed' | 'cancelled'
  description?: string
  duration?: number
  createdAt: string
  updatedAt: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [eventFormOpen, setEventFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [dayEventsOpen, setDayEventsOpen] = useState(false)
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([])
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'maintenance' as 'maintenance' | 'inspection' | 'lease' | 'payment' | 'showing',
    location: '',
    tenant: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled',
    description: '',
    duration: 60
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'maintenance' | 'inspection' | 'lease' | 'payment' | 'showing'>('all')
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [showWeekends, setShowWeekends] = useState(true)
  const [todayEvents, setTodayEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    loadCalendarEvents()
  }, [])

  useEffect(() => {
    // Get today's events for dashboard integration
    const today = new Date().toISOString().split('T')[0]
    const todayEventsList = events.filter(event => event.date === today && event.status === 'scheduled')
    setTodayEvents(todayEventsList)
  }, [events])

  const loadCalendarEvents = async () => {
    try {
      setLoading(true)
      // Mock calendar events - in real app, this would fetch from API
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'AC Repair - Unit B-205',
          date: '2025-02-15',
          time: '10:00',
          type: 'maintenance',
          location: 'Oak Grove Complex - B-205',
          tenant: 'Sarah Johnson',
          priority: 'high',
          status: 'scheduled',
          description: 'Air conditioning unit not cooling properly. Tenant reports warm air coming from vents.',
          duration: 120,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Lease Renewal Meeting',
          date: '2025-02-16',
          time: '14:00',
          type: 'lease',
          location: 'Pine Valley Homes - C-304',
          tenant: 'Mike Davis',
          status: 'scheduled',
          description: 'Annual lease renewal discussion and contract signing.',
          duration: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Property Inspection',
          date: '2025-02-18',
          time: '09:00',
          type: 'inspection',
          location: 'Sunset Apartments',
          status: 'scheduled',
          description: 'Quarterly property inspection for maintenance and safety compliance.',
          duration: 180,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Rent Collection Follow-up',
          date: '2025-02-20',
          time: '11:00',
          type: 'payment',
          tenant: 'Sarah Johnson',
          status: 'scheduled',
          description: 'Follow up on overdue rent payment.',
          duration: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Property Showing',
          date: '2025-02-22',
          time: '15:00',
          type: 'showing',
          location: 'Sunset Apartments - A-105',
          status: 'scheduled',
          description: 'Show vacant unit to prospective tenants.',
          duration: 45,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setEvents(mockEvents)
    } catch (error) {
      console.error('Error loading calendar events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = () => {
    setSelectedEvent(null)
    setFormData({
      title: '',
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      time: '',
      type: 'maintenance',
      location: '',
      tenant: '',
      priority: 'medium',
      status: 'scheduled',
      description: '',
      duration: 60
    })
    setEventFormOpen(true)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      location: event.location || '',
      tenant: event.tenant || '',
      priority: event.priority || 'medium',
      status: event.status,
      description: event.description || '',
      duration: event.duration || 60
    })
    setEventFormOpen(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId))
    }
  }

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newEvent: CalendarEvent = {
      id: selectedEvent?.id || Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      location: formData.location,
      tenant: formData.tenant,
      priority: formData.priority,
      status: formData.status,
      description: formData.description,
      duration: formData.duration,
      createdAt: selectedEvent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? newEvent : e))
    } else {
      setEvents([...events, newEvent])
    }

    setEventFormOpen(false)
    setSelectedEvent(null)
  }

  const handleExportEvents = () => {
    const csvContent = [
      ["Title", "Date", "Time", "Type", "Location", "Tenant", "Priority", "Status", "Duration", "Description"],
      ...events.map(event => [
        event.title,
        event.date,
        event.time,
        event.type,
        event.location || "",
        event.tenant || "",
        event.priority || "",
        event.status,
        event.duration?.toString() || "",
        event.description || ""
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `calendar-events-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Wrench className="h-4 w-4" />
      case 'inspection': return <Home className="h-4 w-4" />
      case 'lease': return <User className="h-4 w-4" />
      case 'payment': return <DollarSign className="h-4 w-4" />
      case 'showing': return <MapPin className="h-4 w-4" />
      default: return <CalendarIcon className="h-4 w-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'inspection': return 'bg-blue-100 text-blue-800'
      case 'lease': return 'bg-green-100 text-green-800'
      case 'payment': return 'bg-purple-100 text-purple-800'
      case 'showing': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500'
      case 'medium': return 'border-l-4 border-yellow-500'
      case 'low': return 'border-l-4 border-green-500'
      default: return 'border-l-4 border-gray-300'
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    
    return days
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

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

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + (direction === 'prev' ? -7 : 7))
      return newDate
    })
  }

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(prev.getDate() + (direction === 'prev' ? -1 : 1))
      return newDate
    })
  }

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  const getEventsForWeek = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= startOfWeek && eventDate <= endOfWeek
    })
  }

  const getEventsForDay = () => {
    const dateStr = currentDate.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tenant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab="calendar"
        onTabChange={() => {}}
        pendingMaintenance={events.filter(e => e.type === 'maintenance' && e.status === 'scheduled').length}
        overdueTenants={0}
        todayEvents={todayEvents.length}
      />

      <div className="md:ml-64">
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                  <p className="text-gray-600">Schedule and track property management events</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleAddEvent}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportEvents}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events, tenants, or locations..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={filterType} onValueChange={(value: 'all' | 'maintenance' | 'inspection' | 'lease' | 'payment' | 'showing') => setFilterType(value)}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="lease">Lease</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="showing">Showing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant={showWeekends ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowWeekends(!showWeekends)}
                  >
                    Weekends
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {viewMode === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                        {viewMode === 'week' && `Week of ${getWeekDays()[0].toLocaleDateString()} - ${getWeekDays()[6].toLocaleDateString()}`}
                        {viewMode === 'day' && currentDate.toLocaleDateString()}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {viewMode === 'month' && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentDate(new Date())}
                            >
                              Today
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {viewMode === 'week' && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentDate(new Date())}
                            >
                              This Week
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {viewMode === 'day' && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => navigateDay('prev')}>
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentDate(new Date())}
                            >
                              Today
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateDay('next')}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {showWeekends ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                          {day}
                        </div>
                      )) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className={showWeekends ? "grid grid-cols-7 gap-1" : "grid grid-cols-5 gap-1"}>
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
                        <div key={`empty-${index}`} className="p-2 h-20"></div>
                      ))}
                      
                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
                        const date = index + 1
                        const dayEvents = getEventsForDate(date)
                        const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toDateString()
                        
                        return (
                          <div
                            key={date}
                            className={`p-2 h-20 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                              isToday ? 'bg-blue-50 border-blue-200 shadow-sm' : 'border-gray-200'
                            }`}
                            onClick={() => {
                              const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
                              setSelectedDate(clickedDate)
                              const dayEvents = getEventsForDate(date)
                              if (dayEvents.length > 0) {
                                setSelectedDayEvents(dayEvents)
                                setDayEventsOpen(true)
                              }
                            }}
                          >
                            <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                              {date}
                            </div>
                            <div className="mt-1 space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1 py-0.5 rounded truncate font-medium ${event.status === 'completed' ? 'bg-green-100 text-green-800 line-through' : event.status === 'cancelled' ? 'bg-red-100 text-red-800' : getEventTypeColor(event.type)}`}
                                  title={`${event.title} (${event.status})`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Calendar Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {events.filter(e => e.status === 'scheduled').length}
                        </div>
                        <div className="text-xs text-gray-600">Scheduled</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {events.filter(e => e.status === 'completed').length}
                        </div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {events.filter(e => e.priority === 'high').length}
                        </div>
                        <div className="text-xs text-gray-600">High Priority</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {filteredEvents.length}
                        </div>
                        <div className="text-xs text-gray-600">Filtered</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Upcoming Events
                      </CardTitle>
                      <Button size="sm" variant="ghost" onClick={() => {
                        setSearchTerm('')
                        setFilterType('all')
                      }}>
                        Clear Filters
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                        <div key={event.id} className={`p-3 rounded-lg bg-white border ${getPriorityColor(event.priority)} hover:shadow-md transition-shadow cursor-pointer`} onClick={() => handleEditEvent(event)}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                {getEventTypeIcon(event.type)}
                                <span className="font-medium text-sm">{event.title}</span>
                                {event.priority === 'high' && (
                                  <AlertTriangle className="h-3 w-3 text-red-500" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
                                </div>
                                {event.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {event.location}
                                  </div>
                                )}
                                {event.tenant && (
                                  <div className="flex items-center">
                                    <User className="h-3 w-3 mr-1" />
                                    {event.tenant}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-gray-500">
                          <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No upcoming events</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Event Type Summary */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Event Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 mr-2 text-orange-600" />
                          <span className="text-sm">Maintenance</span>
                        </div>
                        <Badge variant="secondary">
                          {events.filter(e => e.type === 'maintenance').length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-sm">Inspections</span>
                        </div>
                        <Badge variant="secondary">
                          {events.filter(e => e.type === 'inspection').length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm">Lease Events</span>
                        </div>
                        <Badge variant="secondary">
                          {events.filter(e => e.type === 'lease').length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm">Showings</span>
                        </div>
                        <Badge variant="secondary">
                          {events.filter(e => e.type === 'showing').length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Event Form Dialog */}
      <Dialog open={eventFormOpen} onOpenChange={setEventFormOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              {selectedEvent ? "Update event details" : "Create a new calendar event"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                required
                minLength={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={formData.type} onValueChange={(value: 'maintenance' | 'inspection' | 'lease' | 'payment' | 'showing') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="lease">Lease</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="showing">Showing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenant">Tenant</Label>
              <Input
                id="tenant"
                value={formData.tenant}
                onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
                placeholder="Enter tenant name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
                placeholder="60"
                min="15"
                step="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status || 'scheduled'} onValueChange={(value: 'scheduled' | 'completed' | 'cancelled') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEventFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedEvent ? "Update Event" : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Day Events Dialog */}
      <Dialog open={dayEventsOpen} onOpenChange={setDayEventsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Events for {selectedDate?.toLocaleDateString()}
              <Button size="sm" onClick={handleAddEvent}>
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {selectedDayEvents.map(event => (
              <Card key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)} ${event.status === 'completed' ? 'opacity-75' : event.status === 'cancelled' ? 'bg-gray-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getEventTypeIcon(event.type)}
                        <span className={`font-medium ${event.status === 'completed' ? 'line-through text-gray-500' : event.status === 'cancelled' ? 'text-gray-500' : ''}`}>
                          {event.title}
                        </span>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        {event.priority === 'high' && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={event.status === 'completed' ? 'default' : event.status === 'cancelled' ? 'destructive' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {formatTime(event.time)} ({event.duration || 60} min)
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2" />
                            {event.location}
                          </div>
                        )}
                        {event.tenant && (
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-2" />
                            {event.tenant}
                          </div>
                        )}
                        {event.description && (
                          <p className="mt-2 text-gray-700">{event.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 ml-4">
                      <Button size="sm" variant="ghost" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}