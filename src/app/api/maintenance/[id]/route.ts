import { NextRequest, NextResponse } from 'next/server'
import { MaintenanceRequest } from '@/lib/api'

// Mock database - in production, this would be a real database
let maintenanceRequests: MaintenanceRequest[] = [
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const maintenanceRequest = maintenanceRequests.find(r => r.id === params.id)
    
    if (!maintenanceRequest) {
      return NextResponse.json(
        { error: 'Maintenance request not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(maintenanceRequest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance request' },
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
    const requestIndex = maintenanceRequests.findIndex(r => r.id === params.id)
    
    if (requestIndex === -1) {
      return NextResponse.json(
        { error: 'Maintenance request not found' },
        { status: 404 }
      )
    }
    
    maintenanceRequests[requestIndex] = {
      ...maintenanceRequests[requestIndex],
      ...body,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    return NextResponse.json(maintenanceRequests[requestIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update maintenance request' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestIndex = maintenanceRequests.findIndex(r => r.id === params.id)
    
    if (requestIndex === -1) {
      return NextResponse.json(
        { error: 'Maintenance request not found' },
        { status: 404 }
      )
    }
    
    maintenanceRequests.splice(requestIndex, 1)
    return NextResponse.json({ message: 'Maintenance request deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete maintenance request' },
      { status: 500 }
    )
  }
}