import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListGroup extends Component {
  render() {
    return (
      <div className="content">
        <h2>Edit Lists</h2>
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default ListGroup;
