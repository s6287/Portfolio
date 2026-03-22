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

  console.log(`📡 Telegram Bot initialized. Target Chat ID: ${TELEGRAM_CHAT_ID}`);

  // Safety check: Bot ID is the part before the colon in the token
  const botId = TELEGRAM_BOT_TOKEN.split(":")[0];
  if (TELEGRAM_CHAT_ID === botId) {
    console.warn("⚠️ WARNING: TELEGRAM_CHAT_ID matches the Bot ID. You need your PERSONAL Chat ID from @userinfobot.");
  }

  // API Route for Visitor Tracking
  app.post("/api/visitor", async (req, res) => {
    const { location, device, referrer, time } = req.body;
    
    const message = `
🚀 *New Portfolio Visit!*
━━━━━━━━━━━━━━━━━━━━
📍 *Location:* ${location || "Unknown"}
📱 *Device:* ${device || "Unknown"}
🔗 *Referrer:* ${referrer || "Direct"}
⏰ *Time:* ${time}
━━━━━━━━━━━━━━━━━━━━
    `;

    try {
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
        if (errorData.error_code === 403) {
          console.error("❌ TELEGRAM ERROR 403: The bot cannot send you messages yet.");
          console.error("👉 FIX: Search for your bot on Telegram and click 'START'.");
          console.error("👉 ALSO: Ensure TELEGRAM_CHAT_ID is YOUR ID, not the bot's ID.");
          return res.status(403).json({ error: "Bot not started or wrong Chat ID." });
        } else {
          console.error("Telegram API Error:", errorData);
          return res.status(500).json({ error: "Telegram API Error" });
        }
      }
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ status: "ok" });
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
