import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container, ListGroupItem, ListGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        // Create state variables that will be used to add/remove a movie from a users favourites list
        this.state = {
            // REMOVED line of code, as I couldn't get an isFavourite flag to work as a state variable. My solution can be found in the render() function
            // isFavourite: false,
            favouriteMovies: [],
            userDetails: []
        }

        // Bind these additional functions that will get called by onClick events to 'this'
        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
    }

    // During componentDidMount() get the user's details (for displaying whether this movie is a favourite or not)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    // getUserDetails function for making a request to the server for the users details
    getUserDetails(token) {
        axios.get(`https://myhorrormovies.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            // Use the response to set the user details in the state variables
            this.setState({
                userDetails: response.data,
                favouriteMovies: response.data.FavouriteMovies
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for adding this movie to a users favourites list. Makes a post request to the server using information passed in through the props
    addFavourite() {
        let token = localStorage.getItem('token');
        // I'm not sure why I need the first {} (before the headers). but without those empty brackets all my requests returned unauthorized
        axios.post(`https://myhorrormovies.herokuapp.com/users/${this.props.user}/Movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Set the isFavourite state to true, now that this movie has been added to the list of favourites
            // this.setState({ isFavourite: true });
            // window.open refreshes the page to make sure this movie is correctly displaying as a favourite
            window.open(`/movies/${this.props.movie._id}`, '_self');
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for removing this movie from a users favourites list. Makes a delete request to the server using information passed in through the props
    removeFavourite() {
        let token = localStorage.getItem('token');
        axios.delete(`https://myhorrormovies.herokuapp.com/users/${this.props.user}/Movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Set the isFavourite state to false, now that this movie has been removed from the list of favourites
            // this.setState({ isFavourite: false });
            // window.open refreshes the page to make sure this movie is correctly displaying as not a favourite
            window.open(`/movies/${this.props.movie._id}`, '_self');
        }).catch(function(error) {
            console.log(error);
        });
    }


   render() {
    const { movie, onBackClick } = this.props;

     // This section of code sets a flag which will show a add/remove favourites button depending on if the movie can be found in the users favourites
     let tempArray = this.state.favouriteMovies;
     let isFavouriteNew = false
     if (tempArray.includes(this.props.movie._id)) {
         isFavouriteNew = true;
     } else {
         isFavouriteNew = false;
     };

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
                            <Link to={`/directors/${movie.Director.Name}`}>
                                 <Button variant="link">Director</Button>
                            </Link>
                            <span className="value">{movie.Director.Name}</span>   
                        </div> 
                        <div className="movie-director">
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
                            <span className="value">{movie.Genre.Name}</span>   
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