let keysByUser = {};

export default function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { code, userId } = req.body;

  if(!code || code.length < 5) return res.status(400).json({ error: "Código inválido" });
  if(!userId) return res.status(400).json({ error: "No hay usuario identificado" });

  if(keysByUser[userId]) {
    return res.status(200).json({ error: "Ya generaste una key: " + keysByUser[userId] });
  }

  const key = "ANOMALY-" + Math.random().toString(36).substring(2,10).toUpperCase();
  keysByUser[userId] = key;

  res.status(200).json({ key });
}
