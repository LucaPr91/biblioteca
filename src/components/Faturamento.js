import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import './Faturamento.css';

function Faturamento() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeLivro, setNomeLivro] = useState('');
  const [recibos, setRecibos] = useState([]);

  function limparFormulario() {
    setNomeCliente('');
    setNomeLivro('');
  }
  
  function getLocalStorageRecibos() {
    return JSON.parse(localStorage.getItem('db_recibos')) ?? []
  }
  function setLocalStorageRecibos(db_recibos) {
    return localStorage.setItem('db_recibos', JSON.stringify(db_recibos))
  }


  //CRUD

  //Salvar recibo
  function salvarRecibo() {
    let recibo = {
      id: 0,
    //   nome: nome,
    //   telefone: telefone
    }
    recibos.push(recibo);
    setRecibos([...recibos]);
    limparFormulario();
  }

  //Excluir recibo
  function excluirRecibo(id) {
    for (let i = 0; i < recibos.length; i++) {
      if (recibos[i].id == id) {
        recibos.splice(i, 1);
        break;
      }
      setRecibos([...recibos]);
    }
  }

  //buscar recibo
  function buscarRecibo(idRecibo) {
    for (let i = 0; i < recibos.length; i++) {
      if (recibos[i].id == idRecibo) {
        return { recibo: recibos[i], index: i };
      };
    }
  }


  return(
    <div className="Clientes">
      <div className='formulario'>
      <h1>FATURAMENTO</h1>
      <h4>Cadastro de Recibos</h4>
      <input
        required
        placeholder='Cliente'
        value={nomeCliente}
        onChange={(e) => { setNomeCliente(e.target.value) }}
      />
      <input placeholder='Título do Livro'
        value={nomeLivro}
        onChange={(e) => { setNomeLivro(e.target.value) }}
      />

      <Button onClick={salvarRecibo} variant="primary">Salvar</Button>
      </div>
      <div className='tabela'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Livro</th>
            <th>Dt Emprestimo</th>
            <th>Dt Devolução</th>
            <th>Situação</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {/* {clientes.map((c) => {
            return (
              <tr>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.telefone}</td>
                <td><Button variant="danger" onClick={() => excluirCliente(c.id)}><FaTrash /></Button></td>
              </tr>
            )
          })} */}
        </tbody>
      </Table>
      </div>

    </div>
  );
}

export default Faturamento;