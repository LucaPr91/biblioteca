import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import { ImPencil, ImSearch } from 'react-icons/im';
import { GiMagicBroom } from 'react-icons/gi';
import './Faturamento.css';
import InserirRecibo from "./InserirRecibo";

function Faturamento() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeLivro, setNomeLivro] = useState('');
  const [recibos, setRecibos] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  function limparFormulario() {
    setNomeCliente('');
    setNomeLivro('');
  }

  function setLocalStorageEmprestimos(db_emprestimos) {
    return localStorage.setItem('db_emprestimos', JSON.stringify(db_emprestimos))
  }

  function getLocalStorageEmprestimos() {
    return JSON.parse(localStorage.getItem('db_emprestimos')) ?? []
  }

  function getLocalStorageRecibos() {
    return JSON.parse(localStorage.getItem('db_recibos')) ?? []
  }
  function setLocalStorageRecibos(db_recibos) {
    return localStorage.setItem('db_recibos', JSON.stringify(db_recibos))
  }

  useEffect(() => {
    readEmprestimos();

  }, [])


  //CRUD

  //Salvar recibo
  function salvarRecibo() {
    let recibo = {
      id: 0,
      nomeLivro: 'nomeLivro',
      dataEmprestimo: 'dataEmprestimo',
      dataDevolucao: 'dataDevolucao',
      situacao: 'situacao',
      valor: 'valor'
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

  //editar recibo
  const editarRecibo = (index, recibo) => {
    const db_recibos = Array.from(getLocalStorageRecibos());
    db_recibos[index] = recibo;
    getLocalStorageRecibos(db_recibos);
    readRecibos();
  }

  //buscar recibo
  function pesquisarRecibo(nomeCliente, nomeLivro) {
    const db_recibos = Array.from(getLocalStorageRecibos());
    let resultadoPesquisa = [];
    if (nomeCliente == '' && nomeLivro == '') {
      readRecibos();
    } else {
      for (let i = 0; i < db_recibos.length; i++) {
        let recibo = db_recibos[i];
        if (recibo.nomeCliente == nomeCliente || recibo.nomeLivro == nomeLivro) {
          resultadoPesquisa.push(recibo);
        };
      }
      if (resultadoPesquisa == 0) {
        alert('Não há itens a serem exibidos. Realize novamente a pesquisa.')
      } else {
        setRecibos(resultadoPesquisa);
      }
    }
  }


  //Pesquisar todos db_emprestimos

  function readEmprestimos() {
    setEmprestimos(Array.from(getLocalStorageEmprestimos()))
  };

  function readRecibos() {
    setRecibos(Array.from(getLocalStorageRecibos()))
  };



  return (
    <div className="Faturamento">
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
        <div className='btnAcao'>
          <Button onClick={limparFormulario} variant="secondary" className='btn'><GiMagicBroom /> Limpar</Button>
          <Button onClick={() => pesquisarRecibo(nomeCliente, nomeLivro)} variant="primary" className='btn'><ImSearch />Pesquisar</Button>
        </div>
      </div>
      <div className='tabela'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Livro</th>
              <th>Dt Emprestimo</th>
              <th>Dt Devolução</th>
              <th>Situação</th>
              <th>Valor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((e) => {
              return (
                <tr>
                  <td>{e.nomeLivro}</td>
                  <td>{e.dataEmprestimo}</td>
                  <td>{e.dataDevolucao}</td>
                  <td>{e.situacao}</td>
                  <td>{e.valor}</td>
                  <td className='acao' ><Button className='styleBtn' variant="secondary" onClick={() => editarRecibo(e.id)}><ImPencil /></Button>
                    <Button className='styleBtn' variant="danger" onClick={() => excluirRecibo(e.id)}><FaTrash /></Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <div className='btnBottom'>
        <InserirRecibo />
      </div>

    </div >
  );
}

export default Faturamento;