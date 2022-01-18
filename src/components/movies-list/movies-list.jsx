import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container} from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export class MoviesList extends React.Component {
 

    render() {
    const { movie } = this.props;
    const { movies } = this.state;

    return <>
            <Row className="justifiy-content-md-center">
                  {movies.map(movie => (
                    <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);
                     }}/>
                    </Col> 
                  ))}
                </Row>    
    
    </>;
}
}

MoviesList.propTypes = {
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
        Birthyear: PropTypes.string,
        Deathyear: PropTypes.string
      }),
      Featured: PropTypes.bool,
      ImagePath: PropTypes.string.isRequired
      }).isRequired,
      onBackClick: PropTypes.func
  };