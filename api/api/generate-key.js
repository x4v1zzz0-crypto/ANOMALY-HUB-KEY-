export default function handler(req, res) {
  if(req.method === "POST") {
    const { code } = req.body;

    // Validación simple del código
    if(!code || code.length < 5) {
      return res.status(400).json({ error: "Código inválido" });
    }

    // Simular verificación en “servidor”
    // Aquí podrías añadir validación real, por ejemplo consultar tu base de datos o API de Paypal

    // Generar key única
    const key = "ANOMALY-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Retornar la key
    return res.status(200).json({ key });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
