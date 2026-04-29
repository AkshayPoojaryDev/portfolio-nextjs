'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { sendContactEmail } from '@/app/actions/contact'

interface FormState {
  loading: boolean
  success: boolean
  error: string | null
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ loading: true, success: false, error: null })

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill all required fields')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format')
      }

      await sendContactEmail(formData)

      setFormState({ loading: false, success: true, error: null })
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => {
        setFormState({ loading: false, success: false, error: null })
      }, 5000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message'
      setFormState({ loading: false, success: false, error: message })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <label className="block text-sm font-500 mb-2 text-slate-900 dark:text-white">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="Your name" required
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus-ring" />
      </div>

      <div>
        <label className="block text-sm font-500 mb-2 text-slate-900 dark:text-white">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="your@email.com" required
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus-ring" />
      </div>

      <div>
        <label className="block text-sm font-500 mb-2 text-slate-900 dark:text-white">Subject</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange}
          placeholder="What's this about?"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus-ring" />
      </div>

      <div>
        <label className="block text-sm font-500 mb-2 text-slate-900 dark:text-white">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange}
          placeholder="Your message here..." required rows={5}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus-ring resize-none" />
      </div>

      {formState.error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-200 text-sm">
          {formState.error}
        </div>
      )}

      {formState.success && (
        <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-200 text-sm">
          ✓ Message sent! I'll get back to you soon.
        </div>
      )}

      <motion.button type="submit" disabled={formState.loading}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-500 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Mail size={18} />
        {formState.loading ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  )
}
