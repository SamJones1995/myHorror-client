import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import MoviesList from '../movies-list/movies-list';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            user: null
        };
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
    
    componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !==null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
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

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    
    render() {
        const { movies, user } = this.state;
//with no user logged in LoginView will show if one is logged in the user parameters are passed as prop to LoginView
        
        
/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/
        return (
          <Router>  
            <Row className="main-view justify-content-md-center">
            <Routes>
                
               {/*login or main page*/}

                    <Route exact path="/" render={() => {
                      if (!user) return 
                      <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /> </Col>
                      if (movies.length === 0) return <div className="main-view" />;
                      return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/horrorMovies/:movieId" render={({ match }) => {
                      return <Col md={8}>
                        <MovieView movie = {movies.find(m => m._id === match.params.movieId)} />
                      </Col>
                    }} />
                    <Route path="/directors/:name" render={({ match }) => {
                      if (movies.length === 0) return <div className="main-view" />;
                      return <Col md={8}>
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                      </Col>
                    }
                    } />
                  </Routes>
                </Row> 
              </Router>  
        );
    }    
}

