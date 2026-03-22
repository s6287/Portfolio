import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { location, device, referrer, time } = req.body;
  
  // Telegram Configuration
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8713475964:AAGxd0SGXKhbfHjfnHkgExQmMlXKJ3XSDqw";
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "5767428461";

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
      return res.status(response.status).json(errorData);
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
