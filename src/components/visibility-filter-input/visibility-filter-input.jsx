import React from 'react';
import { connect } from 'react-redux';

import {Form, Card } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
        <Card bg="secondary" text="light" border="light">
            <Card.Body>
        <Form.Control
            onChange={e => props.setFilter(e.target.value)}
            value={props.visibilityFilter}
            placeholder="Search"
        />
        </Card.Body>
        </Card>
    );    
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput)