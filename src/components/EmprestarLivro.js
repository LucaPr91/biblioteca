import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BiPlusCircle } from 'react-icons/bi';
import {v4 as uuidv4} from 'uuid';
import Livros from "./Livros";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

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

  function clkEmprestar(){
    handleShow();
    setTitulo()
  }

  //Salvar cliente
  const salvarEmprestimo = () => {
    let emprestimo = {
      id: uuidv4(),
      idCliente: nome,// nomeCliente,,
      idLivro: props.livro.id,//tituloLivro,
      dataEmprestimo: new Date()
    }
    const db_livros = Array.from(getLocalStorageLivros());
    const db_clientes = Array.from(getLocalStorageClientes());
    const db_emprestimos = Array.from(getLocalStorageEmprestimo());
    db_emprestimos.push(emprestimo);
    setLocalStorageEmprestimo(db_emprestimos);
    handleClose();
    limparFormulario();
    window.location.reload(false);
  }

  function readClientes() {
    let clientes = Array.from(getLocalStorageClientes())
    return clientes
  };

  function readLivros() {
    let livros = Array.from(getLocalStorageLivros())
    return livros
  };


  return (
    <>
      <Button variant="success" onClick={clkEmprestar}> Emprestar </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Empréstimo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.CadastroTituloLivro"/>
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
            <option value={c.id}>{c.nome}</option>
          )
        })}
      </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <IoIosCloseCircleOutline/>Fechar
          </Button>
          <Button variant="primary" onClick={() => salvarEmprestimo()} >
            <ImFloppyDisk/> Confirmar Emprestimo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmprestarLivro;