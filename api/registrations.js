import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const CRM_DATA_FILE = path.join(__dirname, '../crm-data.json');
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'rheartbeat2026@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || `no-reply@${process.env.SMTP_HOST?.replace(/^smtp\./, '')}`;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let emailTransporter;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function readRegistrations() {
  try {
    const content = await fs.readFile(CRM_DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeRegistrations(registrations) {
  await fs.writeFile(CRM_DATA_FILE, JSON.stringify(registrations, null, 2), 'utf-8');
}

async function sendRegistrationEmail(registration) {
  if (!emailTransporter) return null;

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_RECIPIENT,
    subject: `New registration from ${registration.fullName}`,
    text: `New registration:\nName: ${registration.fullName}\nEmail: ${registration.email}\nCompany: ${registration.company}\nService Interest: ${registration.serviceInterest}\nPreferred Date: ${registration.preferredDate}\nPreferred Time: ${registration.preferredTime}\nMessage:\n${registration.message}`,
  };

  return emailTransporter.sendMail(mailOptions);
}

export async function GET() {
  const registrations = await readRegistrations();
  return new Response(JSON.stringify({ registrations }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { fullName, email, company, serviceInterest, message, preferredDate, preferredTime } = body;

  if (!fullName || !email || !company || !message) {
    return new Response(JSON.stringify({ error: 'Missing required registration fields.' }), { status: 400 });
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

  const registrations = await readRegistrations();
  registrations.push(registration);
  await writeRegistrations(registrations);
  await sendRegistrationEmail(registration);

  return new Response(JSON.stringify({ success: true, registration }), { status: 201 });
}

function getRegistrationId(request) {
  const url = new URL(request.url);
  let id = url.searchParams.get('id');
  if (!id) {
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (pathSegments.length >= 3 && pathSegments[pathSegments.length - 2] === 'registrations') {
      id = lastSegment;
    }
  }
  return id;
}

export async function PUT(request) {
  const id = getRegistrationId(request);
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing registration id.' }), { status: 400 });
  }

  const body = await request.json();
  const registrations = await readRegistrations();
  const index = registrations.findIndex((item) => item.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Registration not found.' }), { status: 404 });
  }

  const updatedRegistration = {
    ...registrations[index],
    ...body,
  };

  registrations[index] = updatedRegistration;
  await writeRegistrations(registrations);

  return new Response(JSON.stringify({ success: true, registration: updatedRegistration }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const id = getRegistrationId(request);
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing registration id.' }), { status: 400 });
  }

  const registrations = await readRegistrations();
  const filtered = registrations.filter((item) => item.id !== id);

  if (filtered.length === registrations.length) {
    return new Response(JSON.stringify({ error: 'Registration not found.' }), { status: 404 });
  }

  await writeRegistrations(filtered);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
