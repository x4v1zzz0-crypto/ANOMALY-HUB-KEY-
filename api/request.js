module.exports = async (req, res) => {
  const { paypal, userId } = req.body;

  global.sentUsers = global.sentUsers || [];
  if (global.sentUsers.includes(userId)) {
    return res.status(400).json({ error: "Ya enviaste solicitud, espera verificación" });
  }
  global.sentUsers.push(userId);

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🟢 NUEVA SOLICITUD DE KEY",
        description: `💳 Código PayPal: \`${paypal}\`\n\nEstado: ⏳ Pendiente`,
        color: 0x00ff00
      }],
      components: [{
        type: 1,
        components: [{
          type: 2,
          label: "Verify",
          style: 5,
          url: `https://TU-PROYECTO.vercel.app?user=${userId}`
        }]
      }]
    })
  });

  res.status(200).json({ ok: true });
};
