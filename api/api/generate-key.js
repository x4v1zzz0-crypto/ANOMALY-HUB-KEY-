const fetch = require("node-fetch");

// Pon tu webhook aquí
const WEBHOOK_URL = "https://discord.com/api/webhooks/1447268606726639867/rbLol3db3UPeu2FnwLqWGFqbDl3jpI4IyChajEKLfhbjTy4Ml_328XKaous2UAl9WfyZ";

async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { message, user } = req.body;

  if (!message || !user) return res.status(400).json({ error: "Faltan datos" });

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📩 Nuevo mensaje de ${user}:\n${message}`
      })
    });

    return res.status(200).json({ status: "enviado" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "No se pudo enviar al webhook" });
  }
}

module.exports = { handler };
