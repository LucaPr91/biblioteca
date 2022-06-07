import moment from "moment";
import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

function EmprestarLivro(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [nome, setNome] = useState('');

  function limparFormulario() {
    setTitulo('');
    setAutor('');
  }



  function getLocalStorageLivros() {
    return JSON.parse(localStorage.getItem('db_livros')) ?? []
  }

  function getLocalStorageClientes() {
    return JSON.parse(localStorage.getItem('db_clientes')) ?? []
  }
  function setLocalStorageEmprestimo(db_emprestimos) {
    return localStorage.setItem('db_emprestimos', JSON.stringify(db_emprestimos))
  }

  function getLocalStorageEmprestimo() {
    return JSON.parse(localStorage.getItem('db_emprestimos')) ?? []
  }

  function setLocalStorageLivros(db_livros) {
    return localStorage.setItem('db_livros', JSON.stringify(db_livros))
  }

  function clkEmprestar() {
    handleShow();
    setTitulo()
  }

  //Salvar cliente
  const salvarEmprestimo = () => {
    let emprestimo = {
      id: uuidv4(),
      nomeCliente: nome,// nomeCliente,,
      tituloLivro: props.livro.titulo,//tituloLivro,
      dataEmprestimo: moment().format('L'),
      dataPrevistaDevolucao: moment().add(7, 'days').calendar(),
      emprestimoAtivo: true,
      valor: 7
    }
    const db_livros = Array.from(getLocalStorageLivros());
    const db_clientes = Array.from(getLocalStorageClientes());
    const db_emprestimos = Array.from(getLocalStorageEmprestimo());
    db_emprestimos.push(emprestimo);
    setLocalStorageEmprestimo(db_emprestimos);
    for (let i = 0; i < db_livros.length; i++) {
      if (db_livros[i].id === props.livro.id) {
        db_livros[i].estaEmprestado = true;
        setLocalStorageLivros(db_livros);
      }
      handleClose();
      limparFormulario();
      window.location.reload(false);
    }
  }

  function readClientes() {
    let clientes = Array.from(getLocalStorageClientes())
    return clientes
  };

  return (
    <>
      <Button variant="success" onClick={clkEmprestar} disabled={props.livro.estaEmprestado}> Emprestar </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Empréstimo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.CadastroTituloLivro" />
            <Form.Label>Título Completo</Form.Label>
            <Form.Control
              disabled
              value={props.livro.titulo}>
            </Form.Control>
            <Form.Group
              className="mb-3"
              controlId="Form.CadastroAutorLivro"
            >
              <Form.Label>Cliente</Form.Label>
              <Form.Select value={nome} onChange={(e) => { setNome(e.target.value) }}>
                {readClientes().map((c) => {
                  return (
                    <option value={c.nome}>{c.nome}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <IoIosCloseCircleOutline />Fechar
          </Button>
          <Button variant="primary" onClick={() => salvarEmprestimo()} >
            <ImFloppyDisk /> Confirmar Emprestimo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmprestarLivro;