import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthdate, setBirthdate ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setemailErr ] = useState('');
  const [ BirthdateErr, setBirthdateErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 6){
     setUsernameErr('Username must be 6 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 8){
     setPasswordErr('Password must be 8 characters long');
     isReq = false;
    }
    if(!email){
      setemailErr('Please user valid email')
    } else if(email.indexOf('@') === -1){
      setemailErr('Please user valid email')
      isReq = false;
    }
    if(!Birthdate){
      setBirthdateErr('Please enter birthdate')
      isReq = false;
    }
    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq ) {
      console.log(username, password);
      axios.post('https://myhorrormovies.herokuapp.com/users', {
        Username: username,
        Password: password,
        email: email,
        Birthdate: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');// the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering this user')
      });
      props.onLoggedIn(username);
    };
  }  
  return (
    <div className="registration-view">
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
                      {usernameErr && <p>{usernameErr}</p>}
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
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                  <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control 
                      type="text" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required
                      placeholder="Enter your email"/> 
                      {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Birthdate:</Form.Label>
                      <Form.Control 
                      type="date" 
                      value={Birthdate} 
                      onChange={e => setBirthdate(e.target.value)} 
                      required
                      placeholder="Enter your Birthdate"/>
                      {BirthdateErr && <p>{BirthdateErr}</p>}
                  </Form.Group>
                  <Button variant="light" style={{ color: "white" }} type="submit"
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