import { useState } from 'react'
import { Link } from 'react-router-dom'
import novoTestament from '../data/novoTestament.json'
import './App.css'

function NewTestament() {
  const [expandedBook, setExpandedBook] = useState(null)
  const [expandedChapter, setExpandedChapter] = useState(null)

  const toggleBook = (bookNr) => {
    setExpandedBook(expandedBook === bookNr ? null : bookNr)
    setExpandedChapter(null)
  }

  const toggleChapter = (chapterNr) => {
    setExpandedChapter(expandedChapter === chapterNr ? null : chapterNr)
  }

  const selectedBook = novoTestament.books.find((b) => b.nr === expandedBook)

  return (
    <div className="app">
      <h1>Novo Testamento</h1>
      {expandedBook === null ? (
        <div className="book-gallery-container">
          <Link to="/" className="back-button">
            <button>Voltar à página inicial</button>
          </Link>
          <div className="book-gallery">
            {novoTestament.books.map((book) => (
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
            style={{ marginBottom: '20px' }}
          >
            Voltar aos livros
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
            style={{ marginBottom: '20px' }}
          >
            Voltar aos capítulos
          </button>
          <h3>{selectedBook.chapters.find((c) => c.chapter === expandedChapter).name}</h3>
         <ul className="verses-list">
  {selectedBook.chapters
    .find((c) => c.chapter === expandedChapter)
    .verses.map((verse) => {
      console.log("Versículo:", verse);
      return (
        <li key={verse.verse}>
          <span className="verse-number">{verse.verse}. </span>
          {verse.text}
        </li>
      );
    })}
</ul>
        </div>
      )}
    </div>
  )
}

export default NewTestament
