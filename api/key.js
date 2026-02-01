export default async function handler(req, res) {
  const { userId } = req.query; // toma el ID del usuario de la URL
  global.generatedKeys = global.generatedKeys || {};

  const key = global.generatedKeys[userId] || null;

  if (key) {
    res.status(200).json({ key }); // devuelve la key si ya se generó
  } else {
    res.status(200).json({ key: null }); // todavía no se ha generado
  }
}
