import React from 'react'

import { Navbar, Container, Nav, Button }from 'react-bootstrap';


import './navbar-view.scss'

export function NavbarView ({user}) {

  const onLoggedOut = () => {
      localStorage.clear();
      window.open("/", "_self");
    };

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (

<Navbar className="main-nav" bg="secondary" expand="lg">
  <Container className="navbar-menu">
    <Navbar.Brand classname="navbar logo" href="/">myHorror</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        {isAuth() && (
          <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
        )}
        {isAuth() && (
          <Nav.Link id="logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
        )}
        {!isAuth() && (
          <Nav.Link href="/">Sign-in</Nav.Link> 
        )}
        {!isAuth() && (
          <Nav.Link href="/register">Sign-up</Nav.Link> 
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        );
    }