import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container, ListGroupItem, ListGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import "./movie-view.scss"
import { updateUser, setUser } from '../../actions/actions';
export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        // Create state variables that will be used to add/remove a movie from a users Favorites list
        this.state = {
            // REMOVED line of code, as I couldn't get an isFavorite flag to work as a state variable. My solution can be found in the render() function
            // isFavorite: false,
            FavoriteMovies: [],
            userDetails: []
        }

        // Bind these additional functions that will get called by onClick events to 'this'
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    // During componentDidMount() get the user's details (for displaying whether this movie is a Favorite or not)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
        
    }

    // getUserDetails function for making a request to the server for the users details
    getUserDetails() {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        axios.get(`https://myhorrormovies.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then((response) => {
            console.log(response.data);
            this.props.setUser(response.user);
            // Use the response to set the user details in the state variables
            
            this.setState({
                userDetails: response.data,
                FavoriteMovies: response.data.FavoriteMovies
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for adding this movie to a users Favorites list. Makes a post request to the server using information passed in through the props
    addFavorite() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.post(`https://myhorrormovies.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            // Set the isFavorite state to true, now that this movie has been added to the list of Favorites
            this.getUserDetails(token);
            window.location.pathname = "/";
            const data = response.data;
            localStorage.updateUser('user', data.FavoriteMovies);
            localStorage.setItem('user', response.data.Username);
            // window.open refreshes the page to make sure this movie is correctly displaying as a Favorite
            window.location.pathname = "/";
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Function for removing this movie from a users Favorites list. Makes a delete request to the server using information passed in through the props
    removeFavorite() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete(`https://myhorrormovies.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Set the isFavorite state to false, now that this movie has been removed from the list of Favorites
            window.location.pathname = "/";
            
            // window.open refreshes the page to make sure this movie is correctly displaying as not a Favorite
            const data = response.data;
            alert('Update was sucessful ! ');
            console.log(data);
            localStorage.setItem('user', data.Username);
           
            window.location.pathname = "/";
        }).catch(function(error) {
            console.log(error);
        });
    }


   render() {
    const { movie, onBackClick, user } = this.props;

     // This section of code sets a flag which will show a add/remove Favorites button depending on if the movie can be found in the users Favorites
     let tempArray = user.FavoriteMovies;
     let isFavoriteNew = false
     if (tempArray.includes(movie._id)) {
         isFavoriteNew = true;
     } else {
         isFavoriteNew = false;
     };

    return( 
        <Container>
            <Row>
                <Card bg="secondary" text="light" border="light" crossOrigin="anonymous">
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Card.Img varient="top" src={movie.ImagePath} className="big_image" crossOrigin="anonymous"/>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Card.Title className="text-center">{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Description}</Card.Text>
                                    {/* && operator here is an alternative to an if statement. If movie.Genre.Name exists, then it will render the Genre section. If it doesn't exist, it will skip */}
                                    {movie.Genre.Name && (
                                        <Card.Text className="genre_heading"><span className="genre_title">Genre: </span><Link style={{ color: "white" }} to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></Card.Text>
                                    )}
                                    {movie.Director.Name && (
                                        <Card.Text className="director_heading"><span className="director_title">Director: </span><Link style={{ color: "white" }} to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></Card.Text>
                                    )}  
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
                            {/* Use flag defined above to determine if we need an add or remove from Favorites button */}
                            {isFavoriteNew ? (
                                <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.removeFavorite}>
                                    Remove from Favorites
                                </Button>
                                ) : (
                                <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.addFavorite}>
                                    Add to Favorites
                                </Button>
                                )}             

                        </Card.Footer>
                </Card>
            </Row>    
        </Container>        
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

  const mapStateToProps = state => {
    const { user } = state;
    return { user };
};

// connect function to link the above function to the MovieView
export default connect(mapStateToProps)(MovieView);