import type { NextApiRequest, NextApiResponse } from 'next'
import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const filePath = path.join(process.cwd(), 'contact-queries.xlsx')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    // Send email notification to both admin , user
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        secure: true,
        port: 465,
        auth: {
          user: process.env.CONTACT_EMAIL_USER,
          pass: process.env.CONTACT_EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      await transporter.sendMail({
        from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL, // Admin receives the contact query
        subject: 'New Contact Form Submission',
        text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${message}</p>`,
      })

    // Optional: Send confirmation to user
    await transporter.sendMail({
      from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting The Tutor Bridge',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you soon.\n\nStay connected:\n- Visit our website: https://app.thetutorbridge.com\n- Read our blog: https://blog.thetutorbridge.com\n- Join our Telegram: https://t.me/thetutorbridge\n- WhatsApp us: +91-9310096171\n\nSee you soon,\nTheTutorBridge Team`,
      html: `<p>Hello ${name},</p>
         <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
         <p><b>Stay connected:</b></p>
         <ul>
           <li>Visit our website: <a href="https://app.thetutorbridge.com">https://app.thetutorbridge.com</a></li>
           <li>Read our blog: <a href="https://blog.thetutorbridge.com">https://blog.thetutorbridge.com</a></li>
           <li>Join our Telegram: <a href="https://t.me/thetutorbridge">https://t.me/thetutorbridge</a></li>
           <li>WhatsApp us: +91-9310096171</li>
         </ul>
         <p>See you soon,<br/>TheTutorBridge Team</p>`,
    })
      } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, error: "Failed to send email" })
    }

    return res.status(200).json({ success: true })
  }
  res.status(405).end() // Method Not Allowed
}
