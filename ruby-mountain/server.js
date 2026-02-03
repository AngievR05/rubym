// server.js
const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static site from /public
app.use(express.static(path.join(__dirname, "public")));

// Home page (optional, but nice)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check (optional, useful for debugging)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

console.log("SMTP HOST:", process.env.SMTP_HOST);

// Contact API
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // Basic sanity checks (keeps garbage out)
  const safeName = String(name).trim().slice(0, 80);
  const safeEmail = String(email).trim().slice(0, 120);
  const safeSubject = String(subject || "").trim().slice(0, 140);
  const safeMessage = String(message).trim().slice(0, 5000);

  if (!safeName || !safeEmail || !safeMessage) {
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

      // 💡 These two lines fix a LOT of “works nowhere” SMTP setups:
      requireTLS: smtpPort === 587, // force STARTTLS on 587

      // If your mail server uses self-signed/odd certs, try:
      // tls: { rejectUnauthorized: false },
    });

    // ✅ Verify SMTP connection & auth
    await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || SMTP_USER,
      to: TO_EMAIL || "info@rubym.co.za",
      replyTo: safeEmail,
      subject: safeSubject
        ? `Website: ${safeSubject}`
        : "Website: New contact form message",
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
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

// Fallback: if someone hits a route that isn't a file or API, send index.html
// (Optional — useful if you later add client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Website running at http://localhost:${PORT}`);
  console.log(`Health check at http://localhost:${PORT}/api/health`);
});
