import { useState, useEffect, useCallback } from 'react'
import { sessionStorageManager, defaultSerialize, defaultDeserialize } from '@/lib/storage'

export interface UseSessionStorageOptions<T = unknown> {
  defaultValue?: T
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  validate?: (value: T) => boolean
  version?: number
  migrate?: (value: unknown, version: number) => T
}

export function useSessionStorage<T = unknown>(
  key: string,
  options: UseSessionStorageOptions<T> = {}
): [T | null, (value: T | null) => void, boolean] {
  const [value, setValue] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load value from sessionStorage on mount
  useEffect(() => {
    const loadValue = () => {
      try {
        const storedValue = sessionStorageManager.get(key, {
          defaultValue: options.defaultValue,
          serialize: options.serialize,
          deserialize: options.deserialize,
          validate: options.validate,
          version: options.version,
          migrate: options.migrate,
        })

        setValue(storedValue)
      } catch (error) {
        console.error(`Error loading value from sessionStorage for key "${key}":`, error)
        setValue(options.defaultValue ?? null)
      } finally {
        setIsLoading(false)
      }
    }

    loadValue()
  }, [key, options])

  // Set value in sessionStorage
  const setStoredValue = useCallback((newValue: T | null) => {
    try {
      if (newValue === null) {
        sessionStorageManager.remove(key)
      } else {
        sessionStorageManager.set(key, newValue, {
          serialize: options.serialize,
          deserialize: options.deserialize,
          validate: options.validate,
          version: options.version,
          migrate: options.migrate,
        })
      }
      setValue(newValue)
    } catch (error) {
      console.error(`Error setting value in sessionStorage for key "${key}":`, error)
      throw new Error(`Failed to set value in sessionStorage for key "${key}"`)
    }
  }, [key, options])

  return [value, setStoredValue, isLoading]
}

// Hook for boolean values
export function useSessionStorageBoolean(
  key: string,
  defaultValue: boolean = false
): [boolean, (value: boolean) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'boolean',
  })

  const setBooleanValue = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setBooleanValue, value === null]
}

// Hook for string values
export function useSessionStorageString(
  key: string,
  defaultValue: string = ''
): [string, (value: string) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'string',
  })

  const setStringValue = useCallback((newValue: string) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setStringValue, value === null]
}

// Hook for number values
export function useSessionStorageNumber(
  key: string,
  defaultValue: number = 0
): [number, (value: number) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    defaultValue,
    validate: (value) => typeof value === 'number',
  })

  const setNumberValue = useCallback((newValue: number) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setNumberValue, value === null]
}

// Hook for array values
export function useSessionStorageArray<T = unknown>(
  key: string,
  defaultValue: T[] = []
): [T[], (value: T[]) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    defaultValue,
    validate: (value) => Array.isArray(value),
  })

  const setArrayValue = useCallback((newValue: T[]) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setArrayValue, value === null]
}

// Hook for object values
export function useSessionStorageObject<T = Record<string, unknown>>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    defaultValue,
    validate: (value) => value && typeof value === 'object',
  })

  const setObjectValue = useCallback((newValue: T) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? defaultValue, setObjectValue, value === null]
}

// Hook for complex objects with versioning
export function useSessionStorageWithVersion<T = unknown>(
  key: string,
  options: UseSessionStorageOptions<T> & { version: number }
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useSessionStorage(key, {
    ...options,
    version: options.version,
    migrate: options.migrate,
  })

  const setVersionedValue = useCallback((newValue: T) => {
    setValue(newValue)
  }, [setValue])

  return [value ?? options.defaultValue!, setVersionedValue, value === null]
}

