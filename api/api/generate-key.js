module.exports = async (req, res) => {
  try {
    const { userId, verified } = req.body;
    if (!verified) return res.status(403).json({ error: "No verificado" });

    global.generatedKeys = global.generatedKeys || {};
    if (global.generatedKeys[userId]) return res.status(400).json({ error: "Ya tienes una key" });

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

    if (!response.ok) return res.status(500).json({ error: "Error generando key en Nexus" });

    const data = await response.json();
    global.generatedKeys[userId] = data.key;
    res.status(200).json({ key: data.key });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error interno" });
  }
};
