"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench, 
  Home,
  Calendar,
  FileText,
  Settings,
  Bell,
  Download,
  Menu,
  X
} from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  pendingMaintenance: number
  overdueTenants: number
  todayEvents: number
}

export function Navigation({ activeTab, onTabChange, pendingMaintenance, overdueTenants, todayEvents }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home, badge: null, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building2, badge: null, path: "/properties" },
    { id: "tenants", label: "Tenants", icon: Users, badge: overdueTenants > 0 ? overdueTenants : null, path: "/tenants" },
    { id: "maintenance", label: "Maintenance", icon: Wrench, badge: pendingMaintenance > 0 ? pendingMaintenance : null, path: "/maintenance" },
    { id: "financials", label: "Financials", icon: DollarSign, badge: null, path: "/financials" },
    { id: "calendar", label: "Calendar", icon: Calendar, badge: todayEvents > 0 ? todayEvents : null, path: "/calendar" },
    { id: "documents", label: "Documents", icon: FileText, badge: null, path: "/documents" }
  ]

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.path) {
      router.push(item.path)
    } else {
      onTabChange(item.id)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PropertyManager</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Professional Property Management</p>
              </div>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {(pendingMaintenance > 0 || overdueTenants > 0) && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {pendingMaintenance + overdueTenants}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-[73px] w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto">
        <nav className="p-3 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                pathname === item.path || activeTab === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant={item.badge > 0 ? "destructive" : "secondary"} className="h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    router.push('/')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">PropertyManager</span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    pathname === item.path || activeTab === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={item.badge > 0 ? "destructive" : "secondary"} className="h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  router.push('/')
                  setIsMobileMenuOpen(false)
                }}
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {(pendingMaintenance > 0 || overdueTenants > 0) && (
                  <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 flex items-center justify-center">
                    {pendingMaintenance + overdueTenants}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}