import { Button, Form, Table } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import './Clientes.css';
import InserirCliente from './InserirCliente'
import { FaTrash } from 'react-icons/fa';
import { ImSearch } from 'react-icons/im';
import { GiMagicBroom } from 'react-icons/gi';
import EditarCliente from './EditarCliente';


function Clientes() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [clientes, setClientes] = useState([]);

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

  useEffect(() => {
    readClientes();

  }, [])

  //CRUD
  //Excluir cliente
  function excluirCliente(id) {
    const db_clientes = Array.from(getLocalStorageClientes());
    for (let i = 0; i < db_clientes.length; i++) {
      if (db_clientes[i].id == id) {
        db_clientes.splice(i, 1);
      }
      setLocalStorageClientes(db_clientes);
      limparFormulario();
      readClientes();
    }
  }

  //buscar cliente
  function pesquisarCliente(nome, telefone) {
    const db_clientes = Array.from(getLocalStorageClientes());
    let resultadoPesquisa = [];
    if (nome == '' && telefone == '') {
      readClientes();
    } else {
      for (let i = 0; i < db_clientes.length; i++) {
        let cliente = db_clientes[i];
        if (cliente.nome == nome || cliente.telefone == telefone) {
          resultadoPesquisa.push(cliente);
        };
      }
      if (resultadoPesquisa == 0) {
        alert('Não há itens a serem exibidos. Realize novamente a pesquisa.')
      } else {
        setClientes(resultadoPesquisa);
      }
    }
  }

  //Pesquisar todos db_clientes

  function readClientes() {
    setClientes(Array.from(getLocalStorageClientes()))
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
          <Button onClick={() => pesquisarCliente(nome, telefone)} variant="primary" className='btn'><ImSearch />Pesquisar</Button>
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
            {clientes.map((c) => {
              return (
                <tr>
                  <td>{c.nome}</td>
                  <td>{c.telefone}</td>
                  <td className='acao' ><EditarCliente cliente={c}/>
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