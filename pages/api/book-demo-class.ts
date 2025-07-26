import type { NextApiRequest, NextApiResponse } from 'next'
import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const filePath = path.join(process.cwd(), 'demo-class-bookings.xlsx')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const { name, mobile, email, class: studentClass, subject } = req.body

    // Write to Excel
    // type Booking = { Name: string; Mobile: string; Email: string; Class: string; Subject: string; Date: string }
    // let data: Booking[] = []
    // if (fs.existsSync(filePath)) {
    //   const workbook = XLSX.readFile(filePath)
    //   const sheet = workbook.Sheets[workbook.SheetNames[0]]
    //   data = XLSX.utils.sheet_to_json<Booking>(sheet)
    // }
    // data.push({
    //   Name: name,
    //   Mobile: mobile,
    //   Email: email,
    //   Class: studentClass,
    //   Subject: subject,
    //   Date: new Date().toISOString(),
    // })
    // const worksheet = XLSX.utils.json_to_sheet(data)
    // const workbook = XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings')
    // XLSX.writeFile(workbook, filePath)

    // Send email notification
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

      // Send email to admin
          // Validate required environment variables
          if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS || !process.env.ADMIN_EMAIL) {
            return res.status(500).json({ success: false, error: "Missing email configuration in environment variables." })
          }
    
          // Send email to admin
          await transporter.sendMail({
            from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Demo Class Booking',
            text: `A new demo class has been booked:\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nClass: ${studentClass}\nSubject: ${subject}\nDate: ${new Date().toLocaleString()}`,
            html: `
              <h3>New Demo Class Booking</h3>
              <table style="border-collapse: collapse;">
                <tr><td style="padding:4px 8px;"><b>Name:</b></td><td style="padding:4px 8px;">${name}</td></tr>
                <tr><td style="padding:4px 8px;"><b>Mobile:</b></td><td style="padding:4px 8px;">${mobile}</td></tr>
                <tr><td style="padding:4px 8px;"><b>Email:</b></td><td style="padding:4px 8px;">${email}</td></tr>
                <tr><td style="padding:4px 8px;"><b>Class:</b></td><td style="padding:4px 8px;">${studentClass}</td></tr>
                <tr><td style="padding:4px 8px;"><b>Subject:</b></td><td style="padding:4px 8px;">${subject}</td></tr>
                <tr><td style="padding:4px 8px;"><b>Date:</b></td><td style="padding:4px 8px;">${new Date().toLocaleString()}</td></tr>
              </table>
            `,
          })
    
          // Send confirmation email to user
          await transporter.sendMail({
            from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
            to: email,
            subject: '🎉 Your Demo Class Booking is Confirmed!',
            text: `Hello ${name},
    
    Congratulations on taking the first step towards your learning journey!
    
    We're excited to have you with us and can't wait to help you achieve your goals. Get ready for an engaging and inspiring experience!
    
    Stay connected:
    - Visit our website: https://app.thetutorbridge.com
    - Read our blog: https://blog.thetutorbridge.com
    - Join our Telegram: https://t.me/thetutorbridge
    - WhatsApp us: +91-9310096171
    
    See you soon,
    TheTutorBridge Team
    `,
            html: `
              <div style="font-family: Arial, sans-serif; color: #222;">
                <h2 style="color: #2e7d32;">🎉 Demo Class Booking Confirmed!</h2>
                <p>Dear ${name},</p>
                <p>
                  <b>Congratulations!</b> You've just booked your demo class with The Tutor Bridge.<br>
                  We're thrilled to be part of your learning journey and can't wait to help you succeed!
                </p>
                <table style="border-collapse: collapse; margin: 16px 0;">
                  <tr>
                    <td style="padding: 6px 12px; font-weight: bold;">Name:</td>
                    <td style="padding: 6px 12px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 12px; font-weight: bold;">Mobile:</td>
                    <td style="padding: 6px 12px;">${mobile}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 12px; font-weight: bold;">Email:</td>
                    <td style="padding: 6px 12px;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 12px; font-weight: bold;">Class:</td>
                    <td style="padding: 6px 12px;">${studentClass}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 12px; font-weight: bold;">Subject:</td>
                    <td style="padding: 6px 12px;">${subject}</td>
                  </tr>
                </table>
                <p style="margin-top: 24px;">
                  <b>We're here to support you every step of the way. Get ready to learn, grow, and shine! 🌟</b>
                </p>
                <hr style="margin: 24px 0;">
                <p>
                  <b>Stay connected:</b><br>
                  <a href="https://thetutorbridge.com" target="_blank">Visit our website</a><br>
                  <a href="https://blog.thetutorbridge.com" target="_blank">Read our blog</a><br>
                  <a href="https://t.me/thetutorbridge" target="_blank">Join our Telegram</a><br>
                  <a href="https://wa.me/919310096171" target="_blank">WhatsApp us: +91-9310096171</a>
                </p>
                <p>See you in class!<br>The Tutor Bridge Team</p>
              </div>
            `,
          })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, error: "Failed to send email" })
    }

    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}