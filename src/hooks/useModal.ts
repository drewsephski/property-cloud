import { useState, useCallback } from 'react'

export interface ModalState<T = unknown> {
  isOpen: boolean
  data?: T
}

export interface ModalActions<T = unknown> {
  open: (data?: T) => void
  close: () => void
  toggle: () => void
}

export function useModal<T = unknown>(initialState: ModalState<T> = { isOpen: false }): ModalState<T> & ModalActions<T> {
  const [state, setState] = useState<ModalState<T>>(initialState)

  const open = useCallback((data?: T) => {
    setState({ isOpen: true, data })
  }, [])

  const close = useCallback(() => {
    setState({ isOpen: false, data: undefined })
  }, [])

  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }, [])

  return {
    ...state,
    open,
    close,
    toggle
  }
}