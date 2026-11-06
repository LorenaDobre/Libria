
require('dotenv').config();

const express = require('express');
const path = require('path');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurarea aplicatiei
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verificarea functionarii serverului
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        aplicatie: 'Libria'
    });
});

// LIB-1 / F1 - Consultarea catalogului de carti
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

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Libria ruleaza la http://localhost:${PORT}`);
});
