import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StartGame extends Component {
  render() {
    return (
      <div className="content">
        <h2>Game</h2>
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default StartGame;
