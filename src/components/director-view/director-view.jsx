import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { Director, onBackClick, movies } = this.props;

        return (
            <Container>
                <br />
                <Card align="center">
                    <h4>Director</h4>
                    <Card.Body>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{Director.Name}</span>
                        </div>
                        <div>
                            <span className="label">Bio: </span>
                            <span className="value">{Director.Bio}</span>
                        </div>
                        <div>
                            <span className="label">Born: </span>
                            <span className="value">{Director.Birthyear}</span>
                        </div>
                        <div>
                            <span className="label">Death: </span>
                            <span className="value">{Director.Deathyear}</span>
                        </div>
                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

    DirectorView.propTypes = {
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