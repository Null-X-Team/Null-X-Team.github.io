// API/users.js — Turso HTTP pipeline (no @libsql/client)

function getTursoConfig() {
  let databaseUrl = process.env.Turso_user_database || process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || "";
  const authToken = process.env.Turso_auth_token || process.env.TURSO_AUTH_TOKEN || process.env.TURSO_TOKEN || "";
  databaseUrl = String(databaseUrl).trim().replace(/^libsql:\/\//i, "https://").replace(/\/$/, "");
  return { databaseUrl, authToken };
}

function getValue(cell) {
  if (cell == null) return null;
  if (typeof cell === "object" && "value" in cell) return cell.value;
  return cell;
}

async function tursoExecute(databaseUrl, authToken, sql, args = []) {
  const response = await fetch(`${databaseUrl}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: {
            sql,
            args: args.map((a) => {
              if (a.value === null || a.value === undefined) {
                return { type: "null" };
              }
              return {
                type: a.type || "text",
                value: String(a.value)
              };
            })
          }
        },
        { type: "close" }
      ]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    const err = new Error("Turso HTTP error");
    err.details = data;
    err.statusCode = 500;
    throw err;
  }
  const result = data?.results?.[0];
  if (result?.type === "error") {
    const err = new Error("Turso query failed");
    err.details = result;
    err.statusCode = 500;
    throw err;
  }
  return result?.response?.result || { rows: [], cols: [] };
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { databaseUrl, authToken } = getTursoConfig();
  if (!databaseUrl || !authToken) {
    return res.status(500).json({ error: "Turso environment variables are missing" });
  }

  try {
    if (req.method === "GET") {
      const { username, id } = req.query || {};

      if (id !== undefined && id !== null && id !== "") {
        const result = await tursoExecute(
          databaseUrl,
          authToken,
          `SELECT id, created_at, username, password, handler FROM users WHERE id = ? LIMIT 1`,
          [{ type: "integer", value: id }]
        );
        const rows = result.rows || [];
        if (!rows.length) return res.status(404).json({ error: "User not found" });
        const r = rows[0];
        return res.status(200).json({
          id: getValue(r[0]),
          created_at: getValue(r[1]),
          username: getValue(r[2]),
          password: getValue(r[3]),
          handler: getValue(r[4])
        });
      }

      if (username) {
        const result = await tursoExecute(
          databaseUrl,
          authToken,
          `SELECT id, created_at, username, password, handler FROM users WHERE username = ? LIMIT 1`,
          [{ type: "text", value: username }]
        );
        const rows = result.rows || [];
        if (!rows.length) return res.status(404).json({ error: "User not found" });
        const r = rows[0];
        return res.status(200).json({
          id: getValue(r[0]),
          created_at: getValue(r[1]),
          username: getValue(r[2]),
          password: getValue(r[3]),
          handler: getValue(r[4])
        });
      }

      const result = await tursoExecute(
        databaseUrl,
        authToken,
        `SELECT id, created_at, username, password, handler FROM users ORDER BY id ASC`
      );
      const usersList = (result.rows || []).map((r) => ({
        id: getValue(r[0]),
        created_at: getValue(r[1]),
        username: getValue(r[2]),
        password: getValue(r[3]),
        handler: getValue(r[4])
      }));
      return res.status(200).json(usersList);
    }

    if (req.method === "POST") {
      const { id, created_at, username, password, handler } = req.body || {};
      if (id === undefined || !username || !password) {
        return res.status(400).json({ error: "id, username, and password are required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `INSERT INTO users (id, created_at, username, password, handler) VALUES (?, ?, ?, ?, ?)`,
        [
          { type: "integer", value: id },
          { type: "text", value: created_at ?? new Date().toISOString() },
          { type: "text", value: username },
          { type: "text", value: password },
          { type: "text", value: handler ?? null }
        ]
      );
      return res.status(201).json({ success: true, message: "User created" });
    }

    if (req.method === "PATCH") {
      const { id, created_at, username, password, handler } = req.body || {};
      if (id === undefined) {
        return res.status(400).json({ error: "id is required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `UPDATE users SET
          created_at = COALESCE(?, created_at),
          username = COALESCE(?, username),
          password = COALESCE(?, password),
          handler = COALESCE(?, handler)
        WHERE id = ?`,
        [
          { type: "text", value: created_at ?? null },
          { type: "text", value: username ?? null },
          { type: "text", value: password ?? null },
          { type: "text", value: handler ?? null },
          { type: "integer", value: id }
        ]
      );
      return res.status(200).json({ success: true, message: "User updated" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body || {};
      if (id === undefined) {
        return res.status(400).json({ error: "id is required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `DELETE FROM users WHERE id = ?`,
        [{ type: "integer", value: id }]
      );
      return res.status(200).json({ success: true, message: "User deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Users API error:", error);
    return res.status(error.statusCode || 500).json({
      error: "Internal server error",
      details: error.message,
      turso: error.details
    });
  }
}
