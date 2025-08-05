// API Integration Layer for Property Management
// Using real estate APIs from the API.md reference

export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  units: number
  occupied: number
  monthlyRevenue: number
  type: 'apartment' | 'house' | 'condo' | 'commercial'
  yearBuilt: number
  occupancyRate: number
  avgRent: number
  latitude?: number
  longitude?: number
  images?: string[]
  amenities?: string[]
  description?: string
}

export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  unit: string
  rent: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  leaseStart: string
  leaseEnd: string
  avatar?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface MaintenanceRequest {
  id: string
  tenant: string
  tenantId: string
  unit: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other'
  createdAt: string
  updatedAt?: string
  assignedTo?: string
  estimatedCost?: number
  actualCost?: number
  images?: string[]
}

export interface PropertyData {
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: string
  yearBuilt: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  estimatedValue: number
  marketRent: number
  neighborhood: string
  walkScore?: number
  crimeRate?: string
  schoolRating?: number
}

// API Configuration
const API_CONFIG = {
  // Using ATTOM Data API for property information
  ATTOM_API_KEY: process.env.NEXT_PUBLIC_ATTOM_API_KEY || 'demo-key',
  ATTOM_BASE_URL: 'https://api.gateway.attomdata.com/propertyapi/v1.0.0',
  
  // Using Google Maps API for geocoding and location services
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo-key',
  GOOGLE_MAPS_BASE_URL: 'https://maps.googleapis.com/maps/api',
  
  // Using RentSpree API for rental market data
  RENTSPREE_API_KEY: process.env.NEXT_PUBLIC_RENTSPREE_API_KEY || 'demo-key',
  RENTSPREE_BASE_URL: 'https://api.rentspree.com/v1',
  
  // Local API endpoints
  LOCAL_API_BASE_URL: '/api'
}

// Utility function for API calls
async function apiCall(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

// Property API Functions
export const propertyAPI = {
  // Get all properties
  async getProperties(): Promise<Property[]> {
    try {
      // In production, this would call your backend API
      // For now, we'll use mock data with real API structure
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/properties`)
    } catch (error) {
      console.error('Error fetching properties:', error)
      // Fallback to mock data
      return getMockProperties()
    }
  },

  // Get property by ID
  async getProperty(id: string): Promise<Property> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/properties/${id}`)
    } catch (error) {
      console.error('Error fetching property:', error)
      throw error
    }
  },

  // Create new property
  async createProperty(property: Omit<Property, 'id'>): Promise<Property> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/properties`, {
        method: 'POST',
        body: JSON.stringify(property),
      })
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  // Update property
  async updateProperty(id: string, property: Partial<Property>): Promise<Property> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(property),
      })
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  },

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    try {
      await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  },

  // Get property data from external APIs
  async getPropertyData(address: string): Promise<PropertyData | null> {
    try {
      // First, geocode the address
      const geocodeUrl = `${API_CONFIG.GOOGLE_MAPS_BASE_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${API_CONFIG.GOOGLE_MAPS_API_KEY}`
      const geocodeResponse = await apiCall(geocodeUrl)
      
      if (geocodeResponse.results?.length > 0) {
        const location = geocodeResponse.results[0]
        const { lat, lng } = location.geometry.location
        
        // Get property details from ATTOM Data
        const attomUrl = `${API_CONFIG.ATTOM_BASE_URL}/property/detail?latitude=${lat}&longitude=${lng}`
        const attomResponse = await apiCall(attomUrl, {
          headers: {
            'apikey': API_CONFIG.ATTOM_API_KEY,
          },
        })
        
        if (attomResponse.property?.length > 0) {
          const propertyData = attomResponse.property[0]
          return {
            address: propertyData.address?.oneLine || address,
            city: propertyData.address?.locality || '',
            state: propertyData.address?.countrySubd || '',
            zipCode: propertyData.address?.postal1 || '',
            propertyType: propertyData.summary?.proptype || 'Unknown',
            yearBuilt: propertyData.summary?.yearbuilt || 0,
            squareFootage: propertyData.building?.size?.livingsize || 0,
            bedrooms: propertyData.building?.rooms?.beds || 0,
            bathrooms: propertyData.building?.rooms?.bathstotal || 0,
            estimatedValue: propertyData.avm?.amount?.value || 0,
            marketRent: propertyData.avm?.amount?.value * 0.01 || 0, // Rough estimate
            neighborhood: propertyData.area?.subdname || '',
          }
        }
      }
      
      return null
    } catch (error) {
      console.error('Error fetching property data:', error)
      return null
    }
  }
}

// Tenant API Functions
export const tenantAPI = {
  async getTenants(): Promise<Tenant[]> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/tenants`)
    } catch (error) {
      console.error('Error fetching tenants:', error)
      return getMockTenants()
    }
  },

  async getTenant(id: string): Promise<Tenant> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/tenants/${id}`)
    } catch (error) {
      console.error('Error fetching tenant:', error)
      throw error
    }
  },

  async createTenant(tenant: Omit<Tenant, 'id'>): Promise<Tenant> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/tenants`, {
        method: 'POST',
        body: JSON.stringify(tenant),
      })
    } catch (error) {
      console.error('Error creating tenant:', error)
      throw error
    }
  },

  async updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/tenants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tenant),
      })
    } catch (error) {
      console.error('Error updating tenant:', error)
      throw error
    }
  },

  async deleteTenant(id: string): Promise<void> {
    try {
      await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/tenants/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting tenant:', error)
      throw error
    }
  }
}

