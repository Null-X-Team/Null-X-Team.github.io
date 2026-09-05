// API/private-messages.js — Turso HTTP pipeline (no @libsql/client)

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
      const { sender_username, recipient_username } = req.query || {};
      if (!sender_username || !recipient_username) {
        return res.status(400).json({
          error: "sender_username and recipient_username are required"
        });
      }
      const result = await tursoExecute(
        databaseUrl,
        authToken,
        `SELECT id, sender_username, recipient_username, content, is_read, created_at
         FROM private_messages
         WHERE
           (sender_username = ? AND recipient_username = ?)
           OR
           (sender_username = ? AND recipient_username = ?)
         ORDER BY created_at ASC`,
        [
          { type: "text", value: sender_username },
          { type: "text", value: recipient_username },
          { type: "text", value: recipient_username },
          { type: "text", value: sender_username }
        ]
      );
      const rows = (result.rows || []).map((r) => ({
        id: getValue(r[0]),
        sender_username: getValue(r[1]),
        recipient_username: getValue(r[2]),
        content: getValue(r[3]),
        is_read: getValue(r[4]),
        created_at: getValue(r[5])
      }));
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const b = req.body || {};

      const sender_username =
        b.sender_username ||
        (b.sender_handle ? String(b.sender_handle).replace(/^@/, "").replace(/_/g, " ") : null);
      const recipient_username =
        b.recipient_username ||
        (b.recipient_handle ? String(b.recipient_handle).replace(/^@/, "").replace(/_/g, " ") : null);

      if (!sender_username || !recipient_username || !b.content) {
        return res.status(400).json({
          error: "sender_username, recipient_username, and content are required",
          received: Object.keys(b)
        });
      }

      const id =
        b.id ||
        `pm_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

      let isRead = 0;
      if (b.is_read === true || b.is_read === 1 || b.is_read === "1") isRead = 1;

      const createdAt = b.created_at || new Date().toISOString();

      await tursoExecute(
        databaseUrl,
        authToken,
        `INSERT INTO private_messages
          (id, sender_username, recipient_username, content, is_read, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          { type: "text", value: id },
          { type: "text", value: sender_username },
          { type: "text", value: recipient_username },
          { type: "text", value: b.content },
          { type: "integer", value: isRead },
          { type: "text", value: createdAt }
        ]
      );
      return res.status(201).json({
        success: true,
        message: "Private message sent",
        id,
        sender_username,
        recipient_username,
        content: b.content,
        is_read: isRead,
        created_at: createdAt
      });
    }

    if (req.method === "PATCH") {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      await tursoExecute(
        databaseUrl,
        authToken,
        `UPDATE private_messages SET is_read = 1 WHERE id = ?`,
        [{ type: "text", value: id }]
      );
      return res.status(200).json({ success: true, message: "Message marked as read" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      await tursoExecute(
        databaseUrl,
        authToken,
        `DELETE FROM private_messages WHERE id = ?`,
        [{ type: "text", value: id }]
      );
      return res.status(200).json({ success: true, message: "Private message deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Private messages API error:", error);
    return res.status(error.statusCode || 500).json({
      error: "Internal server error",
      details: error.message,
      turso: error.details
    });
  }
}
