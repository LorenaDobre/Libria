
const db = require('../config/database');

class Book {
    // F1 - Toate cartile din catalog
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

    // F2 - Informatiile complete ale unei carti
    static async getById(id) {
        const result = await db.query(`
            SELECT
                b.id,
                b.title,
                b.author,
                b.description,
                b.publication_year,
                b.pages,
                b.cover_url,
                COALESCE(
                    (
                        SELECT STRING_AGG(g.name, ', ' ORDER BY g.name)
                        FROM book_genres bg
                        JOIN genres g ON g.id = bg.genre_id
                        WHERE bg.book_id = b.id
                    ),
                    'Nespecificat'
                ) AS genres,
                COALESCE(
                    (
                        SELECT STRING_AGG(t.name, ', ' ORDER BY t.name)
                        FROM book_themes bt
                        JOIN themes t ON t.id = bt.theme_id
                        WHERE bt.book_id = b.id
                    ),
                    'Nespecificat'
                ) AS themes
            FROM books b
            WHERE b.id = $1
              AND b.is_active = TRUE
        `, [id]);

        return result.rows[0] || null;
    }
}

module.exports = Book;
