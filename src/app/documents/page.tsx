"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Upload,
  Filter,
  Folder,
  File,
  X
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: 'lease' | 'contract' | 'inspection' | 'financial' | 'legal' | 'other'
  size: string
  uploadDate: string
  property?: string
  tenant?: string
  description?: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Lease Agreement - John Smith.pdf',
    type: 'lease',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    property: 'Sunset Apartments',
    tenant: 'John Smith'
  },
  {
    id: '2',
    name: 'Property Inspection Report - A101.pdf',
    type: 'inspection',
    size: '1.8 MB',
    uploadDate: '2024-01-20',
    property: 'Sunset Apartments'
  },
  {
    id: '3',
    name: 'Maintenance Contract - HVAC.pdf',
    type: 'contract',
    size: '856 KB',
    uploadDate: '2024-01-10',
    property: 'Oak Grove Complex'
  },
  {
    id: '4',
    name: 'Monthly Financial Report - January.xlsx',
    type: 'financial',
    size: '3.2 MB',
    uploadDate: '2024-02-01'
  }
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  
  // Modal states
  const [addDocumentOpen, setAddDocumentOpen] = useState(false)
  const [addFolderOpen, setAddFolderOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  
  // Form states
  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: 'other' as 'lease' | 'contract' | 'inspection' | 'financial' | 'legal' | 'other',
    description: '',
    file: null as File | null
  })
  
  const [folderForm, setFolderForm] = useState({
    name: '',
    description: ''
  })

  // Error states
  const [documentErrors, setDocumentErrors] = useState<Record<string, string>>({})
  const [folderErrors, setFolderErrors] = useState<Record<string, string>>({})

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tenant?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || doc.type === filterType
    return matchesSearch && matchesFilter
  })

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'lease': return 'bg-green-100 text-green-800'
      case 'contract': return 'bg-blue-100 text-blue-800'
      case 'inspection': return 'bg-orange-100 text-orange-800'
      case 'financial': return 'bg-purple-100 text-purple-800'
      case 'legal': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const documentStats = {
    total: documents.length,
    leases: documents.filter(d => d.type === 'lease').length,
    contracts: documents.filter(d => d.type === 'contract').length,
    inspections: documents.filter(d => d.type === 'inspection').length,
    financial: documents.filter(d => d.type === 'financial').length
  }

  // Document form handlers
  const handleAddDocument = () => {
    setDocumentForm({
      name: '',
      type: 'other',
      description: '',
      file: null
    })
    setAddDocumentOpen(true)
  }

  const handleEditDocument = (document: Document) => {
    setDocumentForm({
      name: document.name,
      type: document.type,
      description: document.description || '',
      file: null
    })
    setSelectedDocument(document)
    setAddDocumentOpen(true)
  }

  const validateDocumentForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!documentForm.name.trim()) {
      newErrors.name = 'Document name is required'
    }
    
    setDocumentErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateDocumentForm()) {
      const newDocument: Document = {
        id: selectedDocument?.id || Date.now().toString(),
        name: documentForm.name,
        type: documentForm.type,
        size: documentForm.file ? `${(documentForm.file.size / 1024 / 1024).toFixed(2)} MB` : '0 KB',
        uploadDate: new Date().toISOString().split('T')[0],
        description: documentForm.description
      }

      if (selectedDocument) {
        setDocuments(documents.map(doc => doc.id === selectedDocument.id ? newDocument : doc))
      } else {
        setDocuments([...documents, newDocument])
      }

      setAddDocumentOpen(false)
      setSelectedDocument(null)
      setDocumentForm({
        name: '',
        type: 'other',
        description: '',
        file: null
      })
      setDocumentErrors({})
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDocumentForm({ ...documentForm, file })
    }
  }

  // Folder form handlers
  const handleAddFolder = () => {
    setFolderForm({
      name: '',
      description: ''
    })
    setAddFolderOpen(true)
  }

  // Delete document handler
  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id))
    }
  }

  const validateFolderForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!folderForm.name.trim()) {
      newErrors.name = 'Folder name is required'
    }
    
    setFolderErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateFolderForm()) {
      const newFolder: Document = {
        id: Date.now().toString(),
        name: folderForm.name,
        type: 'other',
        size: '0 KB',
        uploadDate: new Date().toISOString().split('T')[0],
        description: folderForm.description
      }

      setDocuments([...documents, newFolder])

      setAddFolderOpen(false)
      setFolderForm({
        name: '',
        description: ''
      })
      setFolderErrors({})
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
              activeTab="documents"
              onTabChange={() => { } }
              pendingMaintenance={0}
              overdueTenants={0} todayEvents={0}      />

      <div className="flex">
        <div className="hidden md:block w-64"></div>
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-600">Manage property documents and files</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleAddDocument}>
                  <Upload className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
                <Button onClick={handleAddFolder}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              </div>
            </div>

            {/* Document Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="text-2xl font-bold">{documentStats.total}</div>
                    <div className="text-sm text-gray-600">Total Documents</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-green-600">{documentStats.leases}</div>
                <div className="text-sm text-gray-600">Leases</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-blue-600">{documentStats.contracts}</div>
                <div className="text-sm text-gray-600">Contracts</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-orange-600">{documentStats.inspections}</div>
                <div className="text-sm text-gray-600">Inspections</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-purple-600">{documentStats.financial}</div>
                <div className="text-sm text-gray-600">Financial</div>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search documents by name, property, or tenant..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="lease">Leases</option>
                <option value="contract">Contracts</option>
                <option value="inspection">Inspections</option>
                <option value="financial">Financial</option>
                <option value="legal">Legal</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Documents Table */}
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Property/Tenant</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <File className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{document.name}</div>
                            {document.description && (
                              <div className="text-sm text-gray-500">{document.description}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDocumentTypeColor(document.type)}>
                          {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {document.property && <div>{document.property}</div>}
                          {document.tenant && <div className="text-gray-500">{document.tenant}</div>}
                        </div>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleEditDocument(document)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteDocument(document.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search terms or filters.' 
                    : 'Get started by uploading your first document.'}
                </p>
                {!searchTerm && filterType === 'all' && (
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Document Modal */}
      <Dialog open={addDocumentOpen} onOpenChange={setAddDocumentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedDocument ? "Edit Document" : "Add Document"}</DialogTitle>
            <DialogDescription>
              {selectedDocument ? "Update document details" : "Upload a new document to the system"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDocumentSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              id="documentName"
              value={documentForm.name}
              onChange={(e) => {
                setDocumentForm({ ...documentForm, name: e.target.value })
                // Clear error when user starts typing
                if (documentErrors.name) {
                  setDocumentErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.name
                    return newErrors
                  })
                }
              }}
              placeholder="Enter document name"
              className={documentErrors.name ? 'border-red-500' : ''}
              required
            />
            {documentErrors.name && <p className="text-sm text-red-500">{documentErrors.name}</p>}
          </div>
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={documentForm.type} onValueChange={(value: 'lease' | 'contract' | 'inspection' | 'financial' | 'legal' | 'other') => setDocumentForm({ ...documentForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentDescription">Description</Label>
              <Textarea
                id="documentDescription"
                value={documentForm.description}
                onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                placeholder="Enter document description (optional)"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentFile">Upload File</Label>
              <Input
                id="documentFile"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.jpg,.jpeg,.png"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDocumentOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedDocument ? "Update Document" : "Add Document"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Folder Modal */}
      <Dialog open={addFolderOpen} onOpenChange={setAddFolderOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your documents
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFolderSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              value={folderForm.name}
              onChange={(e) => {
                setFolderForm({ ...folderForm, name: e.target.value })
                // Clear error when user starts typing
                if (folderErrors.name) {
                  setFolderErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.name
                    return newErrors
                  })
                }
              }}
              placeholder="Enter folder name"
              className={folderErrors.name ? 'border-red-500' : ''}
              required
            />
            {folderErrors.name && <p className="text-sm text-red-500">{folderErrors.name}</p>}
          </div>
            <div className="space-y-2">
              <Label htmlFor="folderDescription">Description</Label>
              <Textarea
                id="folderDescription"
                value={folderForm.description}
                onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                placeholder="Enter folder description (optional)"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddFolderOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Folder
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}