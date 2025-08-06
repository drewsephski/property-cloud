import { useState, useEffect, useCallback } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { storageUtils } from '@/lib/storage'

export interface AuthState {
  user: {
    id: string
    email: string
    name: string
    role: 'admin' | 'manager' | 'user'
    avatar?: string
    lastLogin: string
    createdAt: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshUser: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const { state, dispatch } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load auth state from sessionStorage on mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedAuthState = storageUtils.loadAuthState()
        if (savedAuthState && typeof savedAuthState === 'object' && 'user' in savedAuthState && savedAuthState.user && typeof savedAuthState.user === 'object') {
          // Type guard to ensure user has required properties
          const user = savedAuthState.user as { id: string; email: string; name: string; role: 'admin' | 'manager' | 'user'; lastLogin: string; createdAt: string }
          if (user.id && user.email && user.name && user.role) {
            dispatch({ type: 'SET_USER', payload: user })
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error)
        dispatch({ type: 'SET_USER', payload: null })
      }
    }

    loadAuthState()
  }, [dispatch])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from your API
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0].replace('.', ' '),
        role: 'admin' as const,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      // Save to state and sessionStorage
      dispatch({ type: 'SET_USER', payload: mockUser })
      storageUtils.saveAuthState({ user: mockUser })

      // Simulate successful login
    } catch (error) {
      const errorMessage = 'Invalid email or password'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    storageUtils.clearUserData()
  }, [dispatch])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (!state.user) return

    setIsLoading(true)
    try {
      // Simulate API call to refresh user data
      await new Promise(resolve => setTimeout(resolve, 500))

      // In a real app, you would fetch fresh user data from your API
      const refreshedUser = {
        ...state.user,
        lastLogin: new Date().toISOString(),
      }

      dispatch({ type: 'SET_USER', payload: refreshedUser })
      storageUtils.saveAuthState({ user: refreshedUser })
    } catch (error) {
      console.error('Error refreshing user data:', error)
      setError('Failed to refresh user data')
    } finally {
      setIsLoading(false)
    }
  }, [state.user, dispatch])

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: isLoading || state.isLoading,
    error,
    login,
    logout,
    clearError,
    refreshUser,
  }
}

// Hook for checking authentication status
export function useAuthStatus() {
  const { state } = useAppContext()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedAuthState = storageUtils.loadAuthState()
        const hasValidAuth = savedAuthState && typeof savedAuthState === 'object' && 'user' in savedAuthState && savedAuthState.user && typeof savedAuthState.user === 'object' && state.isAuthenticated
        
        setIsAuthenticated(!!hasValidAuth)
      } catch (error) {
        console.error('Error checking auth status:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [state.isAuthenticated])

  return { isAuthenticated, isLoading }
}

// Hook for protected routes
export function useProtected() {
  const { isAuthenticated, isLoading } = useAuthStatus()
  
  if (isLoading) {
    return {
      isLoading: true,
      isAuthorized: false,
      redirect: false,
    }
  }

  if (!isAuthenticated) {
    return {
      isLoading: false,
      isAuthorized: false,
      redirect: true,
    }
  }

  return {
    isLoading: false,
    isAuthorized: true,
    redirect: false,
  }
}

// Hook for role-based access control
export function useRoleAccess(requiredRoles: string[]) {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = () => {
      if (!user) {
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      const userRole = user.role
      const hasRequiredRole = requiredRoles.includes(userRole)
      setHasAccess(hasRequiredRole)
      setIsLoading(false)
    }

    checkAccess()
  }, [user, requiredRoles])

  return { hasAccess, isLoading }
}

// Hook for session management
export function useSession() {
  const { user, logout } = useAuth()
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null)
  const [isSessionExpiring, setIsSessionExpiring] = useState(false)

  useEffect(() => {
    if (!user) return

    // Check if session is about to expire (30 minutes)
    const checkSessionExpiry = () => {
      const lastLogin = new Date(user.lastLogin)
      const now = new Date()
      const timeSinceLogin = now.getTime() - lastLogin.getTime()
      const sessionTimeout = 30 * 60 * 1000 // 30 minutes
      
      const timeLeft = sessionTimeout - timeSinceLogin
      
      if (timeLeft > 0) {
        setSessionTimeLeft(timeLeft)
        
        // Show warning when 5 minutes left
        if (timeLeft <= 5 * 60 * 1000) {
          setIsSessionExpiring(true)
        } else {
          setIsSessionExpiring(false)
        }
      } else {
        // Session expired
        logout()
      }
    }

    // Check every minute
    const interval = setInterval(checkSessionExpiry, 60 * 1000)
    checkSessionExpiry() // Initial check

    return () => clearInterval(interval)
  }, [user, logout])

  const refreshSession = useCallback(() => {
    if (user) {
      const refreshedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      }
      
      // Update in context and storage
      // Update in context and storage
      // Note: We can't call dispatch inside useCallback, so this will be handled by the parent component
      storageUtils.saveAuthState({ user: refreshedUser })
      
      // Reset session state
      setSessionTimeLeft(30 * 60 * 1000) // 30 minutes
      setIsSessionExpiring(false)
    }
  }, [user])

  return {
    sessionTimeLeft,
    isSessionExpiring,
    refreshSession,
    formatTimeLeft: (milliseconds: number) => {
      const minutes = Math.floor(milliseconds / (1000 * 60))
      const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
  }
}