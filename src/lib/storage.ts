/**
 * Data Persistence Layer
 * Provides utilities for localStorage and sessionStorage operations
 * with error handling, serialization, and validation
 */

export interface StorageOptions<T = unknown> {
  defaultValue?: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  validate?: (value: T) => boolean
  version?: number
  migrate?: (value: unknown, version: number) => T
}

// Default serialization functions
export const defaultSerialize = <T>(value: T): string => {
  try {
    return JSON.stringify(value, (key, value) => {
      // Handle special cases like Date objects, Map, Set, etc.
      if (typeof value === 'bigint') {
        return { __bigint: value.toString() }
      }
      if (value instanceof Date) {
        return { __date: value.toISOString() }
      }
      if (value instanceof Map) {
        return { __map: Array.from(value.entries()) }
      }
      if (value instanceof Set) {
        return { __set: Array.from(value) }
      }
      return value
    })
  } catch (error) {
    console.error('Error serializing value:', error)
    throw new Error('Failed to serialize value')
  }
}

export const defaultDeserialize = <T>(value: string): T => {
  try {
    return JSON.parse(value, (key, value) => {
      // Handle special cases
      if (value && typeof value === 'object') {
        if (value.__bigint) {
          return BigInt(value.__bigint)
        }
        if (value.__date) {
          return new Date(value.__date)
        }
        if (value.__map) {
          return new Map(value.__map)
        }
        if (value.__set) {
          return new Set(value.__set)
        }
      }
      return value
    })
  } catch (error) {
    console.error('Error deserializing value:', error)
    throw new Error('Failed to deserialize value')
  }
}

// Storage class for consistent operations
export class StorageManager {
  private storage: Storage
  private prefix: string

  constructor(storage: Storage, prefix = 'pm_') {
    this.storage = storage
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * Set a value in storage
   */
  set<T>(key: string, value: T, options: StorageOptions<T> = {}): void {
    try {
      const serialized = options.serialize 
        ? options.serialize(value) 
        : defaultSerialize(value)
      
      this.storage.setItem(this.getKey(key), serialized)
    } catch (error) {
      console.error(`Error setting value for key "${key}":`, error)
      throw new Error(`Failed to set value for key "${key}"`)
    }
  }

  /**
   * Get a value from storage
   */
  get<T>(key: string, options: StorageOptions<T> = {}): T | null {
    try {
      const item = this.storage.getItem(this.getKey(key))
      if (item === null) {
        return options.defaultValue ?? null
      }

      const deserialized = options.deserialize 
        ? options.deserialize(item) 
        : defaultDeserialize<T>(item)

      // Validate the deserialized value
      if (options.validate && !options.validate(deserialized)) {
        console.warn(`Validation failed for key "${key}", removing invalid value`)
        this.remove(key)
        return options.defaultValue ?? null
      }

      // Handle migration if needed
      if (options.version && options.migrate) {
        try {
          const storedVersion = this.get(`${key}_version`) || 1
          if (typeof storedVersion === 'number' && storedVersion < options.version) {
            const migratedValue = options.migrate(deserialized, storedVersion)
            this.set(key, migratedValue, options)
            this.set(`${key}_version`, options.version)
            return migratedValue
          }
        } catch (error) {
          console.error(`Error migrating value for key "${key}":`, error)
        }
      }

      return deserialized
    } catch (error) {
      console.error(`Error getting value for key "${key}":`, error)
      return options.defaultValue ?? null
    }
  }

  /**
   * Remove a value from storage
   */
  remove(key: string): void {
    try {
      this.storage.removeItem(this.getKey(key))
      // Also remove version key if it exists
      this.storage.removeItem(this.getKey(`${key}_version`))
    } catch (error) {
      console.error(`Error removing value for key "${key}":`, error)
    }
  }

  /**
   * Check if a key exists in storage
   */
  has(key: string): boolean {
    return this.storage.getItem(this.getKey(key)) !== null
  }

  /**
   * Clear all values with this prefix
   */
  clear(): void {
    try {
      const keysToRemove: string[] = []
      
      // Get all keys with our prefix
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key)
        }
      }

