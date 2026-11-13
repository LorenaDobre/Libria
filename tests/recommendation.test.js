// JavaScript source code

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    calculeazaScor,
    valideazaPreferinte,
    genereazaRecomandari
} = require('../services/recommendationService');

const preferinte = {
    genres: [1, 2],
    themes: [3, 4],
    bookLength: 'medie'
};

function carte(id, genuri, teme, pagini) {
    return {
        id,
        title: `Carte ${id}`,
        author: 'Autor test',
        genre_ids: genuri,
        theme_ids: teme,
        pages: pagini
    };
}

test('Scor maxim de 100 de puncte', () => {
    const rezultat = calculeazaScor(
        carte(1, [1, 2], [3, 4], 300),
        preferinte
    );

    assert.equal(rezultat.score, 100);
    assert.equal(rezultat.scoreDetails.genres, 50);
    assert.equal(rezultat.scoreDetails.themes, 30);
    assert.equal(rezultat.scoreDetails.bookLength, 20);
});

test('Scor partial pentru un gen si o tema', () => {
    const rezultat = calculeazaScor(
        carte(2, [1], [3], 300),
        preferinte
    );

    // 25 pentru gen + 15 pentru tema + 20 pentru lungime
    assert.equal(rezultat.score, 60);
});

test('Nu acorda puncte pentru lungime nepotrivita', () => {
    const rezultat = calculeazaScor(
        carte(3, [1, 2], [3, 4], 600),
        preferinte
    );

    assert.equal(rezultat.score, 80);
});

test('Respinge preferintele incomplete', () => {
    assert.equal(
        valideazaPreferinte({
            genres: [],
            themes: [3],
            bookLength: 'medie'
        }),
        false
    );
});

test('Ordoneaza recomandarile descrescator', () => {
    const carti = [
        carte(1, [], [], 600),
        carte(2, [1], [3], 300),
        carte(3, [1, 2], [3, 4], 300)
    ];

    const rezultate = genereazaRecomandari(carti, preferinte);

    assert.deepEqual(
        rezultate.map(carte => carte.id),
        [3, 2, 1]
    );
});

test('Scorurile raman intre 0 si 100', () => {
    const carti = [
        carte(1, [], [], 100),
        carte(2, [1], [3], 300),
        carte(3, [1, 2], [3, 4], 500)
    ];

    const rezultate = genereazaRecomandari(carti, preferinte);

    assert.ok(
        rezultate.every(carte =>
            carte.score >= 0 && carte.score <= 100
        )
    );
});
