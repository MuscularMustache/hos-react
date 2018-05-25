import React from 'react';
import Header from './Header';
import Snackbar from './Snackbar';

const App = props => {
  const isSignup = props.location.pathname === '/signup';

  return (
    <div className={`container ${props.location.pathname.substr(1)}`}>
      <Header isSignup={isSignup} />
      {props.children}
      <Snackbar />
    </div>
  );
};

export default App;
