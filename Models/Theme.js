// JavaScript source code

const db = require('../config/database');

class Theme {
    static async getAll() {
        const result = await db.query(`
            SELECT id, name
            FROM themes
            ORDER BY name ASC
        `);

        return result.rows;
    }
}

module.exports = Theme;
