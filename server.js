import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
const CRM_DATA_FILE = path.join(__dirname, 'crm-data.json');
const CRM_API_URL = process.env.CRM_API_URL;
const CRM_API_KEY = process.env.CRM_API_KEY;
const SMTP_HOST = process.env.SMTP_HOST || (process.env.SMTP_USER?.endsWith('@gmail.com') ? 'smtp.gmail.com' : undefined);
const SMTP_PORT = Number(process.env.SMTP_PORT || (process.env.SMTP_SECURE === 'true' ? 465 : 587));
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'rheartbeat2026@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER || `no-reply@${SMTP_HOST?.replace(/^smtp\./, '')}`;

let emailTransporter = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn('SMTP settings are not fully configured. Email notifications will be disabled.');
}

app.use(express.json());

async function readRegistrations() {
  try {
    const content = await fs.readFile(CRM_DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeRegistrations(registrations) {
  await fs.writeFile(CRM_DATA_FILE, JSON.stringify(registrations, null, 2), 'utf-8');
}

async function forwardToCRM(registration) {
  if (!CRM_API_URL) {
    return null;
  }

  const payload = {
    name: registration.fullName,
    email: registration.email,
    company: registration.company,
    serviceInterest: registration.serviceInterest,
    message: registration.message,
    preferredDate: registration.preferredDate,
    preferredTime: registration.preferredTime,
    source: 'R-Heartbeat Website',
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  if (CRM_API_KEY) {
    headers.Authorization = `Bearer ${CRM_API_KEY}`;
  }

  const response = await fetch(CRM_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`CRM request failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function sendRegistrationEmail(registration) {
  if (!emailTransporter) {
    console.warn('Email transporter not configured, skipping notification email.');
    return null;
  }

  const subject = `New registration from ${registration.fullName}`;
  const text = `A new registration has been submitted:\n\n` +
    `Name: ${registration.fullName}\n` +
    `Email: ${registration.email}\n` +
    `Company: ${registration.company}\n` +
    `Service Interest: ${registration.serviceInterest}\n` +
    `Preferred Date: ${registration.preferredDate}\n` +
    `Preferred Time: ${registration.preferredTime}\n\n` +
    `Message:\n${registration.message}`;

  const html = `
    <h2>New Registration Submitted</h2>
    <p><strong>Name:</strong> ${registration.fullName}</p>
    <p><strong>Email:</strong> ${registration.email}</p>
    <p><strong>Company:</strong> ${registration.company}</p>
    <p><strong>Service Interest:</strong> ${registration.serviceInterest}</p>
    <p><strong>Preferred Date:</strong> ${registration.preferredDate}</p>
    <p><strong>Preferred Time:</strong> ${registration.preferredTime}</p>
    <p><strong>Message:</strong></p>
    <p>${registration.message.replace(/\n/g, '<br/>')}</p>
  `;

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_RECIPIENT,
    subject,
    text,
    html,
  };

  return emailTransporter.sendMail(mailOptions);
}

app.post('/api/registrations', async (req, res) => {
  const { fullName, email, company, serviceInterest, message, preferredDate, preferredTime } = req.body;

  if (!fullName || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required registration fields.' });
  }

  const registration = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    fullName,
    email,
    company,
    serviceInterest,
    message,
    preferredDate,
    preferredTime,
  };

  try {
    const registrations = await readRegistrations();
    registrations.push(registration);
    await writeRegistrations(registrations);

    let crmResponse = null;
    let emailResponse = null;

    try {
      crmResponse = await forwardToCRM(registration);
    } catch (error) {
      console.error('CRM forwarding failed:', error);
    }

    try {
      emailResponse = await sendRegistrationEmail(registration);
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    return res.status(201).json({ success: true, registration, crmResponse, emailResponse });
  } catch (error) {
    console.error('Failed to save registration:', error);
    return res.status(500).json({ error: 'Unable to save registration at this time.' });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await readRegistrations();
    return res.json({ success: true, registrations });
  } catch (error) {
    console.error('Failed to read registrations:', error);
    return res.status(500).json({ error: 'Unable to read registrations.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'CRM backend is healthy.' });
});

app.get('/api/test-email', async (_req, res) => {
  if (!emailTransporter) {
    return res.status(500).json({ success: false, error: 'SMTP is not configured.' });
  }

  try {
    const testMail = await emailTransporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_RECIPIENT,
      subject: 'R-Heartbeat Test Email',
      text: 'This is a test email from the R-Heartbeat registration service.',
    });
    return res.json({ success: true, result: testMail });
  } catch (error) {
    console.error('Test email failed:', error);
    return res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown SMTP error' });
  }
});

app.listen(PORT, () => {
  console.log(`CRM server listening on port ${PORT}`);
});
