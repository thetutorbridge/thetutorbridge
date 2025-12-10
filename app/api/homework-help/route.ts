import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(to: string[], subject: string, htmlContent: string, textContent: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "The Tutor Bridge <noreply@thetutorbridge.com>",
      to: to,
      subject: subject,
      html: htmlContent,
      text: textContent
    })

    if (error) {
      console.error("Resend error:", error)
      return false
    }

    console.log("Email sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      parentName,
      studentName,
      email,
      phone,
      timezone,
      grade,
      subject,
      topic,
      description,
      urgency,
      preferredTime,
      source,
      consent,
      files
    } = body

    // Validate required fields (phone is optional)
    if (!parentName || !studentName || !email || !grade || !subject || !description || !urgency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Prepare email content
    const emailSubject = `New Homework Help Request - ${subject} - ${studentName}`

    const urgencyLabels: Record<string, string> = {
      "immediate": "URGENT - Within 60 minutes (+$10)",
      "24hr": "Priority - Within 24 hours",
      "48hr": "Standard - Within 48 hours",
      "urgent": "URGENT (Under 24 hours)",
      "rush": "Rush (24-48 hours)",
      "standard": "Standard (48-72 hours)",
      "flexible": "Flexible (3+ days)"
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1A3D7C; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Homework Help Request</h1>
        </div>

        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Parent/Guardian:</td>
              <td style="padding: 8px 0;">${parentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Student Name:</td>
              <td style="padding: 8px 0;">${studentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Timezone:</td>
              <td style="padding: 8px 0;">${timezone || "Not specified"}</td>
            </tr>
          </table>

          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Assignment Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Grade Level:</td>
              <td style="padding: 8px 0;">${grade}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Topic:</td>
              <td style="padding: 8px 0;">${topic || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Urgency:</td>
              <td style="padding: 8px 0; color: ${urgency === 'urgent' ? '#dc2626' : urgency === 'rush' ? '#ea580c' : '#1A3D7C'}; font-weight: bold;">
                ${urgencyLabels[urgency] || urgency}
              </td>
            </tr>
            ${preferredTime ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Preferred Contact Time:</td>
              <td style="padding: 8px 0;">${preferredTime}</td>
            </tr>
            ` : ''}
            ${source ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">How They Found Us:</td>
              <td style="padding: 8px 0;">${source}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Assignment Description</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${description.replace(/\n/g, '<br>')}
          </div>

          ${files && files.length > 0 ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Attachments (${files.length} file${files.length > 1 ? 's' : ''})</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${files.map((file: { name: string; url: string; size: number }) => `
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <a href="${file.url}" style="color: #1A3D7C; text-decoration: none; font-weight: bold;">
                    📎 ${file.name}
                  </a>
                  <span style="color: #666; font-size: 12px; margin-left: 10px;">
                    (${(file.size / 1024).toFixed(1)} KB)
                  </span>
                </li>
              `).join('')}
            </ul>
            <p style="margin-top: 10px; font-size: 12px; color: #666;">
              ⚠️ Download links expire in 7 days.
            </p>
          </div>
          ` : ''}
        </div>

        <div style="background: #1A3D7C; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">This is an automated message from The Tutor Bridge homework submission form.</p>
        </div>
      </div>
    `

    const textContent = `
NEW HOMEWORK HELP REQUEST

Contact Information:
- Parent/Guardian: ${parentName}
- Student Name: ${studentName}
- Email: ${email}
- Phone: ${phone}
- Timezone: ${timezone || "Not specified"}

Assignment Details:
- Grade Level: ${grade}
- Subject: ${subject}
- Topic: ${topic || "Not specified"}
- Urgency: ${urgencyLabels[urgency] || urgency}
${preferredTime ? `- Preferred Contact Time: ${preferredTime}` : ''}
${source ? `- How They Found Us: ${source}` : ''}

Assignment Description:
${description}

${files && files.length > 0 ? `Attachments (${files.length} file${files.length > 1 ? 's' : ''}):\n${files.map((file: { name: string; url: string; size: number }) => `- ${file.name} (${(file.size / 1024).toFixed(1)} KB): ${file.url}`).join('\n')}\n\nNote: Download links expire in 7 days.` : ''}
    `

    // Send to both email addresses
    const recipients = [
      "rishabhjain2489@gmail.com",
      "info@thetutorbridge.com"
    ]

    await sendEmail(recipients, emailSubject, htmlContent, textContent)

    // Also send confirmation email to the parent
    const confirmationSubject = "We've Received Your Homework Help Request - The Tutor Bridge"
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1A3D7C; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Thank You for Your Request!</h1>
        </div>

        <div style="padding: 20px;">
          <p>Hi ${parentName},</p>

          <p>We've received your homework help request for ${studentName}. Our team is reviewing it now and will send you a custom quote within <strong>2 hours</strong>.</p>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1A3D7C; margin-top: 0;">Request Summary:</h3>
            <ul style="padding-left: 20px;">
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Topic:</strong> ${topic || "General"}</li>
              <li><strong>Urgency:</strong> ${urgencyLabels[urgency] || urgency}</li>
            </ul>
          </div>

          <p><strong>What happens next?</strong></p>
          <ol>
            <li>Our expert reviews your assignment</li>
            <li>You receive a custom quote (within 2 hours)</li>
            <li>Approve the quote and make payment</li>
            <li>Receive your step-by-step solution</li>
          </ol>

          <p>If you have any questions in the meantime, just reply to this email.</p>

          <p>Best regards,<br>The Tutor Bridge Team</p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0;">The Tutor Bridge | Expert Homework Help & Tutoring</p>
          <p style="margin: 5px 0 0 0;"><a href="https://www.thetutorbridge.com">www.thetutorbridge.com</a></p>
        </div>
      </div>
    `

    await sendEmail([email], confirmationSubject, confirmationHtml, `Thank you for your homework help request. We'll send you a quote within 2 hours.`)

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully"
    })

  } catch (error) {
    console.error("Error processing homework help request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
