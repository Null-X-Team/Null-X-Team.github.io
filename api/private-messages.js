const { createClient } = require("@libsql/client");

function getDb() {
    let url = process.env.Turso_user_database || process.env.TURSO_DATABASE_URL || "";
    const authToken = process.env.Turso_auth_token || process.env.TURSO_AUTH_TOKEN || "";
    url = String(url).trim();
    if (!url || !authToken) {
        const err = new Error("Turso environment variables are missing");
        err.statusCode = 500;
        throw err;
    }
    return createClient({ url, authToken });
}

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const db = getDb();
        // GET private messages
        if (req.method === "GET") {
            const { sender_username, recipient_username } = req.query;

            if (!sender_username || !recipient_username) {
                return res.status(400).json({
                    error: "sender_username and recipient_username are required"
                });
            }

            const result = await db.execute({
                sql: `
                    SELECT *
                    FROM private_messages
                    WHERE
                        (sender_username = ? AND recipient_username = ?)
                        OR
                        (sender_username = ? AND recipient_username = ?)
                    ORDER BY created_at ASC
                `,
                args: [
                    sender_username,
                    recipient_username,
                    recipient_username,
                    sender_username
                ]
            });

            return res.status(200).json(result.rows);
        }

        // POST new private message
        if (req.method === "POST") {
            const {
                id,
                sender_username,
                recipient_username,
                content,
                is_read,
                created_at
            } = req.body;

            if (
                !id ||
                !sender_username ||
                !recipient_username ||
                !content
            ) {
                return res.status(400).json({
                    error: "id, sender_username, recipient_username, and content are required"
                });
            }

            await db.execute({
                sql: `
                    INSERT INTO private_messages
                    (
                        ID,
                        sender_username,
                        recipient_username,
                        content,
                        is_read,
                        created_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                `,
                args: [
                    id,
                    sender_username,
                    recipient_username,
                    content,
                    is_read ?? 0,
                    created_at ?? new Date().toISOString()
                ]
            });

            return res.status(201).json({
                success: true,
                message: "Private message sent"
            });
        }

        // PATCH = mark messages as read
        if (req.method === "PATCH") {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    UPDATE private_messages
                    SET is_read = 1
                    WHERE ID = ?
                `,
                args: [id]
            });

            return res.status(200).json({
                success: true,
                message: "Message marked as read"
            });
        }

        // DELETE private message
        if (req.method === "DELETE") {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    DELETE FROM private_messages
                    WHERE ID = ?
                `,
                args: [id]
            });

            return res.status(200).json({
                success: true,
                message: "Private message deleted"
            });
        }

        return res.status(405).json({
            error: "Method not allowed"
        });

    } catch (error) {
        console.error("Private messages API error:", error);

        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
