"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { propertyAPI, tenantAPI, maintenanceAPI, analyticsAPI, Property, Tenant, MaintenanceRequest } from "@/lib/api"
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Upload,
  MapPin,
  Phone,
  Mail,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PropertyForm, TenantForm, MaintenanceForm } from "./property-forms"

// Dashboard state interface
interface DashboardStats {
  totalProperties: number
  totalUnits: number
  totalOccupied: number
  occupancyRate: number
  totalRevenue: number
  pendingMaintenance: number
  overdueTenants: number
  properties: Property[]
  tenants: Tenant[]
  maintenance: MaintenanceRequest[]
}

export function EnhancedPropertyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [propertyFormOpen, setPropertyFormOpen] = useState(false)
  const [tenantFormOpen, setTenantFormOpen] = useState(false)
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)

  // Load dashboard data
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const stats = await analyticsAPI.getDashboardStats()
      setDashboardStats(stats)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTenants = dashboardStats?.tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || tenant.status === filterStatus
    return matchesSearch && matchesFilter
  }) || []

  const handlePropertySubmit = async (data: Omit<Property, 'id'>) => {
    try {
      await propertyAPI.createProperty(data)
      await loadDashboardData() // Refresh data
      setPropertyFormOpen(false)
    } catch (error) {
      console.error("Error creating property:", error)
    }
  }

  const handleTenantSubmit = async (data: Omit<Tenant, 'id'>) => {
    try {
      await tenantAPI.createTenant(data)
      await loadDashboardData() // Refresh data
      setTenantFormOpen(false)
    } catch (error) {
      console.error("Error creating tenant:", error)
    }
  }

  const handleMaintenanceSubmit = async (data: Omit<MaintenanceRequest, 'id'>) => {
    try {
      await maintenanceAPI.createMaintenanceRequest(data)
      await loadDashboardData() // Refresh data
      setMaintenanceFormOpen(false)
    } catch (error) {
      console.error("Error creating maintenance request:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Error loading dashboard data</p>
          <button 
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              pendingMaintenance={dashboardStats.pendingMaintenance}
              overdueTenants={dashboardStats.overdueTenants} todayEvents={0}      />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block w-64"></div> {/* Spacer for desktop sidebar */}

        {/* Enhanced Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="text-xl font-bold">{dashboardStats.totalProperties}</div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <p className="text-xs text-green-600">+2 from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="text-xl font-bold">{dashboardStats.occupancyRate}%</div>
                    <Progress value={dashboardStats.occupancyRate} className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">{dashboardStats.totalOccupied}/{dashboardStats.totalUnits} units occupied</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="text-xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Maintenance Requests</CardTitle>
                      <Wrench className={`h-4 w-4 ${dashboardStats.pendingMaintenance > 0 ? 'text-orange-600' : 'text-gray-400'}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="text-xl font-bold">{dashboardStats.maintenance.length}</div>
                    <div className="flex items-center mt-1">
                      {dashboardStats.pendingMaintenance > 0 ? (
                        <>
                          <AlertTriangle className="h-3 w-3 text-orange-600 mr-1" />
                          <p className="text-xs text-orange-600">{dashboardStats.pendingMaintenance} pending review</p>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                          <p className="text-xs text-green-600">All up to date</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button onClick={() => setPropertyFormOpen(true)} className="h-auto p-3 flex-col">
                      <Building2 className="h-5 w-5 mb-1" />
                      <span className="text-sm">Add Property</span>
                    </Button>
                    <Button onClick={() => setTenantFormOpen(true)} variant="outline" className="h-auto p-3 flex-col">
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-sm">Add Tenant</span>
                    </Button>
                    <Button onClick={() => setMaintenanceFormOpen(true)} variant="outline" className="h-auto p-3 flex-col">
                      <Wrench className="h-5 w-5 mb-1" />
                      <span className="text-sm">New Request</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Properties Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Properties Overview</h2>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("properties")}>
                    View All Properties
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dashboardStats.properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-gray-900">
                            {property.type}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold text-lg">{property.name}</h3>
                          <p className="text-sm opacity-90 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.address}, {property.city}
                          </p>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Occupancy</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={property.occupancyRate} className="w-16 h-2" />
                              <span className="text-sm font-medium">{property.occupancyRate}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Units</span>
                            <span className="font-medium">{property.occupied}/{property.units}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Monthly Revenue</span>
                            <span className="font-medium text-green-600">${property.monthlyRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Avg. Rent</span>
                            <span className="font-medium">${property.avgRent}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="flex-1 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest updates across your properties</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Payment received from John Smith - Unit A-101</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">New maintenance request - AC not working (B-205)</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Lease renewal signed - Mike Davis (C-304)</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
                <Button onClick={() => setPropertyFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardStats.properties.map((property) => (
                      <Card key={property.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <Badge variant="secondary" className="bg-white/90 text-gray-900">
                              {property.type}
                            </Badge>
                            <Badge variant="outline" className="bg-white/90 text-gray-900 border-white/50">
                              {property.yearBuilt}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-lg">{property.name}</h3>
                            <p className="text-sm opacity-90 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.address}, {property.city}
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Occupancy Rate</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={property.occupancyRate} className="w-16 h-2" />
                                <span className="text-sm font-medium">{property.occupancyRate}%</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Units:</span>
                                <span className="font-medium ml-1">{property.units}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Occupied:</span>
                                <span className="font-medium ml-1">{property.occupied}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Revenue:</span>
                                <span className="font-medium ml-1 text-green-600">${property.monthlyRevenue.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Avg Rent:</span>
                                <span className="font-medium ml-1">${property.avgRent}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="table">
                  <Card className="border-0 shadow-sm">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Units</TableHead>
                          <TableHead>Occupancy</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardStats.properties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{property.name}</div>
                                <div className="text-sm text-gray-500">{property.address}, {property.city}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{property.type}</Badge>
                            </TableCell>
                            <TableCell>{property.units}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={property.occupancyRate} className="w-16 h-2" />
                                <span className="text-sm">{property.occupancyRate}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-green-600 font-medium">
                              ${property.monthlyRevenue.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "tenants" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Tenants</h2>
                <Button onClick={() => setTenantFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </Button>
              </div>

              {/* Enhanced Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search tenants by name or unit..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>

              {/* Enhanced Tenants Table */}
              <Card className="border-0 shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Lease</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={tenant.avatar} />
                              <AvatarFallback>
                                {tenant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{tenant.name}</div>
                              <div className="text-sm text-gray-500">ID: {tenant.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {tenant.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {tenant.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{tenant.unit}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">${tenant.rent.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              tenant.status === "paid" ? "default" : 
                              tenant.status === "overdue" ? "destructive" : "secondary"
                            }
                          >
                            {tenant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{tenant.leaseStart} to</div>
                            <div>{tenant.leaseEnd}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "maintenance" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Maintenance Requests</h2>
                <Button onClick={() => setMaintenanceFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>

              {/* Maintenance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Requests</p>
                        <p className="text-2xl font-bold">{dashboardStats.maintenance.length}</p>
                      </div>
                      <Wrench className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {dashboardStats.maintenance.filter(r => r.status === "pending").length}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {dashboardStats.maintenance.filter(r => r.status === "in-progress").length}
                        </p>
                      </div>
                      <Settings className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-green-600">
                          {dashboardStats.maintenance.filter(r => r.status === "completed").length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Maintenance Requests List */}
              <div className="grid gap-4">
                {dashboardStats.maintenance.map((request) => (
                  <Card key={request.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-gray-900">{request.title}</h3>
                            <Badge 
                              variant={
                                request.priority === "high" ? "destructive" : 
                                request.priority === "medium" ? "secondary" : "outline"
                              }
                            >
                              {request.priority} priority
                            </Badge>
                            <Badge 
                              variant={
                                request.status === "completed" ? "default" : 
                                request.status === "in-progress" ? "secondary" : "outline"
                              }
                            >
                              {request.status}
                            </Badge>
                            <Badge variant="outline">{request.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{request.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {request.tenant}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              Unit {request.unit}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {request.createdAt}
                            </div>
                            {request.assignedTo && (
                              <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-1" />
                                {request.assignedTo}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!["overview", "properties", "tenants", "maintenance"].includes(activeTab) && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h3>
                <p className="text-gray-600">This section is coming soon!</p>
                <Button className="mt-4" variant="outline">
                  Request Feature
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Forms */}
      <PropertyForm 
        open={propertyFormOpen} 
        onOpenChange={setPropertyFormOpen}
        onSubmit={handlePropertySubmit}
      />
      <TenantForm 
        open={tenantFormOpen} 
        onOpenChange={setTenantFormOpen}
        onSubmit={handleTenantSubmit}
      />
      <MaintenanceForm 
        open={maintenanceFormOpen} 
        onOpenChange={setMaintenanceFormOpen}
        onSubmit={handleMaintenanceSubmit}
      />
    </div>
  )
}