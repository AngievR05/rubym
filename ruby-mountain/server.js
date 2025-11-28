// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());              // allow requests from your front-end
app.use(express.json());      // parse JSON bodies

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  try {
    // configure your SMTP (use your own host / user / pass)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Ruby Mountain Website" <${process.env.SMTP_USER}>`,
      to: "info@rubym.co.za",    // where you want to receive the email
      replyTo: email,
      subject: subject || "New contact form message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim()
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    res.status(500).json({ ok: false, error: "Email failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
