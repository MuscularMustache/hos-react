import React from 'react';
// import { graphql } from 'react-apollo';
// import _ from 'lodash';
import Header from './Header';
import Snackbar from './Snackbar';
// import CurrentUser from '../queries/CurrentUser';

// TODO: refactor this to use react context then pull the instance here and req auth
const App = props => {
  // NOTE: shouldn't use localstorage to get theme

  // TODO: going to need currentUser here
  let theme = localStorage.getItem('theme'); // eslint-disable-line

  if (theme) {
    theme = `theme-${theme}`;
  }

  return (
    <div className={theme}>
      <div className={`container ${props.location.pathname.substr(1)}`}>
        <Header />
        {props.children}
        <Snackbar />
      </div>
    </div>
  );
};

export default App;
