const { db } = require('./db');

function checkUsers() {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
        } else {
            console.log('Users in the database:');
            rows.forEach((row) => {
                console.log(`Username: ${row.username}, Role: ${row.role}, Name: ${row.name}`);
            });
        }
        process.exit();
    });
}

checkUsers();
