import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark } from "react-icons/fa";
import velhoTestamento from "../data/velhoTestamento.json";
import "../App.css";

function OldTestament() {
  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  // Recuperar marcador do localStorage ao carregar o componente
  useEffect(() => {
    const savedBookmark = JSON.parse(localStorage.getItem("oldTestamentBookmark"));
    if (savedBookmark) {
      // Verifica se o livro salvo existe em velhoTestamento.books
      const bookExists = velhoTestamento.books.some(
        (book) => book.nr === savedBookmark.book
      );
      if (bookExists) {
        setExpandedBook(savedBookmark.book);
        setExpandedChapter(savedBookmark.chapter);
      } else {
        // Se o livro não existe, limpa o marcador inválido
        localStorage.removeItem("oldTestamentBookmark");
      }
    }
  }, []);

  const toggleBook = (bookNr) => {
    setExpandedBook(expandedBook === bookNr ? null : bookNr);
    setExpandedChapter(null);
  };

  const toggleChapter = (chapterNr) => {
    setExpandedChapter(expandedChapter === chapterNr ? null : chapterNr);
  };

  const saveBookmark = () => {
    if (expandedBook !== null && expandedChapter !== null) {
      localStorage.setItem(
        "oldTestamentBookmark",
        JSON.stringify({ book: expandedBook, chapter: expandedChapter })
      );
      alert("Marcador salvo com sucesso!");
    }
  };

  // Verifica se o livro selecionado existe
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
      ) : selectedBook === undefined ? (
        <div className="error-message">
          <p>O livro selecionado não foi encontrado.</p>
          <button onClick={() => toggleBook(null)}>Voltar</button>
        </div>
      ) : expandedChapter === null ? (
        <div className="book-content">
          <button
            onClick={() => toggleBook(null)}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaHome />
          </button>
          <h2>{selectedBook.name}</h2>
          <div className="chapter-gallery">
            {selectedBook.chapters.map((chapter) => {
              // Verifica se o capítulo atual é o capítulo salvo no marcador
              const isBookmarked =
                expandedBook === JSON.parse(localStorage.getItem("oldTestamentBookmark"))?.book &&
                chapter.chapter === JSON.parse(localStorage.getItem("oldTestamentBookmark"))?.chapter;

              return (
                <div
                  key={chapter.chapter}
                  className={`chapter-card ${isBookmarked ? "bookmarked" : ""}`}
                  onClick={() => toggleChapter(chapter.chapter)}
                >
                  {chapter.name}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="chapter-content">
          <button
            onClick={() => toggleChapter(null)}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
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
            <button className="save-bookmark-button" onClick={saveBookmark}>
              <FaBookmark />
            </button>
            <button
              onClick={() => setExpandedChapter(expandedChapter + 1)}
              disabled={expandedChapter === selectedBook.chapters.length}
            >
              ➡
            </button>
          </div>
          <h3>
            {
              selectedBook.chapters.find((c) => c.chapter === expandedChapter)
                ?.name
            }
          </h3>
          <ul className="verses-list">
            {selectedBook.chapters
              .find((c) => c.chapter === expandedChapter)
              ?.verses.map((verse) => (
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