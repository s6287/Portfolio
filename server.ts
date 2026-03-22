import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Telegram Configuration
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8713475964:AAGxd0SGXKhbfHjfnHkgExQmMlXKJ3XSDqw";
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5767428461";

  // Safety check: Bot ID is the part before the colon in the token
  const botId = TELEGRAM_BOT_TOKEN.split(":")[0];
  if (TELEGRAM_CHAT_ID === botId) {
    console.warn("⚠️ WARNING: TELEGRAM_CHAT_ID matches the Bot ID. You need your PERSONAL Chat ID from @userinfobot.");
  }

  // System Initialization Route (Visitor Tracking)
  app.post("/api/sys-init", async (req, res) => {
    try {
      const { data: payload } = req.body;
      if (!payload) return res.status(400).json({ error: "Missing payload" });

      const decodedData = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
      const { location, device, referrer, time } = decodedData;

      const message = `
🚀 *New Portfolio Visit!*
━━━━━━━━━━━━━━━━━━━━
📍 *Location:* ${location || "Unknown"}
📱 *Device:* ${device || "Unknown"}
🔗 *Referrer:* ${referrer || "Direct"}
⏰ *Time:* ${time}
━━━━━━━━━━━━━━━━━━━━
      `;

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
      }
      
      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Failed to process system initialization:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
