// server.js
const path = require("path");
const express = require("express");
const cors = require("cors");
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
