// server.js
const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Serve static site from /public
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// Home page (optional, but nice)
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// Health check (optional, useful for debugging)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

console.log("SMTP HOST:", process.env.SMTP_HOST);

// Contact API
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};


  if (!name || !email || !phone || !message) {

    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // Basic sanity checks (keeps garbage out)
  const safeName = String(name).trim().slice(0, 80);
  const safeEmail = String(email).trim().slice(0, 120);
  const safeSubject = String(subject || "").trim().slice(0, 140);
  const safeMessage = String(message).trim().slice(0, 5000);
  const safePhone = String(phone).trim().slice(0, 40);


  // Minimal email format check (not perfect, but blocks obvious junk)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail);

  if (!safeName || !emailOk || !safePhone || !safeMessage) {
    return res.status(400).json({ ok: false, error: "Invalid input" });
  }

  // Env validation (fail fast with clear errors)
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({
      ok: false,
      error: "Server email config missing (.env SMTP_HOST/SMTP_USER/SMTP_PASS)",
    });
  }

  try {
    const smtpPort = Number(SMTP_PORT) || 587;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },

      // If your SMTP is 587, this usually prevents silent TLS weirdness
      requireTLS: smtpPort === 587,

      // If your mail server uses self-signed certs, uncomment:
      // tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || SMTP_USER,
      to: TO_EMAIL || "info@rubym.co.za",
      replyTo: safeEmail,
      subject: safeSubject
        ? `Website: ${safeSubject}`
        : "Website: New contact form message",
      text: `Name: ${safeName}
Email: ${safeEmail}
Phone: ${safePhone}

Message:
${safeMessage}`,

    });

    console.log("✅ Email sent:", info.messageId);
    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ Contact email error (full):", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || "Email failed",
    });
  }
});

/**
 * SPA fallback:
 * - MUST come AFTER API routes
 * - MUST NOT catch /api/*
 * - Use regex to avoid path-to-regexp "*" crash
 */
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// 404 for anything else (optional, but nice for debugging)
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Website running at http://localhost:${PORT}`);
  console.log(`Health check at http://localhost:${PORT}/api/health`);
});
