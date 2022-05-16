import { Button } from 'react-bootstrap';
import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import { ImBooks,ImUsers } from 'react-icons/im';
import { BsCurrencyDollar } from 'react-icons/bs';

function Home() {
  return (
    <div className='home'>
      <h1>Biblioteca do Luca </h1>
      <p>Sistema de Gerenciamento de Livros - Biblioteca Jcavi</p>
      <div id='background'></div>
      <div className='buttons'>
        <Link to="/clientes"><Button variant="primary"> <ImUsers/> Clientes</Button></Link>
        <Link to="/livros"><Button variant="primary"> <ImBooks/> Livros</Button></Link>
        <Link to="/faturamento"><Button variant="primary"> <BsCurrencyDollar/>Faturamento</Button></Link>
      </div>
    </div>
  );
}

export default Home;