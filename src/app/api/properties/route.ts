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

export async function GET() {
  try {
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProperty: Property = {
      id: Date.now().toString(),
      occupancyRate: Math.round((body.occupied / body.units) * 100),
      ...body
    }
    
    properties.push(newProperty)
    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}