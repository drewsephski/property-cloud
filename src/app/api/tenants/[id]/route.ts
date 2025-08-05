import { NextRequest, NextResponse } from 'next/server'
import { Tenant } from '@/lib/api'

// Mock database - in production, this would be a real database
const tenants: Tenant[] = [
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tenant = tenants.find(t => t.id === params.id)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(tenant)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tenant' },
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
    const tenantIndex = tenants.findIndex(t => t.id === params.id)
    
    if (tenantIndex === -1) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }
    
    tenants[tenantIndex] = {
      ...tenants[tenantIndex],
      ...body
    }
    
    return NextResponse.json(tenants[tenantIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update tenant' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tenantIndex = tenants.findIndex(t => t.id === params.id)
    
    if (tenantIndex === -1) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }
    
    tenants.splice(tenantIndex, 1)
    return NextResponse.json({ message: 'Tenant deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete tenant' },
      { status: 500 }
    )
  }
}