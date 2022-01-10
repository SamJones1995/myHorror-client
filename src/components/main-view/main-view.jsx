import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      axios.get('https://myhorrormovies.herokuapp.com/horrorMovies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
//updates selected movie to that of 'movie' on click
    setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }
//updates default 'user' property to that of 'particular user' on log in
    onLoggedIn(user) {
      this.setState({
        user
      });
    }  

    render() {
        const { movies, selectedMovie, user } = this.state;
//with no user logged in LoginView will show if one is logged in the user parameters are passed as prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;      

        if (movies.length === 0) return <div className="main-view"/>;
/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/
        return (
          <div className="main-view">
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