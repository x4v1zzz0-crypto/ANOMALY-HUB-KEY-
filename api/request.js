export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paypal } = req.body;

  try {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🟢 NUEVA SOLICITUD DE KEY",
            description: `💳 Código PayPal: \`${paypal}\`\n\nEstado: ⏳ Pendiente`,
            color: 0x00ff00
          }
        ],
        components: [
          {
            type: 1, // fila de acción
            components: [
              {
                type: 2, // botón
                label: "Verify",
                style: 5, // Link button
                url: "https://TU-PROYECTO.vercel.app" // tu página de Verify
              }
            ]
          }
        ]
      })
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando a Discord" });
  }
}
