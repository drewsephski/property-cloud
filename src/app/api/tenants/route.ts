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

export async function GET() {
  try {
    return NextResponse.json(tenants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tenants' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTenant: Tenant = {
      id: Date.now().toString(),
      ...body
    }
    
    tenants.push(newTenant)
    return NextResponse.json(newTenant, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tenant' },
      { status: 500 }
    )
  }
}