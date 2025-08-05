"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Property, Tenant, MaintenanceRequest } from "@/lib/api"

interface PropertyFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: Omit<Property, 'id'>) => void
    initialData?: Partial<Property>
}

export function PropertyForm({ open, onOpenChange, onSubmit, initialData }: PropertyFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        zipCode: initialData?.zipCode || "",
        units: initialData?.units || 0,
        occupied: initialData?.occupied || 0,
        monthlyRevenue: initialData?.monthlyRevenue || 0,
        type: initialData?.type || "apartment" as const,
        yearBuilt: initialData?.yearBuilt || new Date().getFullYear(),
        avgRent: initialData?.avgRent || 0,
        description: initialData?.description || "",
        amenities: initialData?.amenities || [],
        ...initialData
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            ...formData,
            occupancyRate: formData.units > 0 ? Math.round((formData.occupied / formData.units) * 100) : 0
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Property" : "Add New Property"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Update property information" : "Enter the details for the new property"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="name">Property Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter property name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Enter street address"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="City"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                placeholder="State"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                placeholder="ZIP"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="units">Total Units</Label>
                            <Input
                                id="units"
                                type="number"
                                value={formData.units}
                                onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="occupied">Occupied Units</Label>
                            <Input
                                id="occupied"
                                type="number"
                                value={formData.occupied}
                                onChange={(e) => setFormData({ ...formData, occupied: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                max={formData.units}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Property Type</Label>
                            <Select value={formData.type} onValueChange={(value: 'apartment' | 'house' | 'condo' | 'commercial') => setFormData({ ...formData, type: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="house">House</SelectItem>
                                    <SelectItem value="condo">Condo</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="yearBuilt">Year Built</Label>
                            <Input
                                id="yearBuilt"
                                type="number"
                                value={formData.yearBuilt}
                                onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) || new Date().getFullYear() })}
                                placeholder="2024"
                                min="1800"
                                max={new Date().getFullYear() + 5}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
                            <Input
                                id="monthlyRevenue"
                                type="number"
                                value={formData.monthlyRevenue}
                                onChange={(e) => setFormData({ ...formData, monthlyRevenue: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avgRent">Average Rent</Label>
                            <Input
                                id="avgRent"
                                type="number"
                                value={formData.avgRent}
                                onChange={(e) => setFormData({ ...formData, avgRent: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter property description"
                            rows={3}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? "Update Property" : "Add Property"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

interface MultipleChoiceQuestion {
    id: string
    question: string
    type: 'single' | 'multiple' | 'text'
    options: string[]
    required: boolean
}

interface SimplifiedTenantFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: Omit<Tenant, 'id'>) => void
    initialData?: Partial<Tenant>
}

const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
    {
        id: 'name',
        question: 'What is the tenant\'s full name?',
        type: 'text',
        options: [],
        required: true
    },
    {
        id: 'email',
        question: 'What is the tenant\'s email address?',
        type: 'text',
        options: [],
        required: true
    },
    {
        id: 'phone',
        question: 'What is the tenant\'s phone number?',
        type: 'text',
        options: [],
        required: true
    },
    {
        id: 'unit',
        question: 'Which unit will the tenant occupy?',
        type: 'single',
        options: ['A-101', 'A-102', 'A-103', 'B-201', 'B-202', 'B-203', 'C-301', 'C-302', 'C-303', 'Other'],
        required: true
    },
    {
        id: 'rentRange',
        question: 'What is the monthly rent range?',
        type: 'single',
        options: ['$1000 - $1500', '$1500 - $2000', '$2000 - $2500', '$2500 - $3000', '$3000+'],
        required: true
    },
    {
        id: 'leaseDuration',
        question: 'What lease duration do you prefer?',
        type: 'single',
        options: ['6 months', '12 months', '18 months', '24 months'],
        required: true
    },
    {
        id: 'moveInDate',
        question: 'When would the tenant like to move in?',
        type: 'single',
        options: ['Immediately', 'Next week', 'Next month', 'Custom date'],
        required: true
    },
    {
        id: 'hasPets',
        question: 'Does the tenant have pets?',
        type: 'single',
        options: ['No pets', 'Small pets (cats, small dogs)', 'Large pets (large dogs)', 'All pets'],
        required: true
    },
    {
        id: 'employmentStatus',
        question: 'What is the tenant\'s employment status?',
        type: 'single',
        options: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Student', 'Retired', 'Other'],
        required: true
    },
    {
        id: 'incomeRange',
        question: 'What is the tenant\'s monthly income range?',
        type: 'single',
        options: ['$2000 - $3000', '$3000 - $5000', '$5000 - $7000', '$7000 - $10000', '$10000+'],
        required: true
    },
    {
        id: 'hasEmergencyContact',
        question: 'Does the tenant have an emergency contact?',
        type: 'single',
        options: ['Yes', 'No'],
        required: true
    }
]

export function SimplifiedTenantForm({ open, onOpenChange, onSubmit, initialData }: SimplifiedTenantFormProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        unit: initialData?.unit || "",
        rent: initialData?.rent || 0,
        status: initialData?.status || "pending" as const,
        dueDate: initialData?.dueDate || "",
        leaseStart: initialData?.leaseStart || "",
        leaseEnd: initialData?.leaseEnd || "",
        hasEmergencyContact: "",
        ...initialData
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [customUnit, setCustomUnit] = useState("")
    const [customRent, setCustomRent] = useState("")
    const [customMoveInDate, setCustomMoveInDate] = useState("")
    const [customEmergencyContact, setCustomEmergencyContact] = useState({
        name: "",
        phone: "",
        relationship: ""
    })

    const questionsPerStep = 3
    const totalSteps = Math.ceil(MULTIPLE_CHOICE_QUESTIONS.length / questionsPerStep)

    const getCurrentQuestions = () => {
        const startIndex = (currentStep - 1) * questionsPerStep
        const endIndex = startIndex + questionsPerStep
        return MULTIPLE_CHOICE_QUESTIONS.slice(startIndex, endIndex)
    }

    const validateStep = (questions: MultipleChoiceQuestion[]) => {
        const newErrors: Record<string, string> = {}
        
        questions.forEach(question => {
            if (question.required) {
                const value = formData[question.id as keyof typeof formData]
                
                if (question.type === 'text' && (!value || value.toString().trim() === '')) {
                    newErrors[question.id] = `${question.question.replace('What is the tenant\'s', '').replace('Which unit will the tenant occupy?', 'Unit').replace('What is the monthly rent range?', 'Rent range').replace('What lease duration do you prefer?', 'Lease duration').replace('When would the tenant like to move in?', 'Move-in date').replace('Does the tenant have pets?', 'Pet information').replace('What is the tenant\'s employment status?', 'Employment status').replace('What is the tenant\'s monthly income range?', 'Income range').replace('Does the tenant have an emergency contact?', 'Emergency contact')} is required`
                } else if (question.type === 'single' && !value) {
                    newErrors[question.id] = `Please select an option for ${question.question.toLowerCase()}`
                }
            }
        })

        // Additional validation for custom fields
        if (formData.unit === 'Other' && !customUnit.trim()) {
            newErrors.customUnit = 'Please specify the unit number'
        }
        
        if (formData.rent === 0 && !customRent) {
            newErrors.customRent = 'Please specify the monthly rent'
        }

        // Validate emergency contact if selected
        const hasEmergencyContact = formData.hasEmergencyContact || 'No'
        if (hasEmergencyContact === 'Yes' && (!customEmergencyContact.name.trim() || !customEmergencyContact.phone.trim())) {
            newErrors.emergencyContact = 'Emergency contact name and phone are required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAnswer = (questionId: string, answer: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: answer
        }))
        
        // Clear error for this question
        if (errors[questionId]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[questionId]
                return newErrors
            })
        }
    }

    const handleCustomAnswer = (questionId: string, value: string) => {
        if (questionId === 'unit') {
            setCustomUnit(value)
        } else if (questionId === 'rentRange') {
            // Extract rent value from range
            const rentMatch = value.match(/\$(\d+)-\$(\d+)/)
            if (rentMatch) {
                const avgRent = Math.round((parseInt(rentMatch[1]) + parseInt(rentMatch[2])) / 2)
                setFormData(prev => ({ ...prev, rent: avgRent }))
            } else if (value.includes('$3000+')) {
                setFormData(prev => ({ ...prev, rent: 3000 }))
            }
        } else if (questionId === 'moveInDate') {
            if (value === 'Immediately') {
                const today = new Date().toISOString().split('T')[0]
                setFormData(prev => ({ ...prev, leaseStart: today }))
            } else if (value === 'Next week') {
                const nextWeek = new Date()
                nextWeek.setDate(nextWeek.getDate() + 7)
                setFormData(prev => ({ ...prev, leaseStart: nextWeek.toISOString().split('T')[0] }))
            } else if (value === 'Next month') {
                const nextMonth = new Date()
                nextMonth.setMonth(nextMonth.getMonth() + 1)
                setFormData(prev => ({ ...prev, leaseStart: nextMonth.toISOString().split('T')[0] }))
            } else if (value === 'Custom date') {
                setCustomMoveInDate('')
            }
        } else if (questionId === 'hasEmergencyContact') {
            if (value === 'Yes') {
                // Set default emergency contact
                setCustomEmergencyContact({
                    name: 'Emergency Contact',
                    phone: '',
                    relationship: 'Friend'
                })
            } else {
                setCustomEmergencyContact({ name: '', phone: '', relationship: '' })
            }
        }
    }

    const nextStep = () => {
        const currentQuestions = getCurrentQuestions()
        if (validateStep(currentQuestions)) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1)
                // Clear errors when moving to next step
                setErrors({})
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Final validation
        const finalQuestions = MULTIPLE_CHOICE_QUESTIONS
        if (validateStep(finalQuestions)) {
            // Set final values
            const finalData = {
                ...formData,
                unit: formData.unit === 'Other' ? customUnit : formData.unit,
                rent: customRent ? parseInt(customRent) : formData.rent,
                leaseStart: customMoveInDate || formData.leaseStart,
                dueDate: formData.leaseStart, // Set due date same as lease start
                emergencyContact: customEmergencyContact.name ? customEmergencyContact : undefined
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(finalData.email)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
                return
            }
            
            // Validate phone format (basic validation)
            const phoneRegex = /^[\d\s\-\(\)]+$/
            if (!phoneRegex.test(finalData.phone.replace(/\s/g, ''))) {
                setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }))
                return
            }
            
            onSubmit(finalData)
            onOpenChange(false)
        }
    }

    const renderQuestion = (question: MultipleChoiceQuestion) => {
        const value = formData[question.id as keyof typeof formData]
        const error = errors[question.id]

        if (question.type === 'text') {
            return (
                <div className="space-y-2">
                    <Label htmlFor={question.id}>{question.question}</Label>
                    <Input
                        id={question.id}
                        value={value as string}
                        onChange={(e) => {
                            handleAnswer(question.id, e.target.value)
                            // Clear error when user starts typing
                            if (error) {
                                setErrors(prev => {
                                    const newErrors = { ...prev }
                                    delete newErrors[question.id]
                                    return newErrors
                                })
                            }
                        }}
                        placeholder={question.id === 'name' ? 'John Doe' : question.id === 'email' ? 'tenant@email.com' : '(555) 123-4567'}
                        className={error ? 'border-red-500' : ''}
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            )
        }

        return (
            <div className="space-y-2">
                <Label>{question.question}</Label>
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                handleAnswer(question.id, option)
                                handleCustomAnswer(question.id, option)
                            }}
                            className={`w-full text-left p-3 border rounded-lg transition-colors ${
                                value === option
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            } ${error ? 'border-red-500' : ''}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                
                {/* Custom fields for specific questions */}
                {question.id === 'unit' && value === 'Other' && (
                    <div className="space-y-2 mt-2">
                        <Label htmlFor="customUnit">Specify Unit</Label>
                        <Input
                            id="customUnit"
                            value={customUnit}
                            onChange={(e) => {
                                setCustomUnit(e.target.value)
                                // Clear error when user starts typing
                                if (errors.customUnit) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev }
                                        delete newErrors.customUnit
                                        return newErrors
                                    })
                                }
                            }}
                            placeholder="Enter unit number"
                            className={errors.customUnit ? 'border-red-500' : ''}
                        />
                        {errors.customUnit && <p className="text-sm text-red-500">{errors.customUnit}</p>}
                    </div>
                )}
                
                {question.id === 'rentRange' && formData.rent === 0 && (
                    <div className="space-y-2 mt-2">
                        <Label htmlFor="customRent">Specify Monthly Rent</Label>
                        <Input
                            id="customRent"
                            type="number"
                            value={customRent}
                            onChange={(e) => {
                                setCustomRent(e.target.value)
                                // Clear error when user starts typing
                                if (errors.customRent) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev }
                                        delete newErrors.customRent
                                        return newErrors
                                    })
                                }
                            }}
                            placeholder="Enter rent amount"
                            className={errors.customRent ? 'border-red-500' : ''}
                        />
                        {errors.customRent && <p className="text-sm text-red-500">{errors.customRent}</p>}
                    </div>
                )}
                
                {question.id === 'moveInDate' && value === 'Custom date' && (
                    <div className="space-y-2 mt-2">
                        <Label htmlFor="customMoveInDate">Move-in Date</Label>
                        <Input
                            id="customMoveInDate"
                            type="date"
                            value={customMoveInDate}
                            onChange={(e) => setCustomMoveInDate(e.target.value)}
                        />
                    </div>
                )}
                
                {question.id === 'hasEmergencyContact' && value === 'Yes' && (
                    <div className="space-y-2 mt-2">
                        <Label>Emergency Contact Details</Label>
                        <Input
                            placeholder="Emergency Contact Name"
                            value={customEmergencyContact.name}
                            onChange={(e) => {
                                setCustomEmergencyContact(prev => ({ ...prev, name: e.target.value }))
                                // Clear error when user starts typing
                                if (errors.emergencyContact) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev }
                                        delete newErrors.emergencyContact
                                        return newErrors
                                    })
                                }
                            }}
                            className={errors.emergencyContact ? 'border-red-500' : ''}
                        />
                        {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
                        <Input
                            placeholder="Emergency Contact Phone"
                            value={customEmergencyContact.phone}
                            onChange={(e) => {
                                setCustomEmergencyContact(prev => ({ ...prev, phone: e.target.value }))
                                // Clear error when user starts typing
                                if (errors.emergencyContact) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev }
                                        delete newErrors.emergencyContact
                                        return newErrors
                                    })
                                }
                            }}
                            className={errors.emergencyContact ? 'border-red-500' : ''}
                        />
                        <Input
                            placeholder="Relationship"
                            value={customEmergencyContact.relationship}
                            onChange={(e) => setCustomEmergencyContact(prev => ({ ...prev, relationship: e.target.value }))}
                        />
                    </div>
                )}
            </div>
        )
    }

    const currentQuestions = getCurrentQuestions()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Tenant" : "Add New Tenant"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Update tenant information" : "Answer a few simple questions to add a new tenant"}
                    </DialogDescription>
                </DialogHeader>
                
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Step {currentStep} of {totalSteps}</span>
                        <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        {currentQuestions.map((question) => (
                            <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                                {renderQuestion(question)}
                            </div>
                        ))}
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (currentStep === 1) {
                                    onOpenChange(false)
                                } else {
                                    prevStep()
                                }
                            }}
                        >
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </Button>
                        <div className="flex space-x-2">
                            {currentStep < totalSteps ? (
                                <Button type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit">
                                    {initialData ? "Update Tenant" : "Add Tenant"}
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

interface TenantFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: Omit<Tenant, 'id'>) => void
    initialData?: Partial<Tenant>
}

export function TenantForm({ open, onOpenChange, onSubmit, initialData }: TenantFormProps) {
    return (
        <SimplifiedTenantForm
            open={open}
            onOpenChange={onOpenChange}
            onSubmit={onSubmit}
            initialData={initialData}
        />
    )
}

interface MaintenanceFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: Omit<MaintenanceRequest, 'id'>) => void
    initialData?: Partial<MaintenanceRequest>
}

export function MaintenanceForm({ open, onOpenChange, onSubmit, initialData }: MaintenanceFormProps) {
    const [formData, setFormData] = useState({
        tenant: initialData?.tenant || "",
        tenantId: initialData?.tenantId || "",
        title: initialData?.title || "",
        description: initialData?.description || "",
        unit: initialData?.unit || "",
        priority: initialData?.priority || "medium" as const,
        status: initialData?.status || "pending" as const,
        category: initialData?.category || "other" as const,
        createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
        ...initialData
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Maintenance Request" : "New Maintenance Request"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Update maintenance request details" : "Create a new maintenance request"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-2">
                        <Label htmlFor="title">Issue Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Brief description of the issue"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed description of the maintenance issue"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Input
                                id="unit"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                placeholder="A-101"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setFormData({ ...formData, priority: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other') => setFormData({ ...formData, category: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="hvac">HVAC</SelectItem>
                                <SelectItem value="appliance">Appliance</SelectItem>
                                <SelectItem value="structural">Structural</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? "Update Request" : "Create Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}