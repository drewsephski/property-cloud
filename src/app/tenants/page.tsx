"use client"

import { useState, useEffect } from "react"
import { tenantAPI, Tenant } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TenantForm, SimplifiedTenantForm } from "@/components/property-forms"
import { Navigation } from "@/components/navigation"
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  User,
  Edit,
  Trash2,
  Users
} from "lucide-react"

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [tenantFormOpen, setTenantFormOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [useSimplifiedForm, setUseSimplifiedForm] = useState(true)

  useEffect(() => {
    loadTenants()
  }, [])

  const loadTenants = async () => {
    try {
      setLoading(true)
      const data = await tenantAPI.getTenants()
      setTenants(data)
    } catch (error) {
      console.error('Error loading tenants:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTenantSubmit = async (data: Omit<Tenant, 'id'>) => {
    try {
      if (selectedTenant) {
        await tenantAPI.updateTenant(selectedTenant.id, data)
      } else {
        await tenantAPI.createTenant(data)
      }
      await loadTenants()
      setTenantFormOpen(false)
      setSelectedTenant(null)
    } catch (error) {
      console.error("Error saving tenant:", error)
    }
  }

  const handleDeleteTenant = async (id: string) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      try {
        await tenantAPI.deleteTenant(id)
        await loadTenants()
      } catch (error) {
        console.error("Error deleting tenant:", error)
      }
    }
  }

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || tenant.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tenants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab="tenants"
        onTabChange={() => {}}
        pendingMaintenance={0}
        overdueTenants={tenants.filter(t => t.status === 'overdue').length}
        todayEvents={0}
      />

      <div className="flex">
        <div className="hidden md:block w-64"></div>
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
                <p className="text-gray-600">Manage tenant information and leases</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Quick Add:</span>
                  <Button
                    variant={useSimplifiedForm ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseSimplifiedForm(true)}
                  >
                    Simplified
                  </Button>
                  <Button
                    variant={useSimplifiedForm ? "outline" : "default"}
                    size="sm"
                    onClick={() => setUseSimplifiedForm(false)}
                  >
                    Detailed
                  </Button>
                </div>
                <Button onClick={() => setTenantFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search tenants by name, unit, or email..." 
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
            </div>

            {/* Tenants Table */}
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
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={tenant.avatar} />
                            <AvatarFallback>
                              {tenant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{tenant.name}</div>
                            <div className="text-sm text-gray-500">
                              Tenant ID: {tenant.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {tenant.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {tenant.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tenant.unit}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${tenant.rent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tenant.status)}>
                          {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Due: {new Date(tenant.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</div>
                          <div className="text-gray-500">
                            {Math.ceil((new Date(tenant.leaseEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setSelectedTenant(tenant)
                              setTenantFormOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteTenant(tenant.id)}
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

            {filteredTenants.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search terms or filters.' 
                    : 'Get started by adding your first tenant.'}
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button onClick={() => setTenantFormOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tenant
                  </Button>
                )}
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-2xl font-bold text-blue-600">{tenants.length}</div>
                <div className="text-sm text-gray-600">Total Tenants</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {tenants.filter(t => t.status === 'paid').length}
                </div>
                <div className="text-sm text-gray-600">Paid</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {tenants.filter(t => t.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {tenants.filter(t => t.status === 'overdue').length}
                </div>
                <div className="text-sm text-gray-600">Overdue</div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {useSimplifiedForm ? (
        <SimplifiedTenantForm
          open={tenantFormOpen}
          onOpenChange={setTenantFormOpen}
          onSubmit={handleTenantSubmit}
          initialData={selectedTenant || undefined}
        />
      ) : (
        <TenantForm
          open={tenantFormOpen}
          onOpenChange={setTenantFormOpen}
          onSubmit={handleTenantSubmit}
          initialData={selectedTenant || undefined}
        />
      )}
    </div>
  )
}