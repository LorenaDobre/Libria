// JavaScript source code


'use strict';

const PONDERI_EXPLICATII = {
    genres: 50,
    themes: 30,
    bookLength: 20
};

function nivelCompatibilitate(scor) {
    if (scor >= 85) return 'Foarte ridicată';
    if (scor >= 65) return 'Ridicată';
    if (scor >= 40) return 'Moderată';
    return 'Redusă';
}

function explicaRecomandare(carte, preferinte, genuri = [], teme = []) {
    const detalii = carte.scoreDetails || {};

    const genuriCarte = (carte.genre_ids || []).map(Number);
    const temeCarte = (carte.theme_ids || []).map(Number);

    const genuriSelectate = preferinte.genres.map(Number);
    const temeSelectate = preferinte.themes.map(Number);

    const nume = (id, lista) =>
        lista.find(element => Number(element.id) === id)?.name ||
        `ID ${id}`;

    const potriviriGenuri = genuriSelectate
        .filter(id => genuriCarte.includes(id))
        .map(id => nume(id, genuri));

    const lipsaGenuri = genuriSelectate
        .filter(id => !genuriCarte.includes(id))
        .map(id => nume(id, genuri));

    const potriviriTeme = temeSelectate
        .filter(id => temeCarte.includes(id))
        .map(id => nume(id, teme));

    const lipsaTeme = temeSelectate
        .filter(id => !temeCarte.includes(id))
        .map(id => nume(id, teme));

    const punctaje = {
        genres: Number(detalii.genres || 0),
        themes: Number(detalii.themes || 0),
        bookLength: Number(detalii.bookLength || 0)
    };

    let explicatieLungime;

    const pagini = carte.pages == null
        ? null
        : Number(carte.pages);

    const paginiValide =
        pagini !== null &&
        Number.isFinite(pagini) &&
        pagini > 0;

    if (preferinte.bookLength === 'oricare') {
        explicatieLungime =
            'Ai acceptat orice lungime, astfel că se acordă 20 de puncte.';
    } else if (!paginiValide) {
        explicatieLungime =
            'Numărul de pagini este indisponibil sau invalid. ' +
            'Nu se acordă puncte pentru lungime.';
    } else if (punctaje.bookLength === 20) {
        explicatieLungime =
            `Cartea are ${pagini} pagini și respectă lungimea preferată.`;
    } else {
        explicatieLungime =
            `Cartea are ${pagini} pagini, dar nu se încadrează ` +
            'în intervalul de lungime preferat.';
    }

    const explicatieGenuri = potriviriGenuri.length
        ? `Genuri potrivite: ${potriviriGenuri.join(', ')}.`
        : 'Niciun gen selectat nu se regăsește în carte.';

    const explicatieTeme = potriviriTeme.length
        ? `Teme potrivite: ${potriviriTeme.join(', ')}.`
        : 'Nicio temă selectată nu se regăsește în carte.';

    return {
        nivel: nivelCompatibilitate(carte.score),
        scor: carte.score,
        punctaje,
        potriviriGenuri,
        lipsaGenuri,
        potriviriTeme,
        lipsaTeme,
        explicatieGenuri,
        explicatieTeme,
        explicatieLungime
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        explicaRecomandare,
        nivelCompatibilitate
    };
}
