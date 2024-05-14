import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
function Navb() {
  return (
    <Navbar expand="lg"  className='Navbar'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="sm-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/add">Add</NavLink>
          </Nav>
        </Navbar.Collapse>
    
      </Container>
    </Navbar>
   

  )
}

export default Navb