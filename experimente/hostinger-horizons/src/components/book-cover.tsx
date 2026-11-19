import type { Book } from '../data/books';
export function BookCover({ book, miniature = false }: { book: Book; miniature?: boolean }) {
    return <div className={`book-cover cover-${book.cover}${miniature ? ' miniature' : ''}`} role="img" aria-label={`Copertă ilustrativă pentru ${book.title}, de ${book.author}`}><span className="cover-author">{book.author}</span><span className="cover-title">{book.title}</span><span className="cover-art" aria-hidden="true"><i /><i /><i /></span><span className="cover-imprint">LIBRIA · EDIȚIE DEMONSTRATIVĂ</span></div>;
}
