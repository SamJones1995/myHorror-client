import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthdate, setBirthdate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn(username);
  };

  return (
    <div className="registration-view">
    <Navbar variant="dark">
      <Container>
      <Navbar.Brand>MyHorror</Navbar.Brand>
          <Nav>
          <Nav.Link>Profile</Nav.Link>
          <Nav.Link>Update Profile</Nav.Link>
          <Nav.Link>Logout</Nav.Link>
          </Nav>
      </Container>
      </Navbar>
    <Container fluid style={{paddingTop: '0.75rem'}}>
      <Row>
        <Col>
          <CardGroup>
            <Card bg="secondary" text="white" border="light">
              <Card.Body>
              <Card.Title>Please register</Card.Title>
                <Form>
                    <Form.Group>
                      <Form.Label> Username: </Form.Label>
                      <Form.Control 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      required
                      placeholder="Enter a username"/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required
                      minLength="8"
                      placeholder="Your password must be at least 8 characters"/>
                    </Form.Group>
                  <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control 
                      type="text" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required
                      placeholder="Enter your email"/> 
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Birthdate:</Form.Label>
                      <Form.Control 
                      type="date" 
                      value={Birthdate} 
                      onChange={e => setBirthdate(e.target.value)} 
                      required
                      placeholder="Enter your Birthdate"/>
                  </Form.Group>
                  <Button variant="primary" type="submit"
                      onClick={handleSubmit}>
                        Submit
                  </Button> 
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    </div>
  );
}