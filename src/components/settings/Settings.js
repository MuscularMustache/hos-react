import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import CurrentUser from '../../queries/CurrentUser';
import Logout from '../../mutations/Logout';

class Settings extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUser }]
    });
  }

  render() {
    return (
      <div className="content">
        <h2>Settings</h2>
        <Link className="standard-btn" to="/">Back</Link>
        <a className="standard-btn" onClick={() => this.onLogoutClick()}>logout</a>
      </div>
    );
  }
}

export default graphql(Logout)(Settings);
