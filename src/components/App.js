import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import Header from './Header';
import Snackbar from './Snackbar';
import AuthUser from '../queries/AuthUser';

// TODO: refactor this to use react context then pull the instance here and req auth
class App extends Component {
  constructor(props) {
    super(props);
    const userID = localStorage.getItem('userID') || ''; //eslint-disable-line
    this.state = { userID, theme: 'default' };
  }

  // NOTE: - CAN PROBABLY CALL FOR THEME WHENEVER I'M READY
  render() {
    console.log(this);
    // if (!localStorage.getItem('userID')) {
      // this.props.client.query({
      //
      // }).then(res => {
      //   console.log(res);
      // });
    // }

    let theme = '';
    const localTheme = localStorage.getItem('theme'); // eslint-disable-line

    // NOTE: this prevents a flash of the default theme on reload
    if (_.get(this.props, 'data.user.theme')) {
      theme = `theme-${this.props.data.user.theme}`;
    } else if (localTheme) {
      theme = `theme-${localTheme}`;
    }

    // this.setState({ theme });

    return (
      <div className={theme}>
        <div className={`container ${this.props.location.pathname.substr(1)}`}>
          <Header />
          {this.props.children}
          <Snackbar />
        </div>
      </div>
    );
  }
}

export default graphql(AuthUser, {
  options: () => ({ variables: { userId: localStorage.getItem('userID') /* eslint-disable-line */ } })
})(App);
