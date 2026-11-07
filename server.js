
require('dotenv').config();

const express = require('express');
const path = require('path');
const Book = require('./models/Book');

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

app.listen(PORT, () => {
    console.log(
        `Libria ruleaza la http://localhost:${PORT}`
    );
});
