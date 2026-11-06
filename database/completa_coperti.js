
require('dotenv').config();

const db = require('../config/database');

// Titlurile originale ale cartilor traduse
const titluriOriginale = {
    'Harry Potter si Piatra Filosofala': "Harry Potter and the Philosopher's Stone",
    'Mandrie si prejudecata': 'Pride and Prejudice',
    'Crima din Orient Express': 'Murder on the Orient Express',
    'Hobbitul': 'The Hobbit',
    'Ferma animalelor': 'Animal Farm',
    'Jocurile foamei': 'The Hunger Games',
    'Sfidarea': 'Catching Fire',
    'Revolta': 'Mockingjay',
    'Fratia inelului': 'The Fellowship of the Ring',
    'Cele doua turnuri': 'The Two Towers',
    'Intoarcerea regelui': 'The Return of the King',
    'Leul, vrajitoarea si dulapul': 'The Lion, the Witch and the Wardrobe',
    'Percy Jackson si hotul fulgerului': 'The Lightning Thief',
    'Micul print': 'The Little Prince',
    'Alchimistul': 'The Alchemist',
    'Hotul de carti': 'The Book Thief',
    'Jurnalul Annei Frank': 'The Diary of a Young Girl',
    'Sa ucizi o pasare cantatoare': 'To Kill a Mockingbird',
    'Marele Gatsby': 'The Great Gatsby',
    'La rascruce de vanturi': 'Wuthering Heights',
    'Razboi si pace': 'War and Peace',
    'Crima si pedeapsa': 'Crime and Punishment',
    'Stralucirea': 'The Shining',
    'Codul lui Da Vinci': 'The Da Vinci Code',
    'Ingeri si demoni': 'Angels and Demons',
    'Fata din tren': 'The Girl on the Train',
    'Fata disparuta': 'Gone Girl',
    'Pacienta tacuta': 'The Silent Patient',
    'De veghe in lanul de secara': 'The Catcher in the Rye',
    'Un veac de singuratate': 'One Hundred Years of Solitude'
};

function normalizeaza(text) {
    return String(text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

function autorCompatibil(autorLocal, autoriOpenLibrary) {
    const local = normalizeaza(autorLocal);

    return autoriOpenLibrary.some(autor => {
        const extern = normalizeaza(autor);

        return extern === local ||
            extern.includes(local) ||
            local.includes(extern);
    });
}

function asteapta(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cautaCoperta(carte) {
    const titlu = titluriOriginale[carte.title] || carte.title;

    const parametri = new URLSearchParams({
        title: titlu,
        author: carte.author,
        fields: 'title,author_name,cover_i',
        limit: '10'
    });

    const url = 'https://openlibrary.org/search.json?' +
        parametri.toString();

    const raspuns = await fetch(url);

    if (!raspuns.ok) {
        throw new Error('Open Library HTTP ' + raspuns.status);
    }

    const date = await raspuns.json();

    const rezultat = (date.docs || []).find(document => {
        const titluCorect =
            normalizeaza(document.title) === normalizeaza(titlu);

        const autorCorect = autorCompatibil(
            carte.author,
            document.author_name || []
        );

        return titluCorect &&
            autorCorect &&
            Number.isInteger(document.cover_i) &&
            document.cover_i > 0;
    });

    if (!rezultat) {
        return null;
    }

    return 'https://covers.openlibrary.org/b/id/' +
        rezultat.cover_i +
        '-L.jpg?default=false';
}

async function completeazaCopertile() {
    try {
        const rezultat = await db.query(`
            SELECT id, title, author
            FROM books
            WHERE is_active = TRUE
              AND (cover_url IS NULL OR cover_url = '')
            ORDER BY title
        `);

        console.log(
            'Carti fara coperta:',
            rezultat.rows.length
        );

        let actualizate = 0;
        let negasite = 0;

        for (const carte of rezultat.rows) {
            try {
                const urlCoperta = await cautaCoperta(carte);

                if (urlCoperta) {
                    await db.query(`
                        UPDATE books
                        SET cover_url = $1,
                            updated_at = NOW()
                        WHERE id = $2
                    `, [urlCoperta, carte.id]);

                    actualizate++;
                    console.log('OK:', carte.title);
                } else {
                    negasite++;
                    console.log('NEIDENTIFICATA:', carte.title);
                }
            } catch (eroare) {
                negasite++;
                console.log(
                    'EROARE:',
                    carte.title,
                    '-',
                    eroare.message
                );
            }

            // Evitam solicitarea prea rapida a serviciului.
            await asteapta(1200);
        }

        console.log('\nRezultat:');
        console.log('Coperți adăugate:', actualizate);
        console.log('Cărți rămase:', negasite);
    } finally {
        await db.end();
    }
}

completeazaCopertile().catch(eroare => {
    console.error('Eroare:', eroare.message);
    process.exitCode = 1;
});
