"use client"

import { useState, useEffect } from "react"
import { propertyAPI, Property } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PropertyForm } from "@/components/property-forms"
import { Navigation } from "@/components/navigation"
import {
    Plus,
    Search,
    Filter,
    MapPin,
    Eye,
    Edit,
    Trash2,
    Building2
} from "lucide-react"

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [propertyFormOpen, setPropertyFormOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

    useEffect(() => {
        loadProperties()
    }, [])

    const loadProperties = async () => {
        try {
            setLoading(true)
            const data = await propertyAPI.getProperties()
            setProperties(data)
        } catch (error) {
            console.error('Error loading properties:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePropertySubmit = async (data: Omit<Property, 'id'>) => {
        try {
            if (selectedProperty) {
                await propertyAPI.updateProperty(selectedProperty.id, data)
            } else {
                await propertyAPI.createProperty(data)
            }
            await loadProperties()
            setPropertyFormOpen(false)
            setSelectedProperty(null)
        } catch (error) {
            console.error("Error saving property:", error)
        }
    }

    const handleDeleteProperty = async (id: string) => {
        if (confirm('Are you sure you want to delete this property?')) {
            try {
                await propertyAPI.deleteProperty(id)
                await loadProperties()
            } catch (error) {
                console.error("Error deleting property:", error)
            }
        }
    }

    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading properties...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            <Navigation
                activeTab="properties"
                onTabChange={() => { }}
                pendingMaintenance={0}
                overdueTenants={0}
                todayEvents={0}
            />

            <div className="flex flex-1 overflow-hidden">
                <div className="hidden md:block w-64"></div>

                <main className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                                <p className="text-gray-600">Manage your property portfolio</p>
                            </div>
                            <Button onClick={() => setPropertyFormOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Property
                            </Button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search properties by name, address, or city..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>

                        {/* Properties Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProperties.map((property) => (
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
                                                <span className="text-sm font-medium">{property.occupancyRate}%</span>
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
                                            {property.amenities && property.amenities.length > 0 && (
                                                <div>
                                                    <span className="text-sm text-gray-600">Amenities:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {property.amenities.slice(0, 3).map((amenity, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {amenity}
                                                            </Badge>
                                                        ))}
                                                        {property.amenities.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{property.amenities.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <Button size="sm" className="flex-1 text-xs">
                                                <Eye className="h-3 w-3 mr-1" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedProperty(property)
                                                    setPropertyFormOpen(true)
                                                }}
                                            >
                                                <Edit className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteProperty(property.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredProperties.length === 0 && (
                            <div className="text-center py-12">
                                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                                <p className="text-gray-600 mb-4">
                                    {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first property.'}
                                </p>
                                {!searchTerm && (
                                    <Button onClick={() => setPropertyFormOpen(true)}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Property
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <PropertyForm
                open={propertyFormOpen}
                onOpenChange={setPropertyFormOpen}
                onSubmit={handlePropertySubmit}
                initialData={selectedProperty || undefined}
            />
        </div>
    )
}