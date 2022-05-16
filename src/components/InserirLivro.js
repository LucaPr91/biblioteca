import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BiPlusCircle } from 'react-icons/bi';
import {v4 as uuidv4} from 'uuid';

function InserirLivro() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titulo, setTitulo] = useState('');
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

  //Salvar cliente
  const salvarLivro = () => {
    let livro = {
      id: uuidv4(),
      titulo: titulo,
      autor: autor
    }
    const db_livros = Array.from(getLocalStorageLivros());
    db_livros.push(livro);
    setLocalStorageLivros(db_livros);
    handleClose();
    limparFormulario();
    window.location.reload(false);
  }



  return (
    <>
      <Button variant="primary" onClick={handleShow}> <BiPlusCircle/>Inserir </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.CadastroTituloLivro">
              <Form.Label>Título Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex.: Harry Potter e a Pedra Filosofal"
                autoFocus
                value={titulo}
                onChange={(e) => { setTitulo(e.target.value) }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Form.CadastroAutorLivro"
            >
              <Form.Label>Autor</Form.Label>
              <Form.Control placeholder="Ex.: J.K.Rownling" value={autor} onChange={(e) => { setAutor(e.target.value) }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <IoIosCloseCircleOutline/>Fechar
          </Button>
          <Button variant="primary" onClick={() => salvarLivro()} >
            <ImFloppyDisk/> Salvar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InserirLivro;