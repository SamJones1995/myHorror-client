import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Navbar, Nav, Form, Button, Card, CardGroup, Col, Row, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// SCSS Import
import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //validation declarations 
  const [ validated, setValidated ] = useState(false);

  const handleSubmit = (e) => {
    //const form = e.currentTarget.parentNode;
        // Use checkValidity() to check for any validation errors in the form (based on what is described in the form elements attributes)
        const form = e.currentTarget.parentNode;
        
        if (form.checkValidity() === false) {
            // If checkValidity() returns false, stop the submission. stopPropagation() is used to stop propagation of the same event being called
            e.preventDefault();
            e.stopPropagation();
            // Even if the form is not valid, the validated state variable needs to be set to true. This will toggle any validation styles on the forms elements (as per React Bootstraps documentation)
            setValidated(true);
        } else {
            // e.preventDefault() will stop the page from refreshing once the submit button is clicked (which would be the default behaviour)
            e.preventDefault();
            // Change the validated state variable to true to mark the form as validated
            setValidated(true);
    /* Send a request to the server for authentication */
      axios.post('https://myhorrormovies.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        props.onLoggedIn(data);
      })
      .catch(e => {
        //seems to be some issues with the client-side validation, alert set up for now
        alert('Invalid login');
        console.log('no such user')
      });
    }  
  };

  return (
    <div className="login-view">
    <Container fluid style={{paddingTop: '0.75rem'}}>
      <Row>
        <Col>
          <CardGroup>
            <Card bg="secondary" text="light" border="light">
              <Card.Body>
                <Card.Title>Welcome to MyHorror!</Card.Title>
                <Form noValidate validated={validated}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text"  onChange={e => setUsername(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="light" style={{ color: "white" }} type="submit" onClick={handleSubmit}>
                    Submit
                    </Button>
                    <Link to={`/register`} className="float-right">
                      <Button variant="light" style={{ color: "white" }} type="button">No account? Click here to Register!</Button>
                    </Link>
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

LoginView.propTypes = {
  
  onLoggedIn: PropTypes.func.isRequired
};

let mapDispatchToProps = (dispatch) => {
  return({
      handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
  })
};

export default connect(null, mapDispatchToProps)(LoginView);