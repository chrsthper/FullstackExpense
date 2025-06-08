// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Konversi __filename dan __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Redirect root to login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/landing.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
