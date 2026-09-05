// API/save.js

function getTursoConfig() {
  let databaseUrl = process.env.Turso_user_database || process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || "";
  const authToken = process.env.Turso_auth_token || process.env.TURSO_AUTH_TOKEN || process.env.TURSO_TOKEN || "";
  // Pipeline HTTP API needs https:// — libsql:// is only for the native client
  databaseUrl = String(databaseUrl).trim().replace(/^libsql:\/\//i, "https://").replace(/\/$/, "");
  return { databaseUrl, authToken };
}


export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { username, save_string } = req.body;

    if (!username) {
      return res.status(400).json({
        error: "Missing username"
      });
    }

    if (save_string === undefined) {
      return res.status(400).json({
        error: "Missing save_string"
      });
    }

    const { databaseUrl, authToken } = getTursoConfig();

    if (!databaseUrl || !authToken) {
      return res.status(500).json({
        error: "Turso environment variables are missing",
        hint: "Set Turso_user_database and Turso_auth_token on Vercel"
      });
    }

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
                INSERT INTO Gamesavedata (
                  username,
                  save_string,
                  updated_at
                )
                VALUES (?, ?, ?)

                ON CONFLICT(username)
                DO UPDATE SET
                  save_string = excluded.save_string,
                  updated_at = excluded.updated_at
              `,

              args: [
                {
                  type: "text",
                  value: username
                },
                {
                  type: "text",
                  value:
                    typeof save_string === "string"
                      ? save_string
                      : JSON.stringify(save_string)
                },
                {
                  type: "text",
                  value: new Date().toISOString()
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
        error: "Failed to save data",
        details: data
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}
