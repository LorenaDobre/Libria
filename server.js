
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'libria_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', aplicatie: 'Libria' });
});

// LIB-1 / F1 - Consultarea catalogului de carti
app.get('/api/books', async (req, res) => {
    try {
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

        res.json(result.rows);
    } catch (error) {
        console.error('Eroare PostgreSQL:', error.message);
        res.status(500).json({
            error: 'Nu s-a putut incarca catalogul.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Libria ruleaza la http://localhost:${PORT}`);
});
