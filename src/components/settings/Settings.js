import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Themes from './Themes';
import '../../styles/settings.css';

class Settings extends Component {
  onLogoutClick() {
    // NOTE: prevents mid game account switching errors
    // NOTE: this is whats causing the errors in the console on logout. Its because an id is required and clearing this no longer provides and id to the app, doesn't cause any bugs
    localStorage.clear(); // eslint-disable-line no-undef
    // localStorage.removeItem('activeGame'); // eslint-disable-line no-undef
    // localStorage.removeItem('tempConsequences'); // eslint-disable-line no-undef
    // localStorage.removeItem('userID'); // eslint-disable-line no-undef
    this.props.auth.logout();
  }

  render() {
    return (
      <div className="content">
        <Themes userId={this.props.userId} />
        <a className="standard-btn" onClick={() => this.onLogoutClick()}>logout</a>
        <Link className="standard-btn" to="/">back</Link>
      </div>
    );
  }
}

export default Settings;
