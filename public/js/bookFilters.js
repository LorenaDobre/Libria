
(function (root) {
    'use strict';

    function filtreazaCarti(carti, criterii = {}) {
        const termen = String(criterii.termen ?? '')
            .toLocaleLowerCase('ro')
            .trim();

        const genSelectat = String(criterii.gen ?? '')
            .toLocaleLowerCase('ro');

        const paginiIntroduse = String(criterii.maximPagini ?? '').trim();

        const maximPagini = paginiIntroduse === ''
            ? null
            : Number(paginiIntroduse);

        return carti.filter(carte => {
            const titlu = String(carte.title || '')
                .toLocaleLowerCase('ro');

            const autor = String(carte.author || '')
                .toLocaleLowerCase('ro');

            const corespundeCautarii =
                titlu.includes(termen) ||
                autor.includes(termen);

            const genuriCarte = String(carte.genres || '')
                .split(',')
                .map(gen => gen.trim().toLocaleLowerCase('ro'));

            const corespundeGenului =
                genSelectat === '' ||
                genuriCarte.includes(genSelectat);

            const corespundePaginilor =
                maximPagini === null ||
                (
                    Number.isInteger(maximPagini) &&
                    maximPagini > 0 &&
                    carte.pages != null &&
                    Number(carte.pages) <= maximPagini
                );

            return corespundeCautarii &&
                corespundeGenului &&
                corespundePaginilor;
        });
    }

    root.filtreazaCarti = filtreazaCarti;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { filtreazaCarti };
    }
})(typeof window !== 'undefined' ? window : globalThis);
