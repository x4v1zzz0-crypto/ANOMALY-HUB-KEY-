export default function handler(req, res) {
  if(req.method === "POST") {
    const { code } = req.body;

    // Validar el código de pago (ejemplo simple)
    if(!code || code.length < 5) {
      return res.status(400).json({ error: "Código inválido" });
    }

    // Generar una key única
    const key = "ANOMALY-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Devolver la key al usuario
    res.status(200).json({ key });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
