
const db = require('../config/database');

class Genre {
    static async getAll() {
        const result = await db.query(`
            SELECT id, name
            FROM genres
            ORDER BY name ASC
        `);

        return result.rows;
    }
}

module.exports = Genre;
