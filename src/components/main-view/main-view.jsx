import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';
import NavbarView from '../navbar-view/navbar-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import ErrorBoundary from '../error-catcher/error-catcher'

export default class MainView extends React.Component {

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
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user'),
        });
        this.getMovies(accessToken);
      }
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
          selectedMovie: newSelectedMovie
      });
  }
//updates default 'user' property to that of 'particular user' on log in
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.dataReturned.Username,
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.dataReturned.Username);
        this.getMovies(authData.token);
    }  

    getMovies(token) {
      axios.get('https://myhorrormovies.herokuapp.com/horrorMovies', {
        headers: { Authorization: `Bearer ${token}`}
      }).then(response => {
        //Assigns the result to the state
        this.setState({
          movies: response.data
        });
      }).catch(function (error) {
        console.log(error);
      });
    }  
    
    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    
    render() {
      const { user, movies } = this.state;
    
      
      return (
        <Router>
          
          <Row className="main-view justify-content-md-center">
          <ErrorBoundary>
            <Route exact path="/" render={() => {
               if (!user) return 
               <Col>
                 <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
               </Col>
             
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            </ErrorBoundary>
            <ErrorBoundary>
            <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              
               if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            </ErrorBoundary>
            <ErrorBoundary>

            <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              
               if (movies.length === 0) return <div className="main-view" />;
                if ( !user ) 
                return (
                  <Col>
                    <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView Director={movies.find((m) => m.Director.Name === match.params.name).Director}  onBackClick={() => history.goBack()} />
              </Col>
            }
            } /></ErrorBoundary>
            <ErrorBoundary>

             <Route path="/genres/:name" render={({ match, history }) => {
                 if (!user) return 
                 <Col>
                   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                 </Col>
               
                if (movies.length === 0) return <div className="main-view" />;
                 if ( !user ) 
                 return (
                   <Col>
                     <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                   </Col>
                 );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView Genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } /></ErrorBoundary>
            <ErrorBoundary>

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView onRegistration={() => this.onRegistration()} />
              </Col> 
            }} /></ErrorBoundary>
            <ErrorBoundary>

            <Route  path="/user" render={({ history }) => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              
              <Col>
                <ProfileView
               user = {this.state.user}
               movies = {movies}
                onBackClick={() => history.goBack()} />
              </Col>
              )
            }} /> </ErrorBoundary>
           
          </Row>
        </Router>
      );
    }
    
}

