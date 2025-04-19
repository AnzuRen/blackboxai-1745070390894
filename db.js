const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./organisasi.db');

// Initialize database tables
function initDB() {
    db.serialize(() => {
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT CHECK(role IN ('administrator', 'bendahara', 'anggota')) NOT NULL,
            name TEXT NOT NULL,
            class TEXT NOT NULL
        )`);

        // Create members table
        db.run(`CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class TEXT NOT NULL
        )`);

        // Create payments table
        db.run(`CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            member_id INTEGER NOT NULL,
            week INTEGER NOT NULL,
            month INTEGER NOT NULL,
            year INTEGER NOT NULL,
            paid INTEGER DEFAULT 0,
            FOREIGN KEY (member_id) REFERENCES members(id)
        )`);

        // Create announcements table
        db.run(`CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create sessions table
        db.run(`CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);
    });
}

module.exports = { db, initDB };
