import { useState, useCallback } from 'react'

export interface ValidationError {
  field: string
  message: string
}

export interface FormValidationConfig {
  [key: string]: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: unknown) => string | null
  }
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationConfig: FormValidationConfig
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validateField = useCallback((fieldName: string, value: unknown): string | null => {
    const rules = validationConfig[fieldName]
    if (!rules) return null

    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${fieldName} is required`
    }

    // Min length validation
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`
    }

    // Max length validation
    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`
    }

    // Pattern validation
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return `${fieldName} format is invalid`
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value)
      if (customError) return customError
    }

    return null
  }, [validationConfig])

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationError[] = []
    const newTouched = new Set(touched)

    Object.keys(validationConfig).forEach(fieldName => {
      const value = values[fieldName]
      const error = validateField(fieldName, value)
      
      if (error) {
        newErrors.push({ field: fieldName, message: error })
      }
      
      newTouched.add(fieldName)
    })

    setErrors(newErrors)
    setTouched(newTouched)
    return newErrors.length === 0
  }, [values, validationConfig, validateField, touched])

  const setValue = useCallback((fieldName: string, value: unknown, shouldValidate = true) => {
    setValues(prev => ({ ...prev, [fieldName]: value }))
    
    if (shouldValidate) {
      const error = validateField(fieldName, value)
      setErrors(prev => {
        const filtered = prev.filter(e => e.field !== fieldName)
        if (error) {
          filtered.push({ field: fieldName, message: error })
        }
        return filtered
      })
    }
  }, [validateField])

  const setValuesBulk = useCallback((newValues: Partial<T>, shouldValidate = true) => {
    setValues(prev => ({ ...prev, ...newValues }))
    
    if (shouldValidate) {
      const newErrors: ValidationError[] = []
      
      Object.keys(newValues).forEach(fieldName => {
        const value = newValues[fieldName]
        const error = validateField(fieldName, value)
        
        if (error) {
          newErrors.push({ field: fieldName, message: error })
        }
      })
      
      setErrors(prev => {
        const existingErrors = prev.filter(e => !Object.keys(newValues).includes(e.field))
        return [...existingErrors, ...newErrors]
      })
    }
  }, [validateField])

  const touchField = useCallback((fieldName: string) => {
    setTouched(prev => new Set(prev).add(fieldName))
    
    const value = values[fieldName]
    const error = validateField(fieldName, value)
    setErrors(prev => {
      const filtered = prev.filter(e => e.field !== fieldName)
      if (error) {
        filtered.push({ field: fieldName, message: error })
      }
      return filtered
    })
  }, [values, validateField])

  const touchAllFields = useCallback(() => {
    const newTouched = new Set(touched)
    const newErrors: ValidationError[] = []

    Object.keys(validationConfig).forEach(fieldName => {
      newTouched.add(fieldName)
      const value = values[fieldName]
      const error = validateField(fieldName, value)
      
      if (error) {
        newErrors.push({ field: fieldName, message: error })
      }
    })

    setTouched(newTouched)
    setErrors(newErrors)
  }, [values, validationConfig, validateField, touched])

  const getFieldError = useCallback((fieldName: string): string | undefined => {
    const error = errors.find(e => e.field === fieldName)
    return error?.message
  }, [errors])

  const getFieldClassName = useCallback((fieldName: string): string => {
    const hasError = errors.some(e => e.field === fieldName)
    const isTouched = touched.has(fieldName)
    return `${isTouched ? 'touched' : ''} ${hasError ? 'error' : ''}`
  }, [errors, touched])

  const isFormValid = useCallback((): boolean => {
    return errors.length === 0 && Object.keys(validationConfig).every(fieldName => {
      const value = values[fieldName]
      return validateField(fieldName, value) === null
    })
  }, [errors, values, validationConfig, validateField])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors([])
    setTouched(new Set())
  }, [initialValues])

  const getFormState = useCallback(() => ({
    values,
    errors,
    touched,
    isValid: isFormValid(),
    isDirty: Object.keys(values).some(key => values[key] !== initialValues[key])
  }), [values, errors, touched, isFormValid, initialValues])

  return {
    values,
    errors,
    touched,
    validateForm,
    setValue,
    setValuesBulk,
    touchField,
    touchAllFields,
    getFieldError,
    getFieldClassName,
    isFormValid,
    resetForm,
    getFormState
  }
}