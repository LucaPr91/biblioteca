import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ImFloppyDisk } from 'react-icons/im';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ImPencil } from 'react-icons/im';

function EditarCliente(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [telefone, setTelefone,] = useState('');
  const [nome, setNome] = useState('');

  const [clientes, setClientes] = useState([]);

  function limparFormulario() {
    setNome('');
    setTelefone('');
  }

  function readClientes() {
    setClientes(Array.from(getLocalStorageClientes()))
  };



  function getLocalStorageClientes() {
    return JSON.parse(localStorage.getItem('db_clientes')) ?? []
  }
  function setLocalStorageClientes(db_clientes) {
    return localStorage.setItem('db_clientes', JSON.stringify(db_clientes))
  }

  //Editar cliente
  const editarClientes = (id) => {
    let cliente = {
      id: props.cliente.id,
      nome: nome,
      telefone: telefone
    }
    const db_clientes = Array.from(getLocalStorageClientes());
    for (let i = 0; i < db_clientes.length; i++) {
      if (db_clientes[i].id === cliente.id) {
        db_clientes[i] = cliente;
        setLocalStorageClientes(db_clientes);
      }
      readClientes();
      handleClose();
      limparFormulario();
      window.location.reload();
    }
  }

  return (
    <>
      <Button className='styleBtn' variant="secondary" onClick={handleShow} ><ImPencil /></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
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
            <IoIosCloseCircleOutline />Fechar
          </Button>
          <Button variant="primary" onClick={() => editarClientes()} >
            <ImFloppyDisk /> Salvar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditarCliente;