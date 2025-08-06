import { useState, useEffect, useCallback } from 'react'
import { localStorageManager, defaultSerialize, defaultDeserialize } from '@/lib/storage'

export interface UseLocalStorageOptions<T = unknown> {
  defaultValue?: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  validate?: (value: T) => boolean
  version?: number
  migrate?: (value: unknown, version: number) => T
}

export function useLocalStorage<T = unknown>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): [T | null, (value: T | null) => void, boolean] {
  const [value, setValue] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load value from localStorage on mount
  useEffect(() => {
    const loadValue = () => {
      try {
        const storedValue = localStorageManager.get(key, {
          defaultValue: options.defaultValue,
          serialize: options.serialize,
          deserialize: options.deserialize,
          validate: options.validate,
          version: options.version,
          migrate: options.migrate,
        })

        setValue(storedValue)
      } catch (error) {
        console.error(`Error loading value from localStorage for key "${key}":`, error)
        setValue(options.defaultValue ?? null)
      } finally {
        setIsLoading(false)
      }
    }

    loadValue()
  }, [key, options])

  // Set value in localStorage
  const setStoredValue = useCallback((newValue: T | null) => {
    try {
      if (newValue === null) {
        localStorageManager.remove(key)
      } else {
        localStorageManager.set(key, newValue, {
          serialize: options.serialize,
          deserialize: options.deserialize,
          validate: options.validate,
          version: options.version,
          migrate: options.migrate,
        })
      }
      setValue(newValue)
    } catch (error) {
      console.error(`Error setting value in localStorage for key "${key}":`, error)
      throw new Error(`Failed to set value in localStorage for key "${key}"`)
    }
  }, [key, options])

  return [value, setStoredValue, isLoading]
}

// Hook for boolean values
export function useLocalStorageBoolean(
  key: string,
  defaultValue: boolean = false
): [boolean, (value: boolean) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'boolean',
  })

  const setBooleanValue = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setBooleanValue, value === null]
}

// Hook for string values
export function useLocalStorageString(
  key: string,
  defaultValue: string = ''
): [string, (value: string) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'string',
  })

  const setStringValue = useCallback((newValue: string) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setStringValue, value === null]
}

// Hook for number values
export function useLocalStorageNumber(
  key: string,
  defaultValue: number = 0
): [number, (value: number) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'number',
  })

  const setNumberValue = useCallback((newValue: number) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setNumberValue, value === null]
}

// Hook for array values
export function useLocalStorageArray<T = unknown>(
  key: string,
  defaultValue: T[] = []
): [T[], (value: T[]) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    defaultValue,
    validate: (value) => Array.isArray(value),
  })

  const setArrayValue = useCallback((newValue: T[]) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setArrayValue, value === null]
}

// Hook for object values
export function useLocalStorageObject<T = Record<string, unknown>>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    defaultValue,
    validate: (value) => value && typeof value === 'object',
  })

  const setObjectValue = useCallback((newValue: T) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setObjectValue, value === null]
}

// Hook for complex objects with versioning
export function useLocalStorageWithVersion<T = unknown>(
  key: string,
  options: UseLocalStorageOptions<T> & { version: number }
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useLocalStorage(key, {
    ...options,
    version: options.version,
    migrate: options.migrate,
  })

  const setVersionedValue = useCallback((newValue: T) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? options.defaultValue!, setVersionedValue, value === null]
}

// Hook for watching localStorage changes across tabs
export function useLocalStorageWatch(key: string, callback: (value: unknown) => void): void {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? defaultDeserialize(event.newValue) : null
          callback(newValue)
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, callback])
}

// Hook for localStorage quota management
export function useLocalStorageQuota() {
  const [quotaInfo, setQuotaInfo] = useState<{ used: number; total: number; available: number } | null>(null)

  const checkQuota = useCallback(async () => {
    try {
      const info = localStorageManager.getStorageInfo()
      setQuotaInfo(info)
    } catch (error) {
      console.error('Error checking localStorage quota:', error)
    }
  }, [])

  useEffect(() => {
    checkQuota()
  }, [checkQuota])

  return { quotaInfo, checkQuota }
}

// Hook for localStorage debugging
export function useLocalStorageDebug(key: string) {
  const [info, setInfo] = useState<{ exists: boolean; size: number; value: unknown } | null>(null)

  const debug = useCallback(() => {
    try {
      const exists = localStorageManager.has(key)
      const value = localStorageManager.get(key)
      const size = JSON.stringify(value).length

      setInfo({
        exists,
        size,
        value,
      })
    } catch (error) {
      console.error(`Error debugging localStorage key "${key}":`, error)
    }
  }, [key])

  useEffect(() => {
    debug()
  }, [debug])

  return { info, debug }
}