// Hook for watching sessionStorage changes across tabs
export function useSessionStorageWatch(key: string, callback: (value: unknown) => void): void {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? defaultDeserialize(event.newValue) : null
          callback(newValue)
        } catch (error) {
          console.error(`Error parsing sessionStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, callback])
}

// Hook for sessionStorage quota management
export function useSessionStorageQuota() {
  const [quotaInfo, setQuotaInfo] = useState<{ used: number; total: number; available: number } | null>(null)

  const checkQuota = useCallback(() => {
    try {
      const info = sessionStorageManager.getStorageInfo()
      setQuotaInfo(info)
    } catch (error) {
      console.error('Error checking sessionStorage quota:', error)
    }
  }, [])

  useEffect(() => {
    checkQuota()
  }, [checkQuota])

  return { quotaInfo, checkQuota }
}

// Hook for sessionStorage debugging
export function useSessionStorageDebug(key: string) {
  const [info, setInfo] = useState<{ exists: boolean; size: number; value: unknown } | null>(null)

  const debug = useCallback(() => {
    try {
      const exists = sessionStorageManager.has(key)
      const value = sessionStorageManager.get(key)
      const size = JSON.stringify(value).length

      setInfo({
        exists,
        size,
        value,
      })
    } catch (error) {
      console.error(`Error debugging sessionStorage key "${key}":`, error)
    }
  }, [key])

  useEffect(() => {
    debug()
  }, [debug])

  return { info, debug }
}

// Hook for temporary data that expires
export function useExpiringSessionStorage<T = unknown>(
  key: string,
  ttl: number, // Time to live in milliseconds
  options: UseSessionStorageOptions<T> = {}
): [T | null, (value: T) => void, boolean] {
  const [value, setValue] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load value from sessionStorage on mount
  useEffect(() => {
    const loadValue = () => {
      try {
        const storedValue = sessionStorageManager.get(key, {
          defaultValue: options.defaultValue,
          serialize: options.serialize,
          deserialize: options.deserialize,
          validate: options.validate,
          version: options.version,
          migrate: options.migrate,
        })

        // Check if value has expired
        if (storedValue && typeof storedValue === 'object' && 'expires' in storedValue) {
          const now = Date.now()
          if (now > (storedValue as { expires: number }).expires) {
            sessionStorageManager.remove(key)
            setValue(options.defaultValue ?? null)
            setIsLoading(false)
            return
          }
        }

        setValue(storedValue)
      } catch (error) {
        console.error(`Error loading value from sessionStorage for key "${key}":`, error)
        setValue(options.defaultValue ?? null)
      } finally {
        setIsLoading(false)
      }
    }

    loadValue()
  }, [key, options, ttl])

  // Set value in sessionStorage with expiration
  const setStoredValue = useCallback((newValue: T) => {
    try {
      const valueWithExpiry = {
        data: newValue,
        expires: Date.now() + ttl,
      }

      // Create a custom serializer for expiring data
      const customSerializer = options.serialize || ((value: { data: T; expires: number }) => defaultSerialize(value))
      sessionStorageManager.set(key, valueWithExpiry as T, {
        serialize: customSerializer as (value: T) => string,
        deserialize: options.deserialize,
        validate: options.validate,
        version: options.version,
        migrate: options.migrate,
      })
      setValue(newValue)
    } catch (error) {
      console.error(`Error setting value in sessionStorage for key "${key}":`, error)
      throw new Error(`Failed to set value in sessionStorage for key "${key}"`)
    }
  }, [key, options, ttl])

  return [value, setStoredValue, isLoading]
}

// Hook for form state in sessionStorage
export function useSessionStorageForm<T extends Record<string, unknown>>(
  key: string,
  initialValues: T,
  options: UseSessionStorageOptions<T> = {}
): [T, (field: keyof T, value: T[keyof T]) => void, () => void, boolean] {
  const [formState, setFormState] = useSessionStorageObject(key, initialValues)

  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormState((prev: T) => {
      const updatedState = { ...prev, [field]: value }
      return updatedState as T
    })
  }, [setFormState])

  const resetForm = useCallback(() => {
    setFormState(initialValues)
  }, [setFormState, initialValues])

  return [formState, setFieldValue, resetForm, formState === null]
}