import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Clientes from './components/Clientes';
import Livros from './components/Livros';
import Faturamento from './components/Faturamento';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <div id='menu'>
        <Sidebar/>
      </div >
      <div>
        <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/faturamento" element={<Faturamento />} />
          </Routes>
        
      </BrowserRouter>
    </React.StrictMode>
    </div>
    </div >
  );
}

export default App;