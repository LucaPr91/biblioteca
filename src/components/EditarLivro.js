import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ImPencil } from 'react-icons/im';


function EditarLivro(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titulo, setTitulo] = useState('');
  const [livros, setLivros] = useState([]);
  const [autor, setAutor] = useState('');


  function readLivros() {
    setLivros(Array.from(getLocalStorageLivros()));
   };

   function getLocalStorageLivros() {
    return JSON.parse(localStorage.getItem('db_livros')) ?? []
  }
  function setLocalStorageLivros(db_livros) {
    return localStorage.setItem('db_livros', JSON.stringify(db_livros))
  }

  //Editar livro
  const editarLivros = (id) => {
    let livro = {
      id: props.livro.id,
      autor: autor,
      titulo: titulo,
      estaEmprestado: false
    }
    const db_livros = Array.from(getLocalStorageLivros());
    for (let i = 0; i < db_livros.length; i++) {
      if (db_livros[i].id == livro.id) {
        db_livros[i] = livro;
        setLocalStorageLivros(db_livros);
      }
      readLivros();
      handleClose();
      window.location.reload();
    }
  }

  return (
    <>
      <Button className='styleBtn' variant="secondary" onClick={handleShow} disabled={props.livro.estaEmprestado}><ImPencil /></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.CadastroTituloLivro">
              <Form.Label>Título Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex.:Harry Potter e a Pedra Filosofal"
                autoFocus
                value={titulo}
            onChange={(e) => { setTitulo(e.target.value) }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Form.CadastroAutor">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex.: J.K.Rownling"
                autoFocus
                value={autor}
                onChange={(e) => { setAutor(e.target.value) }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <IoIosCloseCircleOutline />Fechar
          </Button>
          <Button variant="primary" onClick={() => editarLivros()} >
            <ImFloppyDisk /> Salvar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditarLivro;