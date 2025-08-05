import { NextRequest, NextResponse } from 'next/server'
import { MaintenanceRequest } from '@/lib/api'

// Mock database - in production, this would be a real database
const maintenanceRequests: MaintenanceRequest[] = [
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

export async function GET() {
  try {
    return NextResponse.json(maintenanceRequests)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newRequest: MaintenanceRequest = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      ...body
    }
    
    maintenanceRequests.push(newRequest)
    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create maintenance request' },
      { status: 500 }
    )
  }
}