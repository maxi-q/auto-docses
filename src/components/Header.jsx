import React from "react";
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
    return(
        <Navbar as='header' bg="light" expand="lg" class="navbar navbar-light ">
          <Container>
            <Navbar.Brand as={Link} to="/Home"> Auto Docses </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/Home"> Home </Nav.Link>
                <Nav.Link as={Link} to="/Home"> Link </Nav.Link>
                <Nav.Link as={Link} to="/about"> About </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default Header;