export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const dbUrl = (process.env.Turso_user_database || '').trim();
  const token = (process.env.Turso_auth_token || '').trim();
  res.json({ hasDatabaseUrl: Boolean(dbUrl), hasAuthToken: Boolean(token), timestamp: new Date().toISOString() });
}