// Maintenance API Functions
export const maintenanceAPI = {
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/maintenance`)
    } catch (error) {
      console.error('Error fetching maintenance requests:', error)
      return getMockMaintenanceRequests()
    }
  },

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequest> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/maintenance/${id}`)
    } catch (error) {
      console.error('Error fetching maintenance request:', error)
      throw error
    }
  },

  async createMaintenanceRequest(request: Omit<MaintenanceRequest, 'id'>): Promise<MaintenanceRequest> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/maintenance`, {
        method: 'POST',
        body: JSON.stringify(request),
      })
    } catch (error) {
      console.error('Error creating maintenance request:', error)
      throw error
    }
  },

  async updateMaintenanceRequest(id: string, request: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    try {
      return await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/maintenance/${id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
      })
    } catch (error) {
      console.error('Error updating maintenance request:', error)
      throw error
    }
  },

  async deleteMaintenanceRequest(id: string): Promise<void> {
    try {
      await apiCall(`${API_CONFIG.LOCAL_API_BASE_URL}/maintenance/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting maintenance request:', error)
      throw error
    }
  }
}

// Mock data functions (fallback when APIs are not available)
function getMockProperties(): Property[] {
  return [
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Main St',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90210',
      units: 24,
      occupied: 22,
      monthlyRevenue: 48000,
      type: 'apartment',
      yearBuilt: 2018,
      occupancyRate: 92,
      avgRent: 2000,
      latitude: 34.0522,
      longitude: -118.2437,
      amenities: ['Pool', 'Gym', 'Parking', 'Laundry'],
      description: 'Modern apartment complex with premium amenities'
    },
    {
      id: '2',
      name: 'Oak Grove Complex',
      address: '456 Oak Ave',
      city: 'Midtown',
      state: 'CA',
      zipCode: '90211',
      units: 18,
      occupied: 16,
      monthlyRevenue: 32000,
      type: 'apartment',
      yearBuilt: 2015,
      occupancyRate: 89,
      avgRent: 1800,
      latitude: 34.0622,
      longitude: -118.2537,
      amenities: ['Parking', 'Garden', 'Pet-friendly'],
      description: 'Cozy apartment complex in quiet neighborhood'
    },
    {
      id: '3',
      name: 'Pine Valley Homes',
      address: '789 Pine Rd',
      city: 'Suburbs',
      state: 'CA',
      zipCode: '90212',
      units: 12,
      occupied: 12,
      monthlyRevenue: 28000,
      type: 'house',
      yearBuilt: 2020,
      occupancyRate: 100,
      avgRent: 2300,
      latitude: 34.0722,
      longitude: -118.2637,
      amenities: ['Garage', 'Yard', 'Modern appliances'],
      description: 'Single-family homes with private yards'
    }
  ]
}

