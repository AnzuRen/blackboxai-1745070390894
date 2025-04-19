const { db } = require('./db');
const crypto = require('crypto');

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

async function createSession(userId) {
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    await db.run(
        'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt]
    );
    return token;
}

async function validateSession(token) {
    const session = await db.get(
        'SELECT * FROM sessions WHERE token = ? AND expires_at > datetime("now")',
        [token]
    );
    return session ? session.user_id : null;
}

async function deleteSession(token) {
    await db.run('DELETE FROM sessions WHERE token = ?', [token]);
}

module.exports = { createSession, validateSession, deleteSession };
