import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BiPlusCircle } from 'react-icons/bi';
import {v4 as uuidv4} from 'uuid';

function InserirCliente() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [telefone, setTelefone,] = useState('');
  const [nome, setNome] = useState('');


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

  //Salvar cliente
  const salvarCliente = () => {
    let cliente = {
      id: uuidv4(),
      nome: nome,
      telefone: telefone
    }
    const db_clientes = Array.from(getLocalStorageClientes());
    db_clientes.push(cliente);
    setLocalStorageClientes(db_clientes);
    handleClose();
    limparFormulario();
    window.location.reload(false);
  }



  return (
    <>
      <Button variant="primary" onClick={handleShow}> <BiPlusCircle/>Inserir </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.CadastroNomeCliente">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex.: João da Silva"
                autoFocus
                value={nome}
                onChange={(e) => { setNome(e.target.value) }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Form.CadastroTelefoneCliente"
            >
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="tel" placeholder="(xx)xxxxx-xxxx" value={telefone} onChange={(e) => { setTelefone(e.target.value) }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <IoIosCloseCircleOutline/>Fechar
          </Button>
          <Button variant="primary" onClick={() => salvarCliente()} >
            <ImFloppyDisk/> Salvar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InserirCliente;