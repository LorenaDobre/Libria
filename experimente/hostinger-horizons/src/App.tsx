import { useState } from 'react';
import { Hero } from './components/home/hero';
import { Catalog } from './components/home/catalog';
import { Recommendations } from './components/home/recommendations';
import { BookDetails } from './components/book-details';
import type { Book } from './data/books';

export default function App() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    return (
        <main>
            <Hero />
            <Catalog onDetails={setSelectedBook} />
            <Recommendations onDetails={setSelectedBook} />
            <BookDetails
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
            />
        </main>
    );
}