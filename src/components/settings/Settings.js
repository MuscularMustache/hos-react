import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Themes from './Themes';
import '../../styles/settings.css';

class Settings extends Component {
  onLogoutClick() {
    // NOTE: prevents mid game account switching errors
    localStorage.clear(); // eslint-disable-line no-undef
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
