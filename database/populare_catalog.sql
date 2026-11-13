
-- LIB-1 / F1 - Popularea catalogului Libria
-- Se pastreaza cele 5 carti existente.
-- Se adauga 35 de carti noi.

BEGIN;

-- 1. Genuri literare
INSERT INTO genres (name) VALUES
('Fantasy'),
('Science Fiction'),
('Clasic'),
('Thriller'),
('Istoric'),
('Aventura'),
('Distopie'),
('Fictiune contemporana'),
('Horror'),
('Dezvoltare personala'),
('Non-fictiune'),
('Romance'),
('Mister')
ON CONFLICT (name) DO NOTHING;

-- 2. Teme literare
INSERT INTO themes (name) VALUES
('Familie'),
('Curaj'),
('Libertate'),
('Putere'),
('Mister'),
('Razboi'),
('Magie'),
('Societate'),
('Cunoastere'),
('Tradare'),
('Supravietuire'),
('Prietenie'),
('Identitate'),
('Dragoste'),
('Aventura')
ON CONFLICT (name) DO NOTHING;

-- 3. Carti
INSERT INTO books
    (title, author, description, publication_year, pages)
VALUES
('Harry Potter si Piatra Filosofala', 'J.K. Rowling',
 'Un tanar vrajitor descopera lumea magiei.', 1997, 320),

('Dune', 'Frank Herbert',
 'O poveste despre putere si supravietuire pe planeta Arrakis.', 1965, 544),

('Mandrie si prejudecata', 'Jane Austen',
 'O poveste despre dragoste, familie si prejudecati sociale.', 1813, 432),

('Crima din Orient Express', 'Agatha Christie',
 'Hercule Poirot investigheaza o crima intr-un tren.', 1934, 256),

('Hobbitul', 'J.R.R. Tolkien',
 'Bilbo Baggins porneste intr-o aventura neasteptata.', 1937, 310),

('1984', 'George Orwell',
 'Un roman despre supraveghere si controlul societatii.', 1949, 328),

('Ferma animalelor', 'George Orwell',
 'O alegorie despre putere si manipulare.', 1945, 144),

('Fahrenheit 451', 'Ray Bradbury',
 'Intr-o lume distopica, cartile sunt interzise.', 1953, 249),

('Jocurile foamei', 'Suzanne Collins',
 'O adolescenta participa la o competitie pentru supravietuire.', 2008, 374),

('Sfidarea', 'Suzanne Collins',
 'Katniss devine simbolul unei revolte.', 2009, 391),

('Revolta', 'Suzanne Collins',
 'Lupta impotriva Capitoliului ajunge la final.', 2010, 390),

('Fratia inelului', 'J.R.R. Tolkien',
 'O calatorie pentru distrugerea unui inel periculos.', 1954, 423),

('Cele doua turnuri', 'J.R.R. Tolkien',
 'Aventura continua in Pamantul de Mijloc.', 1954, 352),

('Intoarcerea regelui', 'J.R.R. Tolkien',
 'Batalia finala pentru Pamantul de Mijloc.', 1955, 416),

('Leul, vrajitoarea si dulapul', 'C.S. Lewis',
 'Patru copii descopera lumea magica Narnia.', 1950, 208),

('Percy Jackson si hotul fulgerului', 'Rick Riordan',
 'Un adolescent descopera lumea zeilor greci.', 2005, 377),

('Micul print', 'Antoine de Saint-Exupery',
 'O poveste despre prietenie si sensul vietii.', 1943, 96),

('Alchimistul', 'Paulo Coelho',
 'Un tanar porneste in cautarea propriului destin.', 1988, 208),

('Hotul de carti', 'Markus Zusak',
 'O fata descopera puterea lecturii in timpul razboiului.', 2005, 552),

('Jurnalul Annei Frank', 'Anne Frank',
 'Marturia unei adolescente in timpul celui de-al Doilea Razboi Mondial.', 1947, 283),

('Sa ucizi o pasare cantatoare', 'Harper Lee',
 'O poveste despre dreptate si prejudecati.', 1960, 281),

('Marele Gatsby', 'F. Scott Fitzgerald',
 'O poveste despre iubire si visul american.', 1925, 180),

('Jane Eyre', 'Charlotte Bronte',
 'O tanara isi cauta independenta si iubirea.', 1847, 532),

('La rascruce de vanturi', 'Emily Bronte',
 'O poveste despre pasiune si razbunare.', 1847, 416),

('Anna Karenina', 'Lev Tolstoi',
 'O drama despre dragoste si societate.', 1878, 864),

('Razboi si pace', 'Lev Tolstoi',
 'Destine personale in timpul razboaielor napoleoniene.', 1869, 1225),

('Crima si pedeapsa', 'F.M. Dostoievski',
 'Un student se confrunta cu vina si moralitatea.', 1866, 671),

('Frankenstein', 'Mary Shelley',
 'Un experiment stiintific are urmari tragice.', 1818, 280),

('Dracula', 'Bram Stoker',
 'O poveste gotica despre un vampir misterios.', 1897, 418),

('Stralucirea', 'Stephen King',
 'O familie este izolata intr-un hotel infricosator.', 1977, 447),

('Codul lui Da Vinci', 'Dan Brown',
 'O investigatie plina de simboluri si secrete.', 2003, 489),

('Ingeri si demoni', 'Dan Brown',
 'Un mister care implica stiinta si religia.', 2000, 616),

('Fata din tren', 'Paula Hawkins',
 'O femeie devine implicata intr-un mister.', 2015, 336),

('Fata disparuta', 'Gillian Flynn',
 'Disparitia unei femei dezvaluie secrete.', 2012, 432),

('Pacienta tacuta', 'Alex Michaelides',
 'Un psihoterapeut investigheaza tacerea unei paciente.', 2019, 336),

