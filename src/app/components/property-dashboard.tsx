"use client"

import { useState } from "react"
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Home,
  Calendar,
  FileText,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import React from "react"

// Mock data
const mockProperties = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Main St, Downtown",
    units: 24,
    occupied: 22,
    monthlyRevenue: 48000,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Oak Grove Complex",
    address: "456 Oak Ave, Midtown",
    units: 18,
    occupied: 16,
    monthlyRevenue: 32000,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "Pine Valley Homes",
    address: "789 Pine Rd, Suburbs",
    units: 12,
    occupied: 12,
    monthlyRevenue: 28000,
    image: "/api/placeholder/300/200"
  }
]

const mockTenants = [
  { id: 1, name: "John Smith", unit: "A-101", rent: 2200, status: "paid", dueDate: "2024-02-01" },
  { id: 2, name: "Sarah Johnson", unit: "B-205", rent: 1800, status: "overdue", dueDate: "2024-01-15" },
  { id: 3, name: "Mike Davis", unit: "C-304", rent: 2000, status: "pending", dueDate: "2024-02-01" },
  { id: 4, name: "Lisa Wilson", unit: "A-203", rent: 2100, status: "paid", dueDate: "2024-02-01" }
]

const mockMaintenanceRequests = [
  { id: 1, tenant: "John Smith", unit: "A-101", issue: "Leaky faucet", priority: "medium", status: "in-progress" },
  { id: 2, tenant: "Sarah Johnson", unit: "B-205", issue: "AC not working", priority: "high", status: "pending" },
  { id: 3, tenant: "Mike Davis", unit: "C-304", issue: "Light bulb replacement", priority: "low", status: "completed" }
]

export function PropertyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalUnits = mockProperties.reduce((sum, prop) => sum + prop.units, 0)
  const totalOccupied = mockProperties.reduce((sum, prop) => sum + prop.occupied, 0)
  const totalRevenue = mockProperties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0)
  const occupancyRate = Math.round((totalOccupied / totalUnits) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">PropertyManager</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "properties", label: "Properties", icon: Building2 },
              { id: "tenants", label: "Tenants", icon: Users },
              { id: "maintenance", label: "Maintenance", icon: Wrench },
              { id: "financials", label: "Financials", icon: DollarSign },
              { id: "calendar", label: "Calendar", icon: Calendar },
              { id: "documents", label: "Documents", icon: FileText }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockProperties.length}</div>
                    <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{occupancyRate}%</div>
                    <p className="text-xs text-gray-500 mt-1">{totalOccupied}/{totalUnits} units occupied</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Maintenance Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockMaintenanceRequests.length}</div>
                    <p className="text-xs text-orange-600 mt-1">2 pending review</p>
                  </CardContent>
                </Card>
              </div>

              {/* Properties Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="h-48 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold text-lg">{property.name}</h3>
                          <p className="text-sm opacity-90">{property.address}</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Units</span>
                          <span className="font-medium">{property.occupied}/{property.units}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-600">Monthly Revenue</span>
                          <span className="font-medium">${property.monthlyRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">View Details</Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tenants" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Tenants</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search tenants..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Tenants Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-600">Tenant</th>
                          <th className="text-left p-4 font-medium text-gray-600">Unit</th>
                          <th className="text-left p-4 font-medium text-gray-600">Rent</th>
                          <th className="text-left p-4 font-medium text-gray-600">Status</th>
                          <th className="text-left p-4 font-medium text-gray-600">Due Date</th>
                          <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTenants.map((tenant) => (
                          <tr key={tenant.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="font-medium text-gray-900">{tenant.name}</div>
                            </td>
                            <td className="p-4 text-gray-600">{tenant.unit}</td>
                            <td className="p-4 font-medium">${tenant.rent}</td>
                            <td className="p-4">
                              <Badge 
                                variant={
                                  tenant.status === "paid" ? "default" : 
                                  tenant.status === "overdue" ? "destructive" : "secondary"
                                }
                              >
                                {tenant.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-600">{tenant.dueDate}</td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "maintenance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Maintenance Requests</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>

              <div className="grid gap-4">
                {mockMaintenanceRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{request.issue}</h3>
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
                          </div>
                          <p className="text-sm text-gray-600">
                            {request.tenant} • Unit {request.unit}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!["overview", "tenants", "maintenance"].includes(activeTab) && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h3>
                <p className="text-gray-600">This section is coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}