import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'rheartbeat2026@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || `no-reply@${process.env.SMTP_HOST?.replace(/^smtp\./, '')}`;

let transporter;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function GET() {
  if (!transporter) {
    return new Response(JSON.stringify({ success: false, error: 'SMTP is not configured.' }), { status: 500 });
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_RECIPIENT,
      subject: 'R-Heartbeat Test Email',
      text: 'This is a test email from the R-Heartbeat registration service.',
    });
    return new Response(JSON.stringify({ success: true, info }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown SMTP error' }), { status: 500 });
  }
}