('Sapiens', 'Yuval Noah Harari',
 'O prezentare a istoriei umanitatii.', 2011, 443),

('Atomic Habits', 'James Clear',
 'Strategii pentru construirea obiceiurilor bune.', 2018, 320),

('De veghe in lanul de secara', 'J.D. Salinger',
 'Un adolescent isi cauta locul in lume.', 1951, 277),

('Un veac de singuratate', 'Gabriel Garcia Marquez',
 'Istoria unei familii intr-un oras imaginar.', 1967, 417),

('Divergent', 'Veronica Roth',
 'O tanara contesta regulile unei societati impartite in factiuni.', 2011, 487)
ON CONFLICT (title, author) DO NOTHING;

-- 4. Asocierea cartilor cu genurile
INSERT INTO book_genres (book_id, genre_id)
SELECT b.id, g.id
FROM books b
JOIN (
    VALUES
    ('1984', 'Distopie'),
    ('Ferma animalelor', 'Distopie'),
    ('Fahrenheit 451', 'Science Fiction'),
    ('Jocurile foamei', 'Distopie'),
    ('Sfidarea', 'Distopie'),
    ('Revolta', 'Distopie'),
    ('Fratia inelului', 'Fantasy'),
    ('Cele doua turnuri', 'Fantasy'),
    ('Intoarcerea regelui', 'Fantasy'),
    ('Leul, vrajitoarea si dulapul', 'Fantasy'),
    ('Percy Jackson si hotul fulgerului', 'Fantasy'),
    ('Micul print', 'Clasic'),
    ('Alchimistul', 'Fictiune contemporana'),
    ('Hotul de carti', 'Istoric'),
    ('Jurnalul Annei Frank', 'Istoric'),
    ('Sa ucizi o pasare cantatoare', 'Clasic'),
    ('Marele Gatsby', 'Clasic'),
    ('Jane Eyre', 'Clasic'),
    ('La rascruce de vanturi', 'Clasic'),
    ('Anna Karenina', 'Clasic'),
    ('Razboi si pace', 'Istoric'),
    ('Crima si pedeapsa', 'Clasic'),
    ('Frankenstein', 'Horror'),
    ('Dracula', 'Horror'),
    ('Stralucirea', 'Horror'),
    ('Codul lui Da Vinci', 'Thriller'),
    ('Ingeri si demoni', 'Thriller'),
    ('Fata din tren', 'Thriller'),
    ('Fata disparuta', 'Thriller'),
    ('Pacienta tacuta', 'Thriller'),
    ('Sapiens', 'Non-fictiune'),
    ('Atomic Habits', 'Dezvoltare personala'),
    ('De veghe in lanul de secara', 'Clasic'),
    ('Un veac de singuratate', 'Clasic'),
    ('Divergent', 'Distopie'),
    ('Fratia inelului', 'Aventura'),
    ('Cele doua turnuri', 'Aventura'),
    ('Intoarcerea regelui', 'Aventura'),
    ('Leul, vrajitoarea si dulapul', 'Aventura'),
    ('Percy Jackson si hotul fulgerului', 'Aventura'),
    ('Jane Eyre', 'Romance'),
    ('La rascruce de vanturi', 'Romance'),
    ('Anna Karenina', 'Romance'),
    ('Marele Gatsby', 'Romance')
) AS asociere(titlu, gen)
    ON b.title = asociere.titlu
JOIN genres g ON g.name = asociere.gen
ON CONFLICT DO NOTHING;

-- 5. Asocierea cartilor cu temele
INSERT INTO book_themes (book_id, theme_id)
SELECT b.id, t.id
FROM books b
JOIN (
    VALUES
    ('1984', 'Libertate'),
    ('Ferma animalelor', 'Putere'),
    ('Fahrenheit 451', 'Cunoastere'),
    ('Jocurile foamei', 'Supravietuire'),
    ('Sfidarea', 'Curaj'),
    ('Revolta', 'Libertate'),
    ('Fratia inelului', 'Prietenie'),
    ('Cele doua turnuri', 'Curaj'),
    ('Intoarcerea regelui', 'Prietenie'),
    ('Leul, vrajitoarea si dulapul', 'Magie'),
    ('Percy Jackson si hotul fulgerului', 'Aventura'),
    ('Micul print', 'Prietenie'),
    ('Alchimistul', 'Identitate'),
    ('Hotul de carti', 'Razboi'),
    ('Jurnalul Annei Frank', 'Supravietuire'),
    ('Sa ucizi o pasare cantatoare', 'Societate'),
    ('Marele Gatsby', 'Dragoste'),
    ('Jane Eyre', 'Identitate'),
    ('La rascruce de vanturi', 'Dragoste'),
    ('Anna Karenina', 'Dragoste'),
    ('Razboi si pace', 'Razboi'),
    ('Crima si pedeapsa', 'Identitate'),
    ('Frankenstein', 'Cunoastere'),
    ('Dracula', 'Mister'),
    ('Stralucirea', 'Supravietuire'),
    ('Codul lui Da Vinci', 'Mister'),
    ('Ingeri si demoni', 'Mister'),
    ('Fata din tren', 'Mister'),
    ('Fata disparuta', 'Tradare'),
    ('Pacienta tacuta', 'Mister'),
    ('Sapiens', 'Cunoastere'),
    ('Atomic Habits', 'Cunoastere'),
    ('De veghe in lanul de secara', 'Identitate'),
    ('Un veac de singuratate', 'Familie'),
    ('Divergent', 'Identitate')
) AS asociere(titlu, tema)
    ON b.title = asociere.titlu
JOIN themes t ON t.name = asociere.tema
ON CONFLICT DO NOTHING;

COMMIT;
