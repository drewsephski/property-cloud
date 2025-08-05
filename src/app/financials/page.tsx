"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Download,
  Filter,
  Calendar,
  CreditCard,
  Wallet,
  PieChart
} from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  property: string
  type: 'income' | 'expense'
  category: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-01',
    description: 'Rent Payment - Unit A-101',
    property: 'Sunset Apartments',
    type: 'income',
    category: 'Rent',
    amount: 2200,
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-02-01',
    description: 'HVAC Maintenance',
    property: 'Oak Grove Complex',
    type: 'expense',
    category: 'Maintenance',
    amount: 450,
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-02-02',
    description: 'Property Insurance',
    property: 'Pine Valley Homes',
    type: 'expense',
    category: 'Insurance',
    amount: 800,
    status: 'pending'
  },
  {
    id: '4',
    date: '2024-02-03',
    description: 'Rent Payment - Unit B-205',
    property: 'Oak Grove Complex',
    type: 'income',
    category: 'Rent',
    amount: 1800,
    status: 'completed'
  }
]

export default function FinancialsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const netIncome = totalIncome - totalExpenses

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab="financials"
        onTabChange={() => {}}
        pendingMaintenance={0}
        overdueTenants={0}
      />

      <div className="flex">
        <div className="hidden md:block w-64"></div>
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Financials</h1>
                <p className="text-gray-600">Track income, expenses, and financial performance</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    <p className="text-xs text-red-600">+5% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Net Income</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${netIncome.toLocaleString()}
                  </div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Profit Margin</CardTitle>
                    <PieChart className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {totalIncome > 0 ? Math.round((netIncome / totalIncome) * 100) : 0}%
                  </div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+3% from last month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transaction.description}</div>
                        </TableCell>
                        <TableCell>{transaction.property}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Financial Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Chart visualization coming soon</p>
                    <p className="text-sm">Financial charts in development</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Trend analysis coming soon</p>
                    <p className="text-sm">Advanced analytics in development</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}