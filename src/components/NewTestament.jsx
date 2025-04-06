import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import novo from '../data/novo.json';
import '../App.css';

function NewTestament() {
  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [readBooks, setReadBooks] = useState(() => {
    const saved = localStorage.getItem('readBooks');
    return saved ? JSON.parse(saved) : {};
  });
  const [readChapters, setReadChapters] = useState(() => {
    const saved = localStorage.getItem('readChapters');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
  }, [readBooks]);

  useEffect(() => {
    localStorage.setItem('readChapters', JSON.stringify(readChapters));
  }, [readChapters]);

  const toggleBook = (bookNr) => {
    setExpandedBook(expandedBook === bookNr ? null : bookNr);
    setExpandedChapter(null);
  };

  const toggleChapter = (chapterNr) => {
    setExpandedChapter(expandedChapter === chapterNr ? null : chapterNr);
  };

  const handleBookCheckboxChange = (bookNr) => {
    setReadBooks({
      ...readBooks,
      [bookNr]: !readBooks[bookNr],
    });
  };

  const handleChapterCheckboxChange = (bookNr, chapterNr) => {
    setReadChapters({
      ...readChapters,
      [`${bookNr}-${chapterNr}`]: !readChapters[`${bookNr}-${chapterNr}`],
    });
  };

  const selectedBook = novo.books.find((b) => b.nr === expandedBook);

  return (
    <div className="app">
      <h1>Novo Testamento</h1>
      {expandedBook === null ? (
        <div className="book-gallery-container">
          <Link to="/" className="back-button">
            <button>
              <FaHome />
            </button>
          </Link>
          <div className="book-gallery">
            {novo.books.map((book) => (
              <div key={book.nr} className="book-card">
                <input
                  type="checkbox"
                  checked={readBooks[book.nr] || false}
                  onChange={() => handleBookCheckboxChange(book.nr)}
                />
                <span onClick={() => toggleBook(book.nr)}>{book.name}</span>
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
            <FaHome />
          </button>
          <h2>{selectedBook.name}</h2>
          <div className="chapter-gallery">
            {selectedBook.chapters.map((chapter) => (
              <div key={chapter.chapter} className="chapter-card">
                <input
                  type="checkbox"
                  checked={readChapters[`${expandedBook}-${chapter.chapter}`] || false}
                  onChange={() => handleChapterCheckboxChange(expandedBook, chapter.chapter)}
                />
                <span onClick={() => toggleChapter(chapter.chapter)}>
                  {chapter.name}
                </span>
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

          <h3>{selectedBook.chapters.find((c) => c.chapter === expandedChapter).name}</h3>
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

export default NewTestament;