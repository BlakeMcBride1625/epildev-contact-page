import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Send, User, MessageSquare, FileText, Upload, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createRipple } from '@/lib/utils'
import { ContactFormData, ContactResponse } from '@/types'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters')
})

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit'
  })

  const watchedFields = watch()
  
  // Debug: Log form state
  console.log('Watched fields:', watchedFields)
  console.log('Form errors:', errors)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted with data:', data)
    console.log('Form errors:', errors)
    setIsSubmitting(true)
    
    try {
      // Support both HTTP and HTTPS and domain detection
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const port = window.location.port
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
      
      const backendUrl = import.meta.env.VITE_API_URL || 
        (isLocalhost 
          ? `${protocol}//localhost:200`
          : `${protocol}//${import.meta.env.VITE_API_ENDPOINT || 'api.config-8bp.epildevconnect.uk/point'}`)
      
      let response: Response
      
      if (selectedFile) {
        console.log('Sending FormData with file')
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('subject', data.subject || '')
        formData.append('message', data.message)
        formData.append('file', selectedFile)
        
        response = await fetch(`${backendUrl}/api/contact`, {
          method: 'POST',
          body: formData,
        })
      } else {
        console.log('Sending JSON without file')
        // Send JSON for regular form submission
        response = await fetch(`${backendUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      }

      const result: ContactResponse = await response.json()

      if (result.success) {
        setTicketId(result.ticketId || '')
        setShowSuccess(true)
        setSelectedFile(null)
        reset()
        toast.success('Message sent successfully!')
      } else {
        toast.error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldGlow = (fieldName: keyof ContactFormData) => {
    const value = watchedFields[fieldName]
    const hasError = errors[fieldName]
    
    if (hasError) return 'border-red-500 shadow-red-500/50'
    if (value && value.length > 0) return 'border-quantum-cyan shadow-quantum-cyan/50'
    return 'border-quantum-cyan/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="quantum-card rounded-2xl p-8 hover:shadow-quantum-cyan/20 hover:shadow-3xl transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-quantum-cyan/20 rounded-lg">
          <Send className="w-6 h-6 text-quantum-cyan" />
        </div>
        <h2 className="text-2xl font-bold text-quantum-electric">Send Message</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-quantum-electric font-medium">
              <User className="w-4 h-4" />
              Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-4 py-3 bg-quantum-violet/30 border rounded-lg text-quantum-electric placeholder-quantum-electric/50 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-300 ${getFieldGlow('name')}`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-quantum-electric font-medium">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className={`w-full px-4 py-3 bg-quantum-violet/30 border rounded-lg text-quantum-electric placeholder-quantum-electric/50 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-300 ${getFieldGlow('email')}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-quantum-electric font-medium">
            <FileText className="w-4 h-4" />
            Subject
          </label>
          <input
            {...register('subject')}
            type="text"
            className={`w-full px-4 py-3 bg-quantum-violet/30 border rounded-lg text-quantum-electric placeholder-quantum-electric/50 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-300 ${getFieldGlow('subject')}`}
            placeholder="What's this about?"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-quantum-electric font-medium">
            <MessageSquare className="w-4 h-4" />
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={5}
            className={`w-full px-4 py-3 bg-quantum-violet/30 border rounded-lg text-quantum-electric placeholder-quantum-electric/50 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-300 resize-none ${getFieldGlow('message')}`}
            placeholder="Tell me about your project or question..."
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-quantum-electric font-medium">
            <Upload className="w-4 h-4" />
            Attach File (Optional)
          </label>
          
          {!selectedFile ? (
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-6 bg-quantum-violet/30 border-2 border-dashed border-quantum-cyan/30 rounded-lg text-quantum-electric/70 hover:border-quantum-cyan/50 hover:bg-quantum-violet/40 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-quantum-cyan" />
                  <p className="text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs text-quantum-electric/50 mt-1">
                    PDF, DOC, TXT, Images, Archives (max 10MB)
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-quantum-violet/30 border border-quantum-cyan/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-quantum-cyan" />
                <div>
                  <p className="text-quantum-electric font-medium">{selectedFile.name}</p>
                  <p className="text-quantum-electric/50 text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-red-500/20 rounded transition-colors duration-200"
                title="Remove file"
                aria-label="Remove file"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => createRipple(e)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-auto max-w-xs mx-auto py-3 px-8 bg-gradient-to-r from-quantum-cyan via-quantum-purple to-quantum-orange text-quantum-black font-bold rounded-lg shadow-lg hover:shadow-quantum-cyan/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-quantum-black border-t-transparent rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </div>
          )}
        </motion.button>
      </form>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
        >
          <p className="text-green-400 text-center">
            Message sent successfully! Ticket ID: {ticketId}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ContactForm
