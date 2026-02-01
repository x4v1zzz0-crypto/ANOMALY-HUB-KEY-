export default async function handler(req, res) {
  const { userId, verified } = req.body;

  if (!verified) return res.status(403).json({ error: "No verificado en Discord" });

  global.generatedKeys = global.generatedKeys || {};
  if (global.generatedKeys[userId]) {
    return res.status(400).json({ error: "Ya tienes una key" });
  }

  // fetch ya está disponible en Node 18+, no usar import
  const response = await fetch(
    "https://api.nexus.gg/v1/key-groups/PAYPAL_KEYS/generate",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXUS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes: `Usuario ${userId}` })
    }
  );

  const data = await response.json();
  global.generatedKeys[userId] = data.key; // guarda temporalmente
  res.status(200).json({ key: data.key });
}
