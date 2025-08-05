"use client"

import { useState, useEffect } from "react"
import { maintenanceAPI, MaintenanceRequest } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MaintenanceForm } from "@/components/property-forms"
import { Navigation } from "@/components/navigation"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react"

export default function MaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)

  useEffect(() => {
    loadMaintenanceRequests()
  }, [])

  const loadMaintenanceRequests = async () => {
    try {
      setLoading(true)
      const data = await maintenanceAPI.getMaintenanceRequests()
      setMaintenanceRequests(data)
    } catch (error) {
      console.error('Error loading maintenance requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMaintenanceSubmit = async (data: Omit<MaintenanceRequest, 'id'>) => {
    try {
      if (selectedRequest) {
        await maintenanceAPI.updateMaintenanceRequest(selectedRequest.id, data)
      } else {
        await maintenanceAPI.createMaintenanceRequest(data)
      }
      await loadMaintenanceRequests()
      setMaintenanceFormOpen(false)
      setSelectedRequest(null)
    } catch (error) {
      console.error("Error saving maintenance request:", error)
    }
  }

  const handleDeleteRequest = async (id: string) => {
    if (confirm('Are you sure you want to delete this maintenance request?')) {
      try {
        await maintenanceAPI.deleteMaintenanceRequest(id)
        await loadMaintenanceRequests()
      } catch (error) {
        console.error("Error deleting maintenance request:", error)
      }
    }
  }

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tenant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-gray-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading maintenance requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab="maintenance"
        onTabChange={() => {}}
        pendingMaintenance={maintenanceRequests.filter(r => r.status === 'pending').length}
        overdueTenants={0}
      />

      <div className="flex">
        <div className="hidden md:block w-64"></div>
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
                <p className="text-gray-600">Track and manage property maintenance</p>
              </div>
              <Button onClick={() => setMaintenanceFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search by title, unit, or tenant..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {maintenanceRequests.filter(r => r.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {maintenanceRequests.filter(r => r.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {maintenanceRequests.filter(r => r.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {maintenanceRequests.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Maintenance Requests Table */}
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {request.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.tenant}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.unit}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                        {request.assignedTo && (
                          <div className="text-xs text-gray-500">
                            Assigned to: {request.assignedTo}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setSelectedRequest(request)
                              setMaintenanceFormOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                    ? 'Try adjusting your search terms or filters.' 
                    : 'Get started by creating your first maintenance request.'}
                </p>
                {!searchTerm && filterStatus === 'all' && filterPriority === 'all' && (
                  <Button onClick={() => setMaintenanceFormOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <MaintenanceForm
        open={maintenanceFormOpen}
        onOpenChange={setMaintenanceFormOpen}
        onSubmit={handleMaintenanceSubmit}
        initialData={selectedRequest || undefined}
      />
    </div>
  )
}