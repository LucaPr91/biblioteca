import { Button, Form, Table } from 'react-bootstrap';
import React, { useState } from "react";
import './Clientes.css';
import InserirCliente from './InserirCliente'
import { FaTrash } from 'react-icons/fa';
import { ImPencil, ImSearch } from 'react-icons/im';
import { GiMagicBroom } from 'react-icons/gi';


function Clientes() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  function limparFormulario() {
    setNome('');
    setTelefone('');
  }

  function getLocalStorageClientes() {
    return JSON.parse(localStorage.getItem('db_clientes')) ?? []
  }
  function setLocalStorageClientes(db_clientes) {
    return localStorage.setItem('db_clientes', JSON.stringify(db_clientes))
  }


  //CRUD
  //Excluir cliente
  function excluirCliente(id) {
    const db_clientes = readClientes();
    for (let i = 0; i < db_clientes.length; i++) {
      if (db_clientes[i].id == id) {
        console.log('passei aqui' + i);
        db_clientes.splice(i, 1);
      }
      setLocalStorageClientes(db_clientes);
      limparFormulario();
    }
  }

  //editar cliente
  function editarCliente() {

  }


  //buscar cliente
  function pesquisarCliente(id) {
    const db_clientes = readClientes();
    for (let i = 0; i < db_clientes.length; i++) {
      if (db_clientes[i].id == id) {
        return { cliente: db_clientes[i], index: i };
      };
    }
  }

  //Pesquisar todos db_clientes

  function readClientes() {
    let clientes = Array.from(getLocalStorageClientes())
    return clientes
  };

  return (
    <div className="Clientes">
      <div className='formulario'>
        <h1>Clientes</h1>
        <div className='input'>
          <Form>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              required
              placeholder='Ex.:João da Silva'
              value={nome}
              onChange={(e) => { setNome(e.target.value) }}
              className='form'
            />
            <Form.Label>Telefone:</Form.Label>
            <Form.Control type="tel" placeholder="Insira n° telefone"
              value={telefone}
              onChange={(e) => { setTelefone(e.target.value) }}
              className='form' />
          </Form>
        </div>
        <div className='btnAcao'>
          <Button onClick={limparFormulario} variant="secondary" className='btn'><GiMagicBroom /> Limpar</Button>
          <Button onClick={pesquisarCliente} variant="primary" className='btn'><ImSearch />Pesquisar</Button>
        </div>
      </div>
      <div className='tabela'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {readClientes().map((c) => {
              return (
                <tr>
                  <td>{c.nome}</td>
                  <td>{c.telefone}</td>
                  <td className='acao' ><Button className='styleBtn' variant="secondary" onClick={() => editarCliente(c.id)}><ImPencil /></Button>
                    <Button className='styleBtn' variant="danger" onClick={() => excluirCliente(c.id)}><FaTrash /></Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>

      </div>
      <div className='btnBottom'>
        <InserirCliente />
      </div>
    </div>
  );
}

export default Clientes;