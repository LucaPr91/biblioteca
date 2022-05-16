import { Button, Form, Table } from 'react-bootstrap';
import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { ImPencil, ImSearch } from 'react-icons/im';
import { GiMagicBroom } from 'react-icons/gi';
import './Livros.css';
import InserirLivro from './InserirLivro'
import EmprestarLivro from './EmprestarLivro'


function Livros() {

  const [titulo, setTitulo] = useState('');
  const [livros, setLivros] = useState([]);
  const [autor, setAutor] = useState('');

  function limparFormulario() {
    setTitulo('');
    setAutor('');
  }

  function getLocalStorageLivros() {
    return JSON.parse(localStorage.getItem('db_livros')) ?? []
  }
  function setLocalStorageLivros(db_livros) {
    return localStorage.setItem('db_livros', JSON.stringify(db_livros))
  }

  function readLivros() {
    let livros = Array.from(getLocalStorageLivros())
    return livros
  };

    //buscar livro
    function pesquisarLivro(id) {
      const db_livros = readLivros();
      for (let i = 0; i < db_livros.length; i++) {
        if (db_livros[i].id == id) {
          return { livro: db_livros[i], index: i };
        };
      }
    }


  //CRUD

  //Excluir livro
  function excluirLivro(id) {
    for (let i = 0; i < livros.length; i++) {
      if (livros[i].id == id) {
        livros.splice(i, 1);
      }
      setLivros([...livros]);
    }
  }

  //editar cliente
  function editarLivro() {

  }

  function emprestarLivro(){
    
  }


  //buscar livro
  function buscarLivro(idCliente) {
    for (let i = 0; i < livros.length; i++) {
      if (livros[i].id == idCliente) {
        return { livro: livros[i], index: i };
      };
    }
  }

  return (
    <div className="Livros">
      <div className='formulario'>
        <h1>Livros</h1>

        <Form>
          <Form.Label>Título do livro:</Form.Label>
          <Form.Control
            required
            placeholder='Ex.:Harry Potter e a Pedra Filosofal'
            value={titulo}
            onChange={(e) => { setTitulo(e.target.value) }}
            className='form'
          />
          <Form.Label>Autor:</Form.Label>
          <Form.Control type="tel" placeholder="Ex.: J.K.Rownling"
            value={autor}
            onChange={(e) => { setAutor(e.target.value) }}
            className='form' />
        </Form>
        <div className='btnAcao'>
          <Button onClick={limparFormulario} variant="secondary" className='btn'><GiMagicBroom /> Limpar</Button>
          <Button onClick={pesquisarLivro} variant="primary" className='btn'><ImSearch />Pesquisar</Button>
        </div>
      </div>
      <div className='tabela'>
        <Table striped bordered hover>
          <thead>
            <tr>
              
              <th>Título</th>
              <th>Autor</th>
              <th>retirada? Dt ou o que?</th>
              <th>Ação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {readLivros().map((l) => {
              return (
                <tr>
                  
                  <td>{l.titulo}</td>
                  <td>{l.autor}</td>
                  <td>inserir algo relacionado a retirada</td>
                  <td className='acao' ><Button className='styleBtn' variant="secondary" onClick={() => editarLivro(l.id)}><ImPencil /></Button>
                    <Button className='styleBtn' variant="danger" onClick={() => excluirLivro(l.id)}><FaTrash /></Button></td>
                    <td><EmprestarLivro /></td>

                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <div className='btnBottom'>
        <InserirLivro />
      </div>

    </div>
  );
}

export default Livros;