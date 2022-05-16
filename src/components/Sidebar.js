import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { ImBooks, ImUsers, ImHome } from 'react-icons/im';
import { FiMenu } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';


function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FiMenu/>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MENU</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home"><Button variant="primary"> <ImHome /> Página Inicial</Button></Nav.Link>
            <Nav.Link href="/clientes"><Button variant="primary"> <ImUsers /> Clientes</Button></Nav.Link>
            <Nav.Link href="/livros"><Button variant="primary"> <ImBooks /> Livros</Button></Nav.Link>
            <Nav.Link href="/faturamento"><Button variant="primary"> <BsCurrencyDollar />Faturamento</Button></Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;