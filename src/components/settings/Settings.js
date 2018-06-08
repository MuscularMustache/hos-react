import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Themes from './Themes';
import CurrentUser from '../../queries/CurrentUser';
import Logout from '../../mutations/Logout';
import '../../styles/settings.css';

class Settings extends Component {
  onLogoutClick() {
    // NOTE: prevents mid game account switching errors
    localStorage.clear(); // eslint-disable-line no-undef
    this.props.mutate({
      refetchQueries: [{ query: CurrentUser }]
    });
  }

  render() {
    return (
      <div className="content">
        {/* <h2>Settings</h2> */}
        <Themes userId={this.props.userId} theme={_.get(this.props, 'data.user.theme')} />
        <a className="standard-btn" onClick={() => this.onLogoutClick()}>logout</a>
        <Link className="standard-btn" to="/">back</Link>
      </div>
    );
  }
}

export default graphql(Logout)(Settings);
