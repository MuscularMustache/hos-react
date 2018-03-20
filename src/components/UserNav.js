import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

class UserNav extends Component {
  render() {
    if (this.props.data.loading) { return <LoadingIndicator />; }

    return (
      <div className="content">
        <Link className="standard-btn" to="/lists">Edit Lists</Link>
        <Link className="standard-btn" to="/settings">Settings</Link>
      </div>
    );
  }
};

export default UserNav;
