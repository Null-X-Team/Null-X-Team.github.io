// API/load.js

function getTursoConfig() {
  let databaseUrl = process.env.Turso_user_database || process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || "";
  const authToken = process.env.Turso_auth_token || process.env.TURSO_AUTH_TOKEN || process.env.TURSO_TOKEN || "";
  // Pipeline HTTP API needs https:// — libsql:// is only for the native client
  databaseUrl = String(databaseUrl).trim().replace(/^libsql:\/\//i, "https://").replace(/\/$/, "");
  return { databaseUrl, authToken };
}


export default async function handler(req, res) {
  // Allow requests from your GitHub Pages frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    // GET:
    // /api/load?username=USERNAME
    //
    // POST:
    // { "username": "USERNAME" }

    const username =
      req.method === "GET"
        ? req.query?.username
        : req.body?.username;

    if (!username) {
      return res.status(400).json({
        error: "Missing username"
      });
    }

    const { databaseUrl, authToken } = getTursoConfig();

    if (!databaseUrl || !authToken) {
      console.error("Turso environment variables are missing");

      return res.status(500).json({
        error: "Turso environment variables are missing",
        hint: "Set Turso_user_database and Turso_auth_token on Vercel"
      });
    }

    // Query Turso
    const response = await fetch(`${databaseUrl}/v2/pipeline`, {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        requests: [
          {
            type: "execute",
            stmt: {
              sql: `
                SELECT username, save_string, updated_at
                FROM Gamesavedata
                WHERE username = ?
                LIMIT 1
              `,
              args: [
                {
                  type: "text",
                  value: username
                }
              ]
            }
          },
          {
            type: "close"
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Turso error:", data);

      return res.status(500).json({
        error: "Failed to load data",
        details: data
      });
    }

    const result = data?.results?.[0];

    if (result?.type === "error") {
      console.error("Turso query error:", result);

      return res.status(500).json({
        error: "Turso query failed",
        details: result
      });
    }

    const rows = result?.response?.result?.rows || [];

    // User has no saved data
    if (rows.length === 0) {
      return res.status(404).json({
        found: false,
        username: username,
        save_string: null,
        updated_at: null
      });
    }

    const row = rows[0];

    // Extract values returned by Turso
    const getValue = (cell) => {
      if (cell == null) return null;

      if (
        typeof cell === "object" &&
        "value" in cell
      ) {
        return cell.value;
      }

      return cell;
    };

    return res.status(200).json({
      found: true,
      username: getValue(row[0]),
      save_string: getValue(row[1]),
      updated_at: getValue(row[2])
    });

  } catch (error) {
    console.error("Load error:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      cause: error.cause ? String(error.cause) : undefined,
      hint: "If details is 'fetch failed', Turso URL may be wrong or unreachable from Vercel."
    });
  }
}
