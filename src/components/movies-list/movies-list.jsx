import React from 'react';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';

export class MovieCard extends React.Component {
render() {
    const { movies } = props;

    if (!movies) return <div className="main-view" />;

    return <>
            <Col md={3} key={m._id}>
                <MovieCard movie={m} />
            </Col>
    
    </>;
}
}
