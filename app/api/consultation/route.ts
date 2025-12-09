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
      subjects,
      currentChallenges,
      goals,
      preferredSchedule,
      howHeard,
      additionalInfo,
      consent
    } = body

    // Validate required fields
    if (!parentName || !studentName || !email || !phone || !timezone || !grade || !subjects || subjects.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Prepare email content
    const emailSubject = `New Tutoring Consultation Request - ${studentName} (Grade ${grade})`

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A3D7C, #2BAE66); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Consultation Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Tutoring Services Inquiry</p>
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
              <td style="padding: 8px 0;">${timezone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Grade Level:</td>
              <td style="padding: 8px 0;">${grade}th Grade</td>
            </tr>
          </table>

          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Subjects Needed</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${subjects.map((s: string) => `<span style="display: inline-block; background: #1A3D7C; color: white; padding: 5px 12px; border-radius: 20px; margin: 3px; font-size: 14px;">${s}</span>`).join('')}
          </div>

          ${currentChallenges ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Current Challenges</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${currentChallenges.replace(/\n/g, '<br>')}
          </div>
          ` : ''}

          ${goals ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Goals for Tutoring</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${goals.replace(/\n/g, '<br>')}
          </div>
          ` : ''}

          ${preferredSchedule ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Preferred Schedule</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${preferredSchedule.replace(/\n/g, '<br>')}
          </div>
          ` : ''}

          ${additionalInfo ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">Additional Information</h2>
          <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            ${additionalInfo.replace(/\n/g, '<br>')}
          </div>
          ` : ''}

          ${howHeard ? `
          <h2 style="color: #1A3D7C; border-bottom: 2px solid #2BAE66; padding-bottom: 10px; margin-top: 20px;">How They Found Us</h2>
          <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin: 0;">${howHeard}</p>
          ` : ''}
        </div>

        <div style="background: #FFC857; padding: 15px; text-align: center;">
          <p style="margin: 0; color: #1A3D7C; font-weight: bold;">ACTION REQUIRED: Schedule consultation within 24 hours</p>
        </div>

        <div style="background: #1A3D7C; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">This is an automated message from The Tutor Bridge consultation form.</p>
        </div>
      </div>
    `

    const textContent = `
NEW TUTORING CONSULTATION REQUEST

Contact Information:
- Parent/Guardian: ${parentName}
- Student Name: ${studentName}
- Email: ${email}
- Phone: ${phone}
- Timezone: ${timezone}
- Grade Level: ${grade}th Grade

Subjects Needed:
${subjects.join(', ')}

${currentChallenges ? `Current Challenges:\n${currentChallenges}\n` : ''}
${goals ? `Goals for Tutoring:\n${goals}\n` : ''}
${preferredSchedule ? `Preferred Schedule:\n${preferredSchedule}\n` : ''}
${additionalInfo ? `Additional Information:\n${additionalInfo}\n` : ''}
${howHeard ? `How They Found Us: ${howHeard}` : ''}

ACTION REQUIRED: Schedule consultation within 24 hours
    `

    // Send to both email addresses
    const recipients = [
      "rishabhjain2489@gmail.com",
      "info@thetutorbridge.com"
    ]

    await sendEmail(recipients, emailSubject, htmlContent, textContent)

    // Also send confirmation email to the parent
    const confirmationSubject = "Your Consultation Request Received - The Tutor Bridge"
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A3D7C, #2BAE66); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Thank You!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your consultation request</p>
        </div>

        <div style="padding: 20px;">
          <p>Hi ${parentName},</p>

          <p>Thank you for your interest in tutoring for ${studentName}! We're excited to help.</p>

          <p>Our education coordinator will contact you within <strong>24 hours</strong> to schedule your free 20-minute consultation.</p>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1A3D7C; margin-top: 0;">What happens during the consultation?</h3>
            <ul style="padding-left: 20px; margin-bottom: 0;">
              <li>Discuss ${studentName}'s academic situation and goals</li>
              <li>Learn about our tutoring approach</li>
              <li>Get matched with an ideal tutor</li>
              <li>Answer all your questions</li>
            </ul>
          </div>

          <p>In the meantime, feel free to explore:</p>
          <ul>
            <li><a href="https://www.thetutorbridge.com/pricing">Our pricing packages</a></li>
            <li><a href="https://www.thetutorbridge.com/how-it-works">How tutoring works</a></li>
            <li><a href="https://www.thetutorbridge.com/faq">Frequently asked questions</a></li>
          </ul>

          <p>If you have any urgent questions, don't hesitate to email us at <a href="mailto:info@thetutorbridge.com">info@thetutorbridge.com</a></p>

          <p>We look forward to speaking with you soon!</p>

          <p>Best regards,<br>The Tutor Bridge Team</p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0;">The Tutor Bridge | Expert Homework Help & Tutoring</p>
          <p style="margin: 5px 0 0 0;"><a href="https://www.thetutorbridge.com">www.thetutorbridge.com</a></p>
        </div>
      </div>
    `

    await sendEmail([email], confirmationSubject, confirmationHtml, `Thank you for your consultation request. We'll contact you within 24 hours to schedule your free consultation.`)

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully"
    })

  } catch (error) {
    console.error("Error processing consultation request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