function getMockTenants(): Tenant[] {
  return [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      unit: 'A-101',
      rent: 2200,
      status: 'paid',
      dueDate: '2024-02-01',
      leaseStart: '2023-01-01',
      leaseEnd: '2024-12-31',
      emergencyContact: {
        name: 'Jane Smith',
        phone: '(555) 123-4568',
        relationship: 'Spouse'
      }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 234-5678',
      unit: 'B-205',
      rent: 1800,
      status: 'overdue',
      dueDate: '2024-01-15',
      leaseStart: '2023-06-01',
      leaseEnd: '2024-05-31',
      emergencyContact: {
        name: 'Mike Johnson',
        phone: '(555) 234-5679',
        relationship: 'Brother'
      }
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '(555) 345-6789',
      unit: 'C-304',
      rent: 2000,
      status: 'pending',
      dueDate: '2024-02-01',
      leaseStart: '2023-03-01',
      leaseEnd: '2024-02-28',
      emergencyContact: {
        name: 'Lisa Davis',
        phone: '(555) 345-6790',
        relationship: 'Wife'
      }
    }
  ]
}

function getMockMaintenanceRequests(): MaintenanceRequest[] {
  return [
    {
      id: '1',
      tenant: 'John Smith',
      tenantId: '1',
      unit: 'A-101',
      title: 'Leaky faucet',
      description: 'Kitchen faucet is dripping constantly',
      priority: 'medium',
      status: 'in-progress',
      category: 'plumbing',
      createdAt: '2024-01-28',
      assignedTo: "Mike's Plumbing",
      estimatedCost: 150
    },
    {
      id: '2',
      tenant: 'Sarah Johnson',
      tenantId: '2',
      unit: 'B-205',
      title: 'AC not working',
      description: 'Air conditioning unit not cooling properly',
      priority: 'high',
      status: 'pending',
      category: 'hvac',
      createdAt: '2024-01-29',
      estimatedCost: 300
    },
    {
      id: '3',
      tenant: 'Mike Davis',
      tenantId: '3',
      unit: 'C-304',
      title: 'Light bulb replacement',
      description: 'Bathroom light bulb needs replacement',
      priority: 'low',
      status: 'completed',
      category: 'electrical',
      createdAt: '2024-01-25',
      assignedTo: 'City Electric',
      estimatedCost: 25,
      actualCost: 20
    }
  ]
}

// Analytics and reporting functions
export const analyticsAPI = {
  async getDashboardStats() {
    try {
      const [properties, tenants, maintenance] = await Promise.all([
        propertyAPI.getProperties(),
        tenantAPI.getTenants(),
        maintenanceAPI.getMaintenanceRequests()
      ])

      const totalUnits = properties.reduce((sum, prop) => sum + prop.units, 0)
      const totalOccupied = properties.reduce((sum, prop) => sum + prop.occupied, 0)
      const totalRevenue = properties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0)
      const occupancyRate = Math.round((totalOccupied / totalUnits) * 100)
      const pendingMaintenance = maintenance.filter(req => req.status === 'pending').length
      const overdueTenants = tenants.filter(tenant => tenant.status === 'overdue').length

      return {
        totalProperties: properties.length,
        totalUnits,
        totalOccupied,
        occupancyRate,
        totalRevenue,
        pendingMaintenance,
        overdueTenants,
        properties,
        tenants,
        maintenance
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }
}