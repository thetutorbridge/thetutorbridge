import type { NextApiRequest, NextApiResponse } from 'next'
import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const filePath = path.join(process.cwd(), 'doubt-queries.xlsx')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, mobile, email, doubt, class: studentClass } = req.body

    // Write to Excel
    // type Doubt = { Name: string; Mobile: string; Email: string; Class: string; Doubt: string; Date: string }
    // let data: Doubt[] = []
    // if (fs.existsSync(filePath)) {
    //   const workbook = XLSX.readFile(filePath)
    //   const sheet = workbook.Sheets[workbook.SheetNames[0]]
    //   data = XLSX.utils.sheet_to_json<Doubt>(sheet)
    // }
    // data.push({
    //   Name: name,
    //   Mobile: mobile,
    //   Email: email,
    //   Class: studentClass,
    //   Doubt: doubt,
    //   Date: new Date().toISOString(),
    // })
    // const worksheet = XLSX.utils.json_to_sheet(data)
    // const workbook = XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Doubts')
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
      await transporter.sendMail({
        from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,

        subject: 'New Doubt Submitted',
        text: `You have received a new doubt submission:\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nClass: ${studentClass}\nDoubt: ${doubt}`,
        html: `<p><b>Name:</b> ${name}</p>
           <p><b>Mobile:</b> ${mobile}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Class:</b> ${studentClass}</p>
           <p><b>Doubt:</b> ${doubt}</p>`,
      })

      // Send confirmation to user
      await transporter.sendMail({
        from: `"The Tutor Bridge" <${process.env.CONTACT_EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for submitting your doubt to The Tutor Bridge',
        text: `Hello ${name},\n\nThank you for submitting your doubt. Our team will review your query and get back to you soon.\n\nStay connected:\n- Visit our website: https://app.thetutorbridge.com\n- Read our blog: https://blog.thetutorbridge.com\n- Join our Telegram: https://t.me/thetutorbridge\n- WhatsApp us: +91-9310096171\n\nSee you soon,\nThe Tutor Bridge Team`,
        html: `<p>Hello ${name},</p>
           <p>Thank you for submitting your doubt. Our team will review your query and get back to you soon.</p>
           <p><b>Stay connected:</b></p>
           <ul>
             <li>Visit our website: <a href="https://app.thetutorbridge.com">https://app.thetutorbridge.com</a></li>
             <li>Read our blog: <a href="https://blog.thetutorbridge.com">https://blog.thetutorbridge.com</a></li>
             <li>Join our Telegram: <a href="https://t.me/thetutorbridge">https://t.me/thetutorbridge</a></li>
             <li>WhatsApp us: +91-9310096171</li>
           </ul>
           <p>See you soon,<br/>The Tutor Bridge Team</p>`,
      })

      // Removed duplicate email to both admin and user to prevent user from receiving both mails
    } catch (err) {
      console.error(err)
      return res.status(500).json({ success: false, error: "Failed to send email" })
    }

    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}