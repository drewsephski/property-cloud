import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// State interfaces
export interface AppState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  theme: 'light' | 'dark' | 'system'
  preferences: UserPreferences
  notifications: Notification[]
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  avatar?: string
  lastLogin: string
  createdAt: string
}

export interface UserPreferences {
  language: string
  currency: string
  timezone: string
  dateFormat: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  dashboard: {
    defaultView: 'grid' | 'list'
    showCharts: boolean
    showMetrics: boolean
  }
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'LOGOUT' }

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  theme: 'system',
  preferences: {
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    dashboard: {
      defaultView: 'grid',
      showCharts: true,
      showMetrics: true,
    },
  },
  notifications: [],
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            read: false,
          },
        ],
      }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      }
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          ({ ...notification, read: true })
        ),
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        notifications: [],
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const savedPreferences = localStorage.getItem('preferences')

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: 'SET_USER', payload: user })
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('user')
      }
    }

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    }

    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences)
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences })
      } catch (error) {
        console.error('Error parsing saved preferences:', error)
        localStorage.removeItem('preferences')
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Save theme and preferences to localStorage when they change
  useEffect(() => {
    if (state.theme !== 'system') {
      localStorage.setItem('theme', state.theme)
    } else {
      localStorage.removeItem('theme')
    }
  }, [state.theme])

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(state.preferences))
  }, [state.preferences])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}