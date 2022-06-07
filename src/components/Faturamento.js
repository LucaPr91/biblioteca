import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import { ImBook, ImSearch } from 'react-icons/im';
import { GiMagicBroom } from 'react-icons/gi';
import './Faturamento.css';
import { Alert } from "bootstrap";
import { getAllByPlaceholderText } from "@testing-library/react";

function Faturamento() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [tituloLivro, setNomeLivro] = useState('');
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

  function getLocalStorageLivros() {
    return JSON.parse(localStorage.getItem('db_livros')) ?? []
  }
  function setLocalStorageLivros(db_livros) {
    return localStorage.setItem('db_livros', JSON.stringify(db_livros))
  }




  useEffect(() => {
    readEmprestimos();

  }, [])


  //CRUD
  //Excluir Emprestimo
  function excluirEmprestimo(id) {
    const db_emprestimos = Array.from(getLocalStorageEmprestimos());
    for (let i = 0; i < db_emprestimos.length; i++) {
      if (db_emprestimos[i].id === id) {
        db_emprestimos.splice(i, 1);
      }
      setLocalStorageEmprestimos(db_emprestimos);
      limparFormulario();
      readEmprestimos();
    }
  }

  //buscar emprestimo
  function pesquisarEmprestimo(nomeCliente, tituloLivro) {
    const db_emprestimos = Array.from(getLocalStorageEmprestimos());
    let resultadoPesquisa = [];
    if (nomeCliente === '' && tituloLivro === '') {
      readEmprestimos();
    } else {
      for (let i = 0; i < db_emprestimos.length; i++) {
        let emprestimo = db_emprestimos[i];
        if (emprestimo.nomeCliente === nomeCliente || emprestimo.tituloLivro === tituloLivro) {
          resultadoPesquisa.push(emprestimo);
        };
      }
      if (resultadoPesquisa === 0) {
        alert('Não há itens a serem exibidos. Realize novamente a pesquisa.')
      } else {
        setEmprestimos(resultadoPesquisa);
      }
    }
  }

function validarPrazo(e){
  if(e.dataPrevistaDevolucao > Date()){
    alert('Livro devolvido dentro do prazo, obrigado')
  }else{
    alert('Você está devolvendo após o prazo previsto, necessário realizar o pagamento de MULTA no valor de R$14,00')
  }
}


  //Pesquisar todos db_emprestimos

  function readEmprestimos() {
    setEmprestimos(Array.from(getLocalStorageEmprestimos()))
  };

  function devolverLivro(e) {
    const db_livros = Array.from(getLocalStorageLivros());
    for (let i = 0; i < db_livros.length; i++) {
      if (db_livros[i].titulo == tituloLivro) {
        db_livros[i].estaEmprestado = false;
        setLocalStorageLivros(db_livros);
        alert('Livro devolvido, obrigado');
      }
    }
    const db_emprestimos = Array.from(getLocalStorageEmprestimos());
    validarPrazo(e);
    for (let i = 0; i < db_emprestimos.length; i++) {
      if (db_emprestimos[i].id === e.id) {
        db_emprestimos[i].emprestimoAtivo = false;
        setLocalStorageEmprestimos(db_emprestimos);
        alert('Emprestimo finalizado');
      }
    }

  }

  const somarValores = emprestimos.map(item => item.valor).reduce((prev, curr) => prev + curr, 0)

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
          value={tituloLivro}
          onChange={(e) => { setNomeLivro(e.target.value) }}
        />
        <div className='btnAcao'>
          <Button onClick={limparFormulario} variant="secondary" className='btn'><GiMagicBroom /> Limpar</Button>
          <Button onClick={() => pesquisarEmprestimo(nomeCliente, tituloLivro)} variant="primary" className='btn'><ImSearch />Pesquisar</Button>
        </div>
      </div>
      <div className='tabela'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Livro</th>
              <th>Dt Emprestimo</th>
              <th>Dt Prevista de Devolução</th>
              <th>Situação</th>
              <th>Valor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.nomeCliente}</td>
                  <td>{e.tituloLivro}</td>
                  <td>{e.dataEmprestimo}</td>
                  <td>{e.dataPrevistaDevolucao}</td>
                  <td>{e.dataPrevistaDevolucao < moment().format('L') ? 'Atrasado' : 'Em dia'}</td>
                  <td>{e.valor}</td>
                  <td className='acao' ><Button className='styleBtn' variant="secondary" onClick={() => devolverLivro(e)}><ImBook /></Button>
                    <Button className='styleBtn' variant="danger" onClick={() => excluirEmprestimo(e.id)}><FaTrash /></Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className="totais"><p>Valores totais: {somarValores}</p></div>
      </div>
    </div >
  );
}

export default Faturamento;