      // Remove all keys
      keysToRemove.forEach(key => this.storage.removeItem(key))
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  /**
   * Get all keys with this prefix
   */
  keys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length))
      }
    }
    return keys
  }

  /**
   * Get storage usage info
   */
  getStorageInfo(): { used: number; total: number; available: number } {
    try {
      let used = 0
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key && key.startsWith(this.prefix)) {
          const value = this.storage.getItem(key)
          if (value) {
            used += key.length + value.length
          }
        }
      }

      // Approximate storage limits (these are browser-dependent)
      const total = localStorage.length > 0 ? 5 * 1024 * 1024 : 0 // 5MB for localStorage
      const available = total - used

      return { used, total, available }
    } catch (error) {
      console.error('Error getting storage info:', error)
      return { used: 0, total: 0, available: 0 }
    }
  }
}

// Create storage managers
export const localStorageManager = new StorageManager(localStorage, 'pm_')
export const sessionStorageManager = new StorageManager(sessionStorage, 'pm_')

// Utility functions for common operations
export const storageUtils = {
  /**
   * Save user preferences to localStorage
   */
  savePreferences: (preferences: Record<string, unknown>) => {
    try {
      localStorageManager.set('preferences', preferences, {
        serialize: defaultSerialize,
        validate: (value) => value && typeof value === 'object',
      })
    } catch (error) {
      console.error('Error saving preferences:', error)
    }
  },

  /**
   * Load user preferences from localStorage
   */
  loadPreferences: () => {
    return localStorageManager.get('preferences', {
      defaultValue: {
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
      validate: (value) => value && typeof value === 'object',
    })
  },

  /**
   * Save authentication state to sessionStorage
   */
  saveAuthState: (authState: Record<string, unknown>) => {
    try {
      sessionStorageManager.set('auth', authState, {
        serialize: defaultSerialize,
        validate: (value) => value && typeof value === 'object',
      })
    } catch (error) {
      console.error('Error saving auth state:', error)
    }
  },

  /**
   * Load authentication state from sessionStorage
   */
  loadAuthState: (): { user: unknown } | null => {
    return sessionStorageManager.get('auth', {
      defaultValue: null,
      validate: (value) => !value || (value && typeof value === 'object'),
    })
  },

  /**
   * Clear all user data
   */
  clearUserData: () => {
    try {
      // Clear localStorage (user preferences, etc.)
      localStorageManager.clear()
      
      // Clear sessionStorage (auth state, etc.)
      sessionStorageManager.clear()
    } catch (error) {
      console.error('Error clearing user data:', error)
    }
  },

  /**
   * Export all storage data
   */
  exportData: () => {
    try {
      const data: Record<string, unknown> = {}
      
      // Export localStorage data
      const localStorageKeys = localStorageManager.keys()
      localStorageKeys.forEach(key => {
        data[key] = localStorageManager.get(key)
      })

      // Export sessionStorage data
      const sessionStorageKeys = sessionStorageManager.keys()
      sessionStorageKeys.forEach(key => {
        data[`session_${key}`] = sessionStorageManager.get(key)
      })

      return data
    } catch (error) {
      console.error('Error exporting data:', error)
      return {}
    }
  },

  /**
   * Import storage data
   */
  importData: (data: Record<string, unknown>) => {
    try {
      // Import localStorage data
      Object.keys(data).forEach(key => {
        if (!key.startsWith('session_')) {
          localStorageManager.set(key, data[key])
        }
      })

      // Import sessionStorage data
      Object.keys(data).forEach(key => {
        if (key.startsWith('session_')) {
          const sessionKey = key.replace('session_', '')
          sessionStorageManager.set(sessionKey, data[key])
        }
      })
    } catch (error) {
      console.error('Error importing data:', error)
      throw new Error('Failed to import data')
    }
  },
}

// Error handling utilities
export class StorageError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'StorageError'
  }
}

// Storage quota checker
export const checkStorageQuota = async (): Promise<{ hasEnoughSpace: boolean; availableSpace: number }> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate()
      const availableSpace = estimate.quota ? estimate.quota - (estimate.usage || 0) : 0
      const hasEnoughSpace = availableSpace > 1024 * 1024 // Require at least 1MB
      
      return { hasEnoughSpace, availableSpace }
    } catch (error) {
      console.error('Error checking storage quota:', error)
      return { hasEnoughSpace: true, availableSpace: 0 }
    }
  }
  
  return { hasEnoughSpace: true, availableSpace: 0 }
}