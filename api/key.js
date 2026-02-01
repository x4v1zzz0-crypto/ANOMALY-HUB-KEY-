hereexport default async function handler(req, res) {
  const { userId } = req.query;
  global.generatedKeys = global.generatedKeys || {};

  const key = global.generatedKeys[userId] || null;
  res.status(200).json({ key });
}
