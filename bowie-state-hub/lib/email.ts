import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export function sendContactEmail({ name, email, subject, message }: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.CONTACT_RECEIVER!,
    subject: `[Contact Form] ${subject || "New Message"}`,
    html: `
    <div style="font-family:Arial, sans-serif; background-color:#f7f7f7; padding:30px;">
      <table width="100%" style="max-width:600px; margin:auto; background-color:white; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color:#000000; padding:20px;">
            <h1 style="color:#FFD200; margin:0; font-size:24px;">Bowie State Student Hub</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;">
            <h2 style="color:#000000; margin-top:0;">📬 New Contact Message</h2>
            <p style="color:#333; font-size:16px; line-height:1.5;">
              You’ve received a new message from the contact form on the Bowie State Student Hub.
            </p>
  
            <table cellpadding="6" cellspacing="0" style="margin-top:20px; font-size:15px; color:#333;">
              <tr>
                <td style="font-weight:bold; width:120px;">Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td><a href="mailto:${email}" style="color:#0000EE;">${email}</a></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Subject:</td>
                <td>${subject}</td>
              </tr>
            </table>
  
            <div style="margin-top:30px;">
              <h3 style="color:#000; font-size:16px; margin-bottom:10px;">Message:</h3>
              <div style="background-color:#f1f1f1; padding:15px; border-left:4px solid #FFD200; white-space:pre-wrap; font-size:15px;">
                ${message}
              </div>
            </div>
  
            <p style="margin-top:30px; color:#666; font-size:13px;">
              This message was sent via the contact form at <strong>bowiestudenthub.com</strong>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#000; color:#FFD200; text-align:center; padding:12px; font-size:13px;">
            &copy; ${new Date().getFullYear()} Bowie State Student Hub. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `
  }

  return transporter.sendMail(mailOptions)
}
