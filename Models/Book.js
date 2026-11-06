
const db = require('../config/database');

class Book {
    static async getAll() {
        const result = await db.query(`
            SELECT
                b.id,
                b.title,
                b.author,
                b.description,
                b.pages,
                b.cover_url,
                COALESCE(
                    STRING_AGG(DISTINCT g.name, ', '),
                    'Nespecificat'
                ) AS genres
            FROM books b
            LEFT JOIN book_genres bg ON bg.book_id = b.id
            LEFT JOIN genres g ON g.id = bg.genre_id
            WHERE b.is_active = TRUE
            GROUP BY b.id
            ORDER BY b.title
        `);

        return result.rows;
    }
}

module.exports = Book;
