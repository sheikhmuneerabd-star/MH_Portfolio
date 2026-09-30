import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // nodemailer Edge par nahi chalta

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HTML mein user ka text safe karne ke liye
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot bhara ho to bot hai: chupchap "ok" bol do
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").replace(/[\r\n]+/g, " ").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Message must be 10 to 5000 characters." }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: "Email server is not configured yet." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: email, // Reply dabane par seedha us bande ko jaye
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p>${esc(message).replace(/\n/g, "<br/>")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact mail error:", err);
    return NextResponse.json({ error: "Could not send the message. Please try again." }, { status: 502 });
  }
}