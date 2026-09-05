// API/user-roles.js — Turso HTTP pipeline (no @libsql/client)

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

const ROLE_COLS = [
  "id", "username", "is_banned", "temp_ban_until", "last_action_reason",
  "last_action_category", "role_tag", "pfp_url", "is_admin", "last_seen",
  "bio", "warn_id", "warning_count", "last_action_type"
];

function rowToRole(row) {
  const obj = {};
  ROLE_COLS.forEach((col, i) => {
    obj[col] = getValue(row[i]);
  });
  return obj;
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
          `SELECT ${ROLE_COLS.join(", ")} FROM user_roles WHERE id = ? LIMIT 1`,
          [{ type: "integer", value: id }]
        );
        if (!(result.rows || []).length) {
          return res.status(404).json({ error: "User role record not found" });
        }
        return res.status(200).json(rowToRole(result.rows[0]));
      }

      if (username) {
        const result = await tursoExecute(
          databaseUrl,
          authToken,
          `SELECT ${ROLE_COLS.join(", ")} FROM user_roles WHERE username = ? LIMIT 1`,
          [{ type: "text", value: username }]
        );
        if (!(result.rows || []).length) {
          return res.status(404).json({ error: "User role record not found" });
        }
        return res.status(200).json(rowToRole(result.rows[0]));
      }

      const result = await tursoExecute(
        databaseUrl,
        authToken,
        `SELECT ${ROLE_COLS.join(", ")} FROM user_roles ORDER BY id ASC`
      );
      return res.status(200).json((result.rows || []).map(rowToRole));
    }

    if (req.method === "POST") {
      const b = req.body || {};
      if (b.id === undefined || !b.username) {
        return res.status(400).json({ error: "id and username are required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `INSERT INTO user_roles (
          id, username, is_banned, temp_ban_until, last_action_reason,
          last_action_category, role_tag, pfp_url, is_admin, last_seen,
          bio, warn_id, warning_count, last_action_type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          { type: "integer", value: b.id },
          { type: "text", value: b.username },
          { type: "integer", value: b.is_banned ?? 0 },
          { type: "text", value: b.temp_ban_until ?? null },
          { type: "text", value: b.last_action_reason ?? null },
          { type: "text", value: b.last_action_category ?? null },
          { type: "text", value: b.role_tag ?? "User" },
          { type: "text", value: b.pfp_url ?? null },
          { type: "integer", value: b.is_admin ?? 0 },
          { type: "text", value: b.last_seen ?? new Date().toISOString() },
          { type: "text", value: b.bio ?? null },
          { type: "integer", value: b.warn_id ?? 0 },
          { type: "integer", value: b.warning_count ?? 0 },
          { type: "text", value: b.last_action_type ?? null }
        ]
      );
      return res.status(201).json({ success: true, message: "User role record created" });
    }

    if (req.method === "PATCH") {
      const b = req.body || {};
      if (b.id === undefined) {
        return res.status(400).json({ error: "id is required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `UPDATE user_roles SET
          username = COALESCE(?, username),
          is_banned = COALESCE(?, is_banned),
          temp_ban_until = COALESCE(?, temp_ban_until),
          last_action_reason = COALESCE(?, last_action_reason),
          last_action_category = COALESCE(?, last_action_category),
          role_tag = COALESCE(?, role_tag),
          pfp_url = COALESCE(?, pfp_url),
          is_admin = COALESCE(?, is_admin),
          last_seen = COALESCE(?, last_seen),
          bio = COALESCE(?, bio),
          warn_id = COALESCE(?, warn_id),
          warning_count = COALESCE(?, warning_count),
          last_action_type = COALESCE(?, last_action_type)
        WHERE id = ?`,
        [
          { type: "text", value: b.username ?? null },
          { type: "integer", value: b.is_banned ?? null },
          { type: "text", value: b.temp_ban_until ?? null },
          { type: "text", value: b.last_action_reason ?? null },
          { type: "text", value: b.last_action_category ?? null },
          { type: "text", value: b.role_tag ?? null },
          { type: "text", value: b.pfp_url ?? null },
          { type: "integer", value: b.is_admin ?? null },
          { type: "text", value: b.last_seen ?? null },
          { type: "text", value: b.bio ?? null },
          { type: "integer", value: b.warn_id ?? null },
          { type: "integer", value: b.warning_count ?? null },
          { type: "text", value: b.last_action_type ?? null },
          { type: "integer", value: b.id }
        ]
      );
      return res.status(200).json({ success: true, message: "User role record updated" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body || {};
      if (id === undefined) {
        return res.status(400).json({ error: "id is required" });
      }
      await tursoExecute(
        databaseUrl,
        authToken,
        `DELETE FROM user_roles WHERE id = ?`,
        [{ type: "integer", value: id }]
      );
      return res.status(200).json({ success: true, message: "User role record deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("User roles API error:", error);
    return res.status(error.statusCode || 500).json({
      error: "Internal server error",
      details: error.message,
      turso: error.details
    });
  }
}
