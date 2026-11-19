// JavaScript source code


'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    explicaRecomandare,
    nivelCompatibilitate
} = require('../public/js/recommendationExplanations');

const {
    calculeazaScor
} = require('../services/recommendationService');

// Date demonstrative utilizate in teste
const genuri = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Mister' }
];

const teme = [
    { id: 1, name: 'Prietenie' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'Familie' }
];

const preferinte = {
    genres: [1, 2],
    themes: [1, 2],
    bookLength: 'medie'
};

function creeazaCarte(modificari = {}) {
    return {
        id: 1,
        title: 'Carte demonstrativa',
        author: 'Autor Test',
        genre_ids: [1, 2],
        theme_ids: [1, 2],
        pages: 300,
        ...modificari
    };
}

function genereazaExplicatie(carte, preferinteTest = preferinte) {
    const carteCuScor = calculeazaScor(carte, preferinteTest);

    return explicaRecomandare(
        carteCuScor,
        preferinteTest,
        genuri,
        teme
    );
}

// TEST 1 - Potrivire completa
test('F6 - explica potrivirea completa de 100 de puncte', () => {
    const explicatie = genereazaExplicatie(creeazaCarte());

    assert.equal(explicatie.scor, 100);
    assert.equal(explicatie.nivel, 'Foarte ridicată');

    assert.deepEqual(
        explicatie.potriviriGenuri,
        ['Fantasy', 'Romance']
    );

    assert.deepEqual(
        explicatie.potriviriTeme,
        ['Prietenie', 'Aventura']
    );

    assert.equal(explicatie.punctaje.genres, 50);
    assert.equal(explicatie.punctaje.themes, 30);
    assert.equal(explicatie.punctaje.bookLength, 20);
});

// TEST 2 - Potrivire partiala a genurilor
test('F6 - explica potrivirea partiala a genurilor', () => {
    const carte = creeazaCarte({
        genre_ids: [1]
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.genres, 25);

    assert.deepEqual(
        explicatie.potriviriGenuri,
        ['Fantasy']
    );

    assert.deepEqual(
        explicatie.lipsaGenuri,
        ['Romance']
    );

    assert.match(
        explicatie.explicatieGenuri,
        /Fantasy/
    );
});

// TEST 3 - Lipsa potrivirii temelor
test('F6 - identifica temele fara potrivire', () => {
    const carte = creeazaCarte({
        theme_ids: [3]
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.themes, 0);
    assert.deepEqual(explicatie.potriviriTeme, []);

    assert.deepEqual(
        explicatie.lipsaTeme,
        ['Prietenie', 'Aventura']
    );

    assert.match(
        explicatie.explicatieTeme,
        /Nicio temă/
    );
});

// TEST 4 - Lungime potrivita
test('F6 - explica lungimea potrivita a cartii', () => {
    const carte = creeazaCarte({
        pages: 350
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.bookLength, 20);

    assert.match(
        explicatie.explicatieLungime,
        /350 pagini/
    );

    assert.match(
        explicatie.explicatieLungime,
        /respectă lungimea preferată/
    );
});

// TEST 5 - Lungime nepotrivita
test('F6 - explica lungimea nepotrivita', () => {
    const carte = creeazaCarte({
        pages: 550
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.bookLength, 0);

    assert.match(
        explicatie.explicatieLungime,
        /550 pagini/
    );

    assert.match(
        explicatie.explicatieLungime,
        /nu se încadrează/
    );
});

// TEST 6 - Numar de pagini lipsa
test('F6 - trateaza lipsa numarului de pagini', () => {
    const carte = creeazaCarte({
        pages: null
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.bookLength, 0);

    assert.match(
        explicatie.explicatieLungime,
        /indisponibil sau invalid/
    );
});

// TEST 7 - Numar de pagini invalid
test('F6 - trateaza numarul de pagini invalid', () => {
    const carte = creeazaCarte({
        pages: -100
    });

    const explicatie = genereazaExplicatie(carte);

    assert.equal(explicatie.punctaje.bookLength, 0);

    assert.match(
        explicatie.explicatieLungime,
        /indisponibil sau invalid/
    );
});

// TEST 8 - Preferinta oricare
test('F6 - explica acordarea punctelor pentru orice lungime', () => {
    const preferinteOricare = {
        ...preferinte,
        bookLength: 'oricare'
    };

    const carte = creeazaCarte({
        pages: null
    });

    const explicatie = genereazaExplicatie(
        carte,
        preferinteOricare
    );

    assert.equal(explicatie.punctaje.bookLength, 20);

    assert.match(
        explicatie.explicatieLungime,
        /orice lungime/
    );
});

// TEST 9 - Niveluri de compatibilitate
test('F6 - clasifica corect nivelurile de compatibilitate', () => {
    assert.equal(nivelCompatibilitate(0), 'Redusă');
    assert.equal(nivelCompatibilitate(39.99), 'Redusă');

    assert.equal(nivelCompatibilitate(40), 'Moderată');
    assert.equal(nivelCompatibilitate(64.99), 'Moderată');

    assert.equal(nivelCompatibilitate(65), 'Ridicată');
    assert.equal(nivelCompatibilitate(84.99), 'Ridicată');

    assert.equal(nivelCompatibilitate(85), 'Foarte ridicată');
    assert.equal(nivelCompatibilitate(100), 'Foarte ridicată');
});

// TEST 10 - Concordanta dintre F5 si F6
test('F6 - punctajele explicate corespund algoritmului F5', () => {
    const carte = creeazaCarte({
        genre_ids: [1],
        theme_ids: [1],
        pages: 500
    });

    const rezultatF5 = calculeazaScor(carte, preferinte);

    const explicatieF6 = explicaRecomandare(
        rezultatF5,
        preferinte,
        genuri,
        teme
    );

    assert.equal(rezultatF5.score, 40);

    assert.equal(explicatieF6.punctaje.genres, 25);
    assert.equal(explicatieF6.punctaje.themes, 15);
    assert.equal(explicatieF6.punctaje.bookLength, 0);

    const suma =
        explicatieF6.punctaje.genres +
        explicatieF6.punctaje.themes +
        explicatieF6.punctaje.bookLength;

    assert.equal(suma, rezultatF5.score);
    assert.equal(explicatieF6.scor, rezultatF5.score);
});
