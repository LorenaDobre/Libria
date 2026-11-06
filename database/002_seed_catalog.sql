
-- LIB-1: Date initiale pentru catalogul Libria
-- PostgreSQL

BEGIN;

INSERT INTO genres (name, description)
VALUES
    ('Fantasy', 'Lumi imaginare si elemente magice'),
    ('Science Fiction', 'Stiinta, tehnologie si viitor'),
    ('Romance', 'Relatii sentimentale'),
    ('Mister', 'Enigme si investigatii'),
    ('Clasic', 'Opere literare consacrate')
ON CONFLICT (name) DO NOTHING;

INSERT INTO themes (name, description)
VALUES
    ('Prietenie', 'Relatii de prietenie'),
    ('Aventura', 'Calatorii si experiente neobisnuite'),
    ('Dragoste', 'Relatii romantice'),
    ('Identitate', 'Descoperirea propriei identitati'),
    ('Supravietuire', 'Depasirea situatiilor dificile')
ON CONFLICT (name) DO NOTHING;

INSERT INTO books
    (title, author, description, publication_year, pages)
VALUES
    ('Harry Potter si Piatra Filosofala',
     'J.K. Rowling',
     'Un tanar vrajitor descopera lumea magiei.',
     1997, 320),

    ('Dune',
     'Frank Herbert',
     'O poveste despre putere si supravietuire pe planeta Arrakis.',
     1965, 544),

    ('Mandrie si prejudecata',
     'Jane Austen',
     'O poveste despre dragoste, familie si prejudecati sociale.',
     1813, 432),

    ('Crima din Orient Express',
     'Agatha Christie',
     'Hercule Poirot investigheaza o crima intr-un tren.',
     1934, 256),

    ('Hobbitul',
     'J.R.R. Tolkien',
     'Bilbo Baggins porneste intr-o aventura neasteptata.',
     1937, 310)
ON CONFLICT (title, author) DO NOTHING;

INSERT INTO book_genres (book_id, genre_id)
SELECT b.id, g.id
FROM books b
JOIN genres g ON
    (b.title = 'Harry Potter si Piatra Filosofala' AND g.name = 'Fantasy')
    OR (b.title = 'Dune' AND g.name = 'Science Fiction')
    OR (b.title = 'Mandrie si prejudecata' AND g.name = 'Clasic')
    OR (b.title = 'Crima din Orient Express' AND g.name = 'Mister')
    OR (b.title = 'Hobbitul' AND g.name = 'Fantasy')
WHERE b.author IN (
    'J.K. Rowling', 'Frank Herbert', 'Jane Austen',
    'Agatha Christie', 'J.R.R. Tolkien'
)
ON CONFLICT DO NOTHING;

INSERT INTO book_themes (book_id, theme_id)
SELECT b.id, t.id
FROM books b
JOIN themes t ON
    (b.title = 'Harry Potter si Piatra Filosofala' AND t.name = 'Prietenie')
    OR (b.title = 'Dune' AND t.name = 'Supravietuire')
    OR (b.title = 'Mandrie si prejudecata' AND t.name = 'Dragoste')
    OR (b.title = 'Crima din Orient Express' AND t.name = 'Identitate')
    OR (b.title = 'Hobbitul' AND t.name = 'Aventura')
WHERE b.author IN (
    'J.K. Rowling', 'Frank Herbert', 'Jane Austen',
    'Agatha Christie', 'J.R.R. Tolkien'
)
ON CONFLICT DO NOTHING;

COMMIT;
