import nodemailer from 'nodemailer'

export async function sendNotificationEmail({ subject, html }: { subject: string; html: string }) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.NOTIFICATION_EMAIL || 'merajul.hasan@paragon.com.bd'

  if (!host || !user || !pass) {
    console.warn('[sendEmail] SMTP not configured — skipping email notification')
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Paragon Organic Fertilizer" <${process.env.SMTP_FROM || user}>`,
    to,
    subject,
    html,
  })
}
