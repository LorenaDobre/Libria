# Libria

Aplicație web pentru catalogarea și recomandarea personalizată a cărților.

## Proiect III – Instrumente pentru dezvoltarea programelor

### Raportarea 2 – Implementare F1–F6

În această etapă a fost realizată o versiune funcțională a aplicației Libria, care permite explorarea catalogului de cărți, filtrarea acestora și obținerea unor recomandări pe baza preferințelor utilizatorului.

### Funcționalități implementate

- Catalog cu 40 de cărți.
- Afișarea detaliilor cărților.
- Căutarea și filtrarea cărților.
- Chestionar pentru identificarea preferințelor de lectură.
- Algoritm de recomandare personalizată.
- Afișarea și explicarea recomandărilor.

### Tehnologii utilizate

- **Visual Studio** – dezvoltarea și depanarea aplicației.
- **Node.js și Express.js** – implementarea serverului și a logicii aplicației.
- **HTML, CSS, JavaScript și Bootstrap** – interfața web.
- **PostgreSQL** – stocarea datelor.
- **DbSchema** – proiectarea și vizualizarea bazei de date.
- **Git și GitHub** – gestionarea versiunilor și a codului sursă.
- **Jira** – planificarea și urmărirea activităților.
- **GitHub Copilot** – asistență în dezvoltare și testare.

### Baza de date

Baza de date conține cinci tabele: `books`, `genres`, `themes`, `book_genres` și `book_themes`.

Diagrama este disponibilă în fișierele `diagrama_baza_date.png` și `Libria.dbs`.

### Testare automată

Proiectul include 25 de teste automate pentru verificarea funcționalităților importante, inclusiv filtrarea și recomandarea cărților.

Testele sunt executate și prin **GitHub Actions**, pentru verificarea automată a modificărilor.

### Experimente cu instrumente complementare

**Hostinger Horizons**

A fost realizat un prototip demonstrativ de interfață Libria prin generare asistată de inteligență artificială. Codul prototipului este disponibil în:

`experimente/hostinger-horizons/`

**Zoho Creator**

A fost realizat un prototip low-code pentru gestionarea unui catalog de cărți, care include formular, raport, vizualizare Kanban și panou de control.

Exportul aplicației, datele demonstrative și capturile de ecran sunt disponibile în:

`experimente/zoho-creator/`

Aceste experimente au rol demonstrativ și nu condiționează funcționarea aplicației principale.
