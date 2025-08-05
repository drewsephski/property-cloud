import { NextRequest, NextResponse } from 'next/server'
import { Property } from '@/lib/api'

// Mock database - in production, this would be a real database
const properties: Property[] = [
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = properties.find(p => p.id === params.id)
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const propertyIndex = properties.findIndex(p => p.id === params.id)
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }
    
    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...body,
      occupancyRate: body.units && body.occupied 
        ? Math.round((body.occupied / body.units) * 100)
        : properties[propertyIndex].occupancyRate
    }
    
    return NextResponse.json(properties[propertyIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyIndex = properties.findIndex(p => p.id === params.id)
    
    if (propertyIndex === -1) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }
    
    properties.splice(propertyIndex, 1)
    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}