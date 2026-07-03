// /api/login.js
import { createHash } from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    // Hash the incoming password
    const typedHash = createHash('sha256').update(password).digest('hex');

    // Pull the secret hash safely from Vercel's environment variables
    const MASTER_HASH = process.env.MY_SECRET_MASTER_HASH;

    // Check if the variable exists and matches
    if (MASTER_HASH && typedHash === MASTER_HASH) {
        return res.status(200).json({ 
            success: true, 
            username: username || "Admin",
            message: "Master Override Triggered!" 
        });
    }

    return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
