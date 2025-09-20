import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Send, User, MessageSquare, FileText } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createRipple } from '@/lib/utils'
import { ContactFormData, ContactResponse } from '@/types'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const watchedFields = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Support both HTTP and HTTPS
      const protocol = window.location.protocol
      const backendUrl = import.meta.env.VITE_API_URL || `${protocol}//localhost:200`
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: ContactResponse = await response.json()

      if (result.success) {
        setTicketId(result.ticketId || '')
        setShowSuccess(true)
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
