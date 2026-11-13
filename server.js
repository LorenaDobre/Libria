
require('dotenv').config();

const express = require('express');
const path = require('path');
const Book = require('./models/Book');
const Genre = require('./models/Genre');
const Theme = require('./models/Theme');

const db = require('./config/database');
const {
    valideazaPreferinte,
    genereazaRecomandari
} = require('./services/recommendationService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verificarea functionarii serverului
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        aplicatie: 'Libria'
    });
});

// F1 - Afisarea tuturor cartilor
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.getAll();
        res.json(books);
    } catch (error) {
        console.error(
            'Eroare la incarcarea cartilor:',
            error.message
        );

        res.status(500).json({
            error: 'Nu s-a putut incarca catalogul.'
        });
    }
});

// F2 - Detaliile unei carti selectate
app.get('/api/books/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'Identificatorul cartii este invalid.'
            });
        }

        const book = await Book.getById(id);

        if (!book) {
            return res.status(404).json({
                error: 'Cartea nu a fost gasita.'
            });
        }

        res.json(book);
    } catch (error) {
        console.error(
            'Eroare la incarcarea detaliilor cartii:',
            error.message
        );

        res.status(500).json({
            error: 'Nu s-au putut incarca detaliile cartii.'
        });
    }
});

// F3 - Preluarea genurilor literare pentru filtrare
app.get('/api/genres', async (req, res) => {
    try {
        const genres = await Genre.getAll();
        res.json(genres);
    } catch (error) {
        console.error(
            'Eroare la incarcarea genurilor:',
            error.message
        );

        res.status(500).json({
            error: 'Nu s-au putut incarca genurile literare.'
        });
    }
});

// F4 - Preluarea temelor literare pentru chestionar
app.get('/api/themes', async (req, res) => {
    try {
        const themes = await Theme.getAll();
        res.json(themes);
    } catch (error) {
        console.error(
            'Eroare la incarcarea temelor:',
            error.message
        );

        res.status(500).json({
            error: 'Nu s-au putut incarca temele literare.'
        });
    }
});


app.post('/api/recommendations', async (req, res) => {
    const preferinte = req.body;

    if (!valideazaPreferinte(preferinte)) {
        return res.status(400).json({
            error: 'Selecteaza cel putin un gen, o tema si lungimea cartilor.'
        });
    }

    try {
        const rezultat = await db.query(`
            SELECT
                b.*,
                COALESCE((
                    SELECT json_agg(bg.genre_id)
                    FROM book_genres bg
                    WHERE bg.book_id = b.id
                ), '[]'::json) AS genre_ids,
                COALESCE((
                    SELECT json_agg(bt.theme_id)
                    FROM book_themes bt
                    WHERE bt.book_id = b.id
                ), '[]'::json) AS theme_ids
            FROM books b
            WHERE b.is_active = TRUE
        `);

        const carti = rezultat.rows.map(carte => ({
            ...carte,
            genre_ids: carte.genre_ids.map(Number),
            theme_ids: carte.theme_ids.map(Number)
        }));

        // Verificam si daca ID-urile trimise exista in baza de date.
        const [genuri, teme] = await Promise.all([
            db.query('SELECT id FROM genres'),
            db.query('SELECT id FROM themes')
        ]);

        const idGenuri = new Set(genuri.rows.map(g => Number(g.id)));
        const idTeme = new Set(teme.rows.map(t => Number(t.id)));

        const valide =
            preferinte.genres.every(id => idGenuri.has(id)) &&
            preferinte.themes.every(id => idTeme.has(id));

        if (!valide) {
            return res.status(400).json({
                error: 'Genurile sau temele selectate nu sunt valide.'
            });
        }

        const recomandari = genereazaRecomandari(
            carti,
            preferinte
        );

        res.json(recomandari);

    } catch (eroare) {
        console.error('Eroare recomandari:', eroare);

        res.status(500).json({
            error: 'Nu s-au putut genera recomandarile.'
        });
    }
});


app.listen(PORT, () => {
    console.log(
        `Libria ruleaza la http://localhost:${PORT}`
    );
});
