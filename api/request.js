export default async function handler(req, res) {
  const { paypal } = req.body;

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🟢 NUEVA SOLICITUD DE KEY",
        description:
          `💳 Código PayPal:\n\`\`\`${paypal}\`\`\`\n\nEstado: ⏳ Pendiente`,
        color: 0x00ff00
      }]
    })
  });

  res.status(200).json({ ok: true });
}
