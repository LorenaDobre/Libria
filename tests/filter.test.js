
const test = require('node:test');
const assert = require('node:assert/strict');

const { filtreazaCarti } = require('../public/js/bookFilters');

const carti = [
    {
        id: 1,
        title: 'Hobbitul',
        author: 'J.R.R. Tolkien',
        genres: 'Fantasy, Aventură',
        pages: 310
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        genres: 'Distopie, Science Fiction',
        pages: 328
    },
    {
        id: 3,
        title: 'Mândrie și prejudecată',
        author: 'Jane Austen',
        genres: 'Romance, Clasic',
        pages: 432
    },
    {
        id: 4,
        title: 'O poveste scurtă',
        author: 'Autor Exemplu',
        genres: 'Fantasy',
        pages: 180
    }
];

test('Afiseaza toate cartile fara filtre', () => {
    const rezultat = filtreazaCarti(carti);
    assert.equal(rezultat.length, 4);
});

test('Cauta dupa titlu', () => {
    const rezultat = filtreazaCarti(carti, {
        termen: 'HOBBIT'
    });
    assert.deepEqual(rezultat.map(c => c.id), [1]);
});

test('Cauta dupa autor', () => {
    const rezultat = filtreazaCarti(carti, {
        termen: 'orwell'
    });
    assert.deepEqual(rezultat.map(c => c.id), [2]);
});

test('Filtreaza dupa gen', () => {
    const rezultat = filtreazaCarti(carti, {
        gen: 'Fantasy'
    });
    assert.deepEqual(rezultat.map(c => c.id), [1, 4]);
});

test('Filtreaza dupa numarul de pagini', () => {
    const rezultat = filtreazaCarti(carti, {
        maximPagini: '320'
    });
    assert.deepEqual(rezultat.map(c => c.id), [1, 4]);
});

test('Combina toate filtrele', () => {
    const rezultat = filtreazaCarti(carti, {
        termen: 'poveste',
        gen: 'Fantasy',
        maximPagini: '200'
    });
    assert.deepEqual(rezultat.map(c => c.id), [4]);
});

test('Respinge un numar invalid de pagini', () => {
    const rezultat = filtreazaCarti(carti, {
        maximPagini: '-5'
    });
    assert.equal(rezultat.length, 0);
});

test('Nu gaseste carti pentru un termen inexistent', () => {
    const rezultat = filtreazaCarti(carti, {
        termen: 'Carte inexistenta'
    });
    assert.equal(rezultat.length, 0);
});
