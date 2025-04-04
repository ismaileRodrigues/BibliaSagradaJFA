import { Routes, Route, Link } from 'react-router-dom'
import OldTestament from './components/OldTestament'
import NewTestament from './components/NewTestament'


import './App.css'

function Home() {
  return (
    <div className="app">
      <h1>Bíblia Sagrada</h1>
      <p>Versão João Ferreira de Almeida</p>
      <div className="buttons">
        <Link to="/velho-testamento"><button>Velho Testamento</button></Link>
        <Link to="/novo-testamento"><button>Novo Testamento</button></Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/velho-testamento" element={<OldTestament />} />
      <Route path="/novo-testamento" element={<NewTestament />} />
    </Routes>
  )
}

export default App