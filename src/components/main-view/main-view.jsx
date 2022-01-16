import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !==null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }
//updates selected movie to that of 'movie' on click
    setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }
//updates default 'user' property to that of 'particular user' on log in
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }  

    getMovies(token) {
      axios.get('https://myhorrormovies.herokuapp.com/horrorMovies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        //Assigns the result to the state
        this.setState({
          movies:response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }  
    render() {
        const { movies, selectedMovie, user } = this.state;
//with no user logged in LoginView will show if one is logged in the user parameters are passed as prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;      

        if (movies.length === 0) return <div className="main-view"/>;
/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/
        return (
          <div className="main-view" fluid style={{paddingTop: '0.75rem'}}>
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
            {selectedMovie
              ? (
              <Row className="justify-content-md-center">
                <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
               </Row> 
              )
              : (
                <Row className="justifiy-content-md-center">
                  {movies.map(movie => (
                    <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);
                     }}/>
                    </Col> 
                  ))}
                </Row>    
              )
            }
          </div>
        );
    }    
}

MainView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.date,
      Deathyear: PropTypes.date
    }),
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};