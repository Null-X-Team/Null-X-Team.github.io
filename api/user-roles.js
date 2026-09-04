// API/user-roles.js

const { createClient } = require("@libsql/client");

const db = createClient({
    url: process.env.Turso_user_database,
    authToken: process.env.Turso_auth_token
});

module.exports = async (req, res) => {
    try {
        // GET user roles / moderation information
        if (req.method === "GET") {
            const { username, id } = req.query;

            if (id !== undefined) {
                const result = await db.execute({
                    sql: `
                        SELECT *
                        FROM user_roles
                        WHERE id = ?
                    `,
                    args: [id]
                });

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: "User role record not found"
                    });
                }

                return res.status(200).json(result.rows[0]);
            }

            if (username) {
                const result = await db.execute({
                    sql: `
                        SELECT *
                        FROM user_roles
                        WHERE username = ?
                    `,
                    args: [username]
                });

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: "User role record not found"
                    });
                }

                return res.status(200).json(result.rows[0]);
            }

            const result = await db.execute({
                sql: `
                    SELECT *
                    FROM user_roles
                    ORDER BY id ASC
                `
            });

            return res.status(200).json(result.rows);
        }

        // POST = create a user role record
        if (req.method === "POST") {
            const {
                id,
                username,
                is_banned,
                temp_ban_until,
                last_action_reason,
                last_action_category,
                role_tag,
                pfp_url,
                is_admin,
                last_seen,
                bio,
                warn_id,
                warning_count,
                last_action_type
            } = req.body;

            if (id === undefined || !username) {
                return res.status(400).json({
                    error: "id and username are required"
                });
            }

            await db.execute({
                sql: `
                    INSERT INTO user_roles (
                        id,
                        username,
                        is_banned,
                        temp_ban_until,
                        last_action_reason,
                        last_action_category,
                        role_tag,
                        pfp_url,
                        is_admin,
                        last_seen,
                        bio,
                        warn_id,
                        warning_count,
                        last_action_type
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                args: [
                    id,
                    username,
                    is_banned ?? 0,
                    temp_ban_until ?? null,
                    last_action_reason ?? null,
                    last_action_category ?? null,
                    role_tag ?? "User",
                    pfp_url ?? null,
                    is_admin ?? 0,
                    last_seen ?? new Date().toISOString(),
                    bio ?? null,
                    warn_id ?? 0,
                    warning_count ?? 0,
                    last_action_type ?? null
                ]
            });

            return res.status(201).json({
                success: true,
                message: "User role record created"
            });
        }

        // PATCH = update user role / moderation information
        if (req.method === "PATCH") {
            const {
                id,
                username,
                is_banned,
                temp_ban_until,
                last_action_reason,
                last_action_category,
                role_tag,
                pfp_url,
                is_admin,
                last_seen,
                bio,
                warn_id,
                warning_count,
                last_action_type
            } = req.body;

            if (id === undefined) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    UPDATE user_roles
                    SET
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
                    WHERE id = ?
                `,
                args: [
                    username ?? null,
                    is_banned ?? null,
                    temp_ban_until ?? null,
                    last_action_reason ?? null,
                    last_action_category ?? null,
                    role_tag ?? null,
                    pfp_url ?? null,
                    is_admin ?? null,
                    last_seen ?? null,
                    bio ?? null,
                    warn_id ?? null,
                    warning_count ?? null,
                    last_action_type ?? null,
                    id
                ]
            });

            return res.status(200).json({
                success: true,
                message: "User role record updated"
            });
        }

        // DELETE = delete user role record
        if (req.method === "DELETE") {
            const { id } = req.body;

            if (id === undefined) {
                return res.status(400).json({
                    error: "id is required"
                });
            }

            await db.execute({
                sql: `
                    DELETE FROM user_roles
                    WHERE id = ?
                `,
                args: [id]
            });

            return res.status(200).json({
                success: true,
                message: "User role record deleted"
            });
        }

        return res.status(405).json({
            error: "Method not allowed"
        });

    } catch (error) {
        console.error("User roles API error:", error);

        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
