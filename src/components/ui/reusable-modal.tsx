import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { ValidationError } from "@/hooks/useFormValidation"

interface ReusableModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  onSubmit: () => void
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  errors?: ValidationError[]
  isLoading?: boolean
}

export function ReusableModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  variant = 'default',
  size = 'md',
  className = "",
  errors = [],
  isLoading = false
}: ReusableModalProps) {
  const { close } = useModal({ isOpen })

  const handleSubmit = () => {
    onSubmit()
    close()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    close()
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'sm:max-w-[425px]'
      case 'md': return 'sm:max-w-[500px]'
      case 'lg': return 'sm:max-w-[600px]'
      case 'xl': return 'sm:max-w-[800px]'
      default: return 'sm:max-w-[500px]'
    }
  }

  const getVariantClass = () => {
    switch (variant) {
      case 'destructive': return 'bg-red-600 hover:bg-red-700'
      case 'outline': return 'border border-gray-300 bg-white hover:bg-gray-50'
      default: return 'bg-blue-600 hover:bg-blue-700'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${getSizeClass()} max-h-[90vh] overflow-y-auto ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          {/* Global error display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Form contains errors</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {children}
          
          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              type="submit"
              className={getVariantClass()}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}