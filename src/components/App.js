import React from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import Header from './Header';
import Snackbar from './Snackbar';
import CurrentUser from '../queries/CurrentUser';

// TODO: refactor this to use react context then pull the instance here and req auth
const App = props => {
  const isSignup = props.location.pathname === '/signup';
  let theme = '';

  if (_.get(props, 'data.user.theme')) {
    theme = `theme-${props.data.user.theme}`;
  }

  return (
    <div className={theme}>
      <div className={`container ${props.location.pathname.substr(1)}`}>
        <Header isSignup={isSignup} />
        {props.children}
        <Snackbar />
      </div>
    </div>
  );
};

export default graphql(CurrentUser)(App);
