'use server'

import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Configure transporter (use env vars in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use app-specific password
  },
})

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate
    if (!data.name || !data.email || !data.message) {
      throw new Error('Missing required fields')
    }

    // Email to you
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      subject: `New Contact: ${data.subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: data.email,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: 'I received your message!',
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>I've received your message and will get back to you soon.</p>
        <p>Best regards,<br>Your Name</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email. Please try again later.')
  }
}
