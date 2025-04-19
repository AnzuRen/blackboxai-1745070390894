const { db } = require('./db');

function createAdmin() {
    db.run(
        `INSERT INTO users (username, password, role, name, class)
         VALUES (?, ?, ?, ?, ?)`,
        [
            'admin',
            'admin123', // In production, you should hash passwords
            'administrator',
            'Admin',
            'Admin'
        ],
        function(err) {
            if (err) {
                console.error('Error creating admin user:', err);
            } else {
                console.log('Admin user created successfully!');
                console.log('Username: admin');
                console.log('Password: admin123');
            }
            process.exit();
        }
    );
}

createAdmin();
