// JavaScript source code


const PONDERI = {
    genuri: 50,
    teme: 30,
    lungime: 20
};

const LUNGIMI_VALIDE = ['scurta', 'medie', 'lunga', 'oricare'];

function calculeazaScor(carte, preferinte) {
    const genuriCarte = carte.genre_ids || [];
    const temeCarte = carte.theme_ids || [];

    const genuriSelectate = preferinte.genres;
    const temeSelectate = preferinte.themes;

    // Proportia preferintelor care se regasesc in carte.
    const genuriPotrivite = genuriSelectate.filter(id =>
        genuriCarte.includes(id)
    );

    const temePotrivite = temeSelectate.filter(id =>
        temeCarte.includes(id)
    );

    const scorGenuri =
        (genuriPotrivite.length / genuriSelectate.length) *
        PONDERI.genuri;

    const scorTeme =
        (temePotrivite.length / temeSelectate.length) *
        PONDERI.teme;

    const pagini = carte.pages == null
        ? null
        : Number(carte.pages);

    let scorLungime = 0;

    if (preferinte.bookLength === 'oricare') {
        scorLungime = PONDERI.lungime;
    } else if (pagini !== null &&
        Number.isFinite(pagini) &&
        pagini > 0) {

        if (preferinte.bookLength === 'scurta' && pagini <= 200) {
            scorLungime = PONDERI.lungime;
        } else if (
            preferinte.bookLength === 'medie' &&
            pagini >= 201 && pagini <= 400
        ) {
            scorLungime = PONDERI.lungime;
        } else if (
            preferinte.bookLength === 'lunga' &&
            pagini > 400
        ) {
            scorLungime = PONDERI.lungime;
        }
    }

    const scorTotal = Math.round(
        (scorGenuri + scorTeme + scorLungime) * 100
    ) / 100;

    return {
        ...carte,
        score: scorTotal,
        scoreDetails: {
            genres: Math.round(scorGenuri * 100) / 100,
            themes: Math.round(scorTeme * 100) / 100,
            bookLength: scorLungime
        }
    };
}

function valideazaPreferinte(preferinte) {
    if (!preferinte || typeof preferinte !== 'object') {
        return false;
    }

    const { genres, themes, bookLength } = preferinte;

    const iduriValide = lista =>
        Array.isArray(lista) &&
        lista.length > 0 &&
        lista.every(id =>
            Number.isSafeInteger(id) && id > 0
        );

    return (
        iduriValide(genres) &&
        iduriValide(themes) &&
        LUNGIMI_VALIDE.includes(bookLength)
    );
}

function genereazaRecomandari(carti, preferinte) {
    if (!valideazaPreferinte(preferinte)) {
        throw new Error('Preferintele sunt invalide.');
    }

    return carti
        .map(carte => calculeazaScor(carte, preferinte))
        .sort((a, b) =>
            b.score - a.score ||
            String(a.title).localeCompare(String(b.title), 'ro')
        );
}

module.exports = {
    calculeazaScor,
    valideazaPreferinte,
    genereazaRecomandari
};
