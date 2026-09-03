// API/messages.js

export default async function handler(req, res) {
  // Allow requests from your GitHub Pages frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const databaseUrl = process.env.Turso_user_database;
  const authToken = process.env.Turso_auth_token;

  if (!databaseUrl || !authToken) {
    console.error("Turso environment variables are missing");

    return res.status(500).json({
      error: "Turso environment variables are missing"
    });
  }

  try {
    /*
     * GET
     * Loads messages from the messages table.
     *
     * Optional:
     * ?limit=100
     */

    if (req.method === "GET") {
      let limit = parseInt(req.query?.limit, 10);

      // Default to 100 messages
      if (!Number.isFinite(limit) || limit < 1) {
        limit = 100;
      }

      // Prevent excessively large requests
      limit = Math.min(limit, 500);

      const response = await fetch(
        `${databaseUrl}/v2/pipeline`,
        {
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
                    SELECT
                      id,
                      username,
                      content,
                      created_at
                    FROM messages
                    ORDER BY id ASC
                    LIMIT ?
                  `,

                  args: [
                    {
                      type: "integer",
                      value: limit
                    }
                  ]
                }
              },

              {
                type: "close"
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Turso error:", data);

        return res.status(500).json({
          error: "Failed to load messages",
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

      const rows =
        result?.response?.result?.rows || [];

      // Convert Turso rows into normal JavaScript objects
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

      const messages = rows.map((row) => ({
        id: getValue(row[0]),
        username: getValue(row[1]),
        content: getValue(row[2]),
        created_at: getValue(row[3])
      }));

      return res.status(200).json({
        success: true,
        messages: messages
      });
    }

    /*
     * POST
     * Creates a new message.
     *
     * Expected body:
     * {
     *   "username": "TEST USER",
     *   "content": "Hello!"
     * }
     */

    if (req.method === "POST") {
      const { username, content } = req.body || {};

      if (!username) {
        return res.status(400).json({
          error: "Missing username"
        });
      }

      if (content === undefined || content === null) {
        return res.status(400).json({
          error: "Missing content"
        });
      }

      if (typeof content !== "string") {
        return res.status(400).json({
          error: "Content must be text"
        });
      }

      if (content.trim().length === 0) {
        return res.status(400).json({
          error: "Message cannot be empty"
        });
      }

      const createdAt = new Date().toISOString();

      const response = await fetch(
        `${databaseUrl}/v2/pipeline`,
        {
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
                    INSERT INTO messages (
                      username,
                      content,
                      created_at
                    )
                    VALUES (?, ?, ?)
                  `,

                  args: [
                    {
                      type: "text",
                      value: username
                    },
                    {
                      type: "text",
                      value: content
                    },
                    {
                      type: "text",
                      value: createdAt
                    }
                  ]
                }
              },

              {
                type: "close"
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Turso error:", data);

        return res.status(500).json({
          error: "Failed to send message",
          details: data
        });
      }

      const result = data?.results?.[0];

      if (result?.type === "error") {
        console.error("Turso insert error:", result);

        return res.status(500).json({
          error: "Failed to insert message",
          details: result
        });
      }

      return res.status(201).json({
        success: true,
        message: {
          username: username,
          content: content,
          created_at: createdAt
        }
      });
    }

    // Anything other than GET/POST
    return res.status(405).json({
      error: "Method not allowed"
    });

  } catch (error) {
    console.error("Messages API error:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}
