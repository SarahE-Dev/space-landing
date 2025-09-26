import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      // For Gmail
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
      // Alternatively, for other services:
      // host: process.env.SMTP_HOST,
      // port: parseInt(process.env.SMTP_PORT || '587'),
      // secure: false,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      // },
    })

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email to receive messages
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #ff69b4, #8a2be2, #1e90ff); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">New Portfolio Contact</h2>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">From:</strong> ${name}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Email:</strong> 
              <a href="mailto:${email}" style="color: #1e90ff; text-decoration: none;">${email}</a>
            </div>
            
            ${subject ? `
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Subject:</strong> ${subject}
              </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Message:</strong>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ff69b4; white-space: pre-wrap; color: #333;">
${message}
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
              Sent from your portfolio website at ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact

From: ${name}
Email: ${email}
Subject: ${subject || 'No subject'}

Message:
${message}

Sent from your portfolio website at ${new Date().toLocaleString()}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
