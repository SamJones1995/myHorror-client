import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';
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
            <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
                    <Navbar.Brand className="ml-4">
                        <Link style={{ color: "white" }} to={'/'}>
                            myHorror
                        </Link>
                    </Navbar.Brand>
                    {user && (
                        <Navbar.Collapse className="justify-content-end">
                            <Link to={`/users/${user}`} className="mr-2">
                                <Button variant="light" style={{ color: "white" }}>Profile for {user}</Button>
                            </Link>
                            <Button onClick={() => this.onLoggedOut()} variant="light" style={{ color: "white" }}>Logout</Button>
                        </Navbar.Collapse> 
                    )}
                </Navbar>
            <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
               if (!user) return (
                <Col>
                  <LoginView  onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                );
              
               if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            
            <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              
               if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            
            

            <Route path="/directors/:name" render={({ match, history }) => {

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
            } />

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
            } />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col> 
            }} />

            <Route  path="/users" render={({ history }) => {
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
            }} />
                </Row> 
              </Router>  
        );
    }    
}

