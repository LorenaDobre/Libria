import { ArrowUpRight, Sparkles } from 'lucide-react';
import { BookCover } from '../book-cover';
import { books } from '../../data/books';

export function Hero() {
    return <section className="hero" aria-labelledby="hero-title"><div className="hero-content"><span className="hero-badge"><span /> O NOUĂ POVESTE TE AȘTEAPTĂ</span><h1 id="hero-title">Între tine și următoarea<br />carte, <em>doar o descoperire.</em></h1><p>Povești care te surprind. Idei care rămân.<br />Explorează universul Libria și găsește cartea care îți vorbește.</p><div className="hero-actions"><a href="#catalog" className="primary-button">Explorează catalogul <ArrowUpRight size={18} /></a><span className="hero-note">8 cărți. Nenumărate perspective.</span></div></div><div className="hero-books" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="hero-book back-book"><BookCover book={books[5]} /></div><div className="hero-book front-book"><BookCover book={books[0]} /></div><span className="floating-note"><Sparkles size={17} /> Următorul tău capitol</span><span className="hero-star">✧</span></div><div className="hero-bottom"><span>01 <span>DESCOPERĂ. CITEȘTE. REIMAGINEAZĂ.</span></span><span className="demo-label">PROTOTIP DEMONSTRATIV <span className="status-dot" /></span></div></section>;
}
