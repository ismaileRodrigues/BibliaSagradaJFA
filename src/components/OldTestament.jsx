import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import velhoTestamento from '../data/velhoTestamento.json';
import '../App.css';

function OldTestament() {
  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleBook = (bookNr) => {
    setExpandedBook(expandedBook === bookNr ? null : bookNr);
    setExpandedChapter(null);
  };

  const toggleChapter = (chapterNr) => {
    setExpandedChapter(expandedChapter === chapterNr ? null : chapterNr);
  };

  const selectedBook = velhoTestamento.books.find((b) => b.nr === expandedBook);

  return (
    <div className="app">
      <h1>Velho Testamento</h1>
      {expandedBook === null ? (
        <div className="book-gallery-container">
          <Link to="/" className="back-button">
            <button>
              <FaHome />
            </button>
          </Link>
          <div className="book-gallery">
            {velhoTestamento.books.map((book) => (
              <div
                key={book.nr}
                className="book-card"
                onClick={() => toggleBook(book.nr)}
              >
                {book.name}
              </div>
            ))}
          </div>
        </div>
      ) : expandedChapter === null ? (
        <div className="book-content">
          <button
            onClick={() => toggleBook(null)}
            style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaHome /> Voltar aos livros
          </button>
          <h2>{selectedBook.name}</h2>
          <div className="chapter-gallery">
            {selectedBook.chapters.map((chapter) => (
              <div
                key={chapter.chapter}
                className="chapter-card"
                onClick={() => toggleChapter(chapter.chapter)}
              >
                {chapter.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chapter-content">
          <button
            onClick={() => toggleChapter(null)}
            style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaHome />
          </button>
          <h3>{selectedBook.chapters.find((c) => c.chapter === expandedChapter).name}</h3>
          <div className="navigation-buttons-fixed">
            <button
              onClick={() => setExpandedChapter(expandedChapter - 1)}
              disabled={expandedChapter === 1}
            >
              ⬅ 
            </button>
            <button
              onClick={() => setExpandedChapter(expandedChapter + 1)}
              disabled={expandedChapter === selectedBook.chapters.length}
            >
             ➡
            </button>
          </div>
          <ul className="verses-list">
            {selectedBook.chapters
              .find((c) => c.chapter === expandedChapter)
              .verses.map((verse) => (
                <li key={verse.verse}>
                  <strong>{verse.verse}</strong> {verse.text}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OldTestament;
