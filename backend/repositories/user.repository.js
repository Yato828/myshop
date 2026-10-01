const db = require('../dao/db');

const UserRepository = {
    async initTable() {
        await db.execute(
            `CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'user'
            )`
        );
    },
    async addUser (user) {
        const [result] = await db.execute(
            `INSERT INTO Users 
            (name, password, role) 
            VALUES (?, ?, ?)`,
            [user.name, user.password, user.role || 'user']
        );
        return (result.insertId);
    },
    async isUser(user) {
        const [rows] = await db.execute(
            'SELECT * FROM Users WHERE name = ?', 
            [user.name]
        );

        if (rows.length === 0) return null;
        return rows[0];
    },
    async getRole(user) {
        const [rows] = await db.execute(
            "SELECT role FROM Users WHERE name = ?",
            [user.name]
        )       
        return rows[0]?.role || null;
    }
}

module.exports = UserRepository ;
