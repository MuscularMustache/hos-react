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
    this.props.mutate({
      refetchQueries: [{ query: CurrentUser }]
    });
  }

  render() {
    return (
      <div className="content">
        <h2>Settings</h2>
        <a className="standard-btn" onClick={() => this.onLogoutClick()}>logout</a>
        <Themes userId={this.props.userId} theme={_.get(this.props, 'data.user.theme')} />
        <Link className="standard-btn" to="/">Back</Link>
      </div>
    );
  }
}

export default graphql(Logout)(Settings);
