import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import  MoviesList  from '../movies-list/movies-list';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {

    constructor(){
        super();
      //this.getUserDetails = this.getUserDetails.bind(this)
    }

    componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !==null) {
        this.getUserDetails(accessToken);
        //this.setState({
        //  user: localStorage.getItem('user')
        //});
        this.getMovies(accessToken);
      }
    }

      //updates default 'user' property to that of 'particular user' on log in
    onLoggedIn(authData) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      // Trigger the setUser action to update the store with this user
      this.props.setUser(authData.user);
        this.getMovies(authData.token);
    }
    
    getUserDetails() {
      let userLocalStorage = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      axios.get(`https://myhorrormovies.herokuapp.com/users/${userLocalStorage}`, {
          headers: { Authorization: `Bearer ${token}`}
      }).then((response) => {
        this.props.setUser(response.user);
          console.log(response.data)
      }).catch(function (error) {
          console.log(error);
      });
  }

    getMovies(token) {
      axios.get('https://myhorrormovies.herokuapp.com/horrorMovies', {
        headers: { Authorization: `Bearer ${token}`, "Cross-Origin-Resource-Policy": "cross-origin"}
        
      })
      .then(response => {
        //Assigns the result to the state
        this.props.setMovies(response.data);
      })     
      .catch(function (error) {
        console.log(error);
      });
    } 

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.props.setUser(null);
    }

    
    
    render() {
      let { movies, user } = this.props;
      
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
                            <Link to={`/users/${user.Username}`} className="mr-2">
                                <Button variant="light" style={{ color: "white" }}>Profile for {user.Username}</Button>
                            </Link>
                            <Button onClick={() => this.onLoggedOut()} variant="light" style={{ color: "white" }}>Logout</Button>
                        </Navbar.Collapse> 
                    )}
                </Navbar>
                
            <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
               if (!user) return (
                <Col md={8}>
                  <LoginView  onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
               );
              
               if (movies.length === 0) return <div className="main-view" />;

               return <MoviesList movies={movies}/>;
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
                    <LoginView onLoggedIn={user => this.onLoggedIn(user) } />
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
                     <LoginView onLoggedIn={user => this.onLoggedIn(user) } />
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

            <Route  path="/users/:username" render={({ history }) => {
              if ( !user ) 
                return (
                  <Col>
                    <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
                return ( <Col>
                  <ProfileView
                user = {user}
                
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

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);

