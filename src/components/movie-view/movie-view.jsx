import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container, ListGroupItem, ListGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";

import "./movie-view.scss"

export class MovieView extends React.Component {

   render() {
    const { movie, onBackClick } = this.props;

    return( 
        <div className='movie-view'>
            <Card bg="secondary" text="light" border="light">
                <Card.Img variant='top' src='{movie.ImagePath' />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <div className="movie-genre-name">
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
                            <span className="value">{movie.Genre.Name}</span>   
                        </div> 
                        <div className="movie-director">
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">Director: </Button>
                            </Link>
                            <span className="value">{movie.Director.Name}</span>   
                        </div> 
                    </Card.Text>
                    <Button variant="light" style={{ color: "white" }} onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        </div>
        );
    }
}    

MovieView.propTypes = {
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
      onBackClick: PropTypes.func.isRequired
  };