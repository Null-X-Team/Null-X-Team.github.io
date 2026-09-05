// API/users.js

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
    // @libsql/client accepts both libsql:// and https://
    return createClient({ url, authToken });
}

module.exports = async (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const db = getDb();
        // GET users
        if (req.method === "GET") {
            const { username, id } = req.query;

            // Get a specific user by ID
            if (id) {
                const result = await db.execute({
                    sql: `
                        SELECT id, created_at, username, password, handler
                        FROM users
                        WHERE id = ?
                    `,
                    args: [id]
                });

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: "User not found"
                    });
                }

                return res.status(200).json(result.rows[0]);
            }

            // Get a specific user by username
            if (username) {
                const result = await db.execute({
                    sql: `
                        SELECT id, created_at, username, password, handler
                        FROM users
                        WHERE username = ?
                    `,
                    args: [username]
                });

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: "User not found"
                    });
                }

                return res.status(200).json(result.rows[0]);
            }

            // Get all users
            const result = await db.execute({
                sql: `
                    SELECT id, created_at, username, password, handler
                    FROM users
                    ORDER BY id ASC
                `
            });

            return res.status(200).json(result.rows);
        }

        // POST = create a user
        if (req.method === "POST") {
            const {
                id,
                created_at,
                username,
                password,
                handler
            } = req.body;

            if (
                id === undefined ||
                !username ||
                !password
            ) {
                return res.status(400).json({
                    error: "id, username, and password are required"
                });
            }

            await db.execute({
                sql: `
                    INSERT INTO users
                    (
                        id,
                        created_at,
                        username,
                        password,
                        handler
                    )
                    VALUES (?, ?, ?, ?, ?)
                `,
                args: [
                    id,
                    created_at ?? new Date().toISOString(),
                    username,
                    password,
                    handler ?? null
                ]
            });

            return res.status(201).json({
                success: true,
                message: "User created"
            });
        }

        // PATCH = update a user
        if (req.method === "PATCH") {
            const {
                id,
                created_at,
                username,
                password,
                handler
            } = req.body;

            if (id === undefined) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    UPDATE users
                    SET
                        created_at = COALESCE(?, created_at),
                        username = COALESCE(?, username),
                        password = COALESCE(?, password),
                        handler = COALESCE(?, handler)
                    WHERE id = ?
                `,
                args: [
                    created_at ?? null,
                    username ?? null,
                    password ?? null,
                    handler ?? null,
                    id
                ]
            });

            return res.status(200).json({
                success: true,
                message: "User updated"
            });
        }

        // DELETE = delete a user
        if (req.method === "DELETE") {
            const { id } = req.body;

            if (id === undefined) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    DELETE FROM users
                    WHERE id = ?
                `,
                args: [id]
            });

            return res.status(200).json({
                success: true,
                message: "User deleted"
            });
        }

        return res.status(405).json({
            error: "Method not allowed"
        });

    } catch (error) {
        console.error("Users API error:", error);

        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
