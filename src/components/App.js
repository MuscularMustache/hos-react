import React from 'react';
import Header from './Header';

const App = props => {
  const isSignup = props.location.pathname === '/signup';

  return (
    <div className={`container ${props.location.pathname.substr(1)}`}>
      <Header isSignup={isSignup} />
      {props.children}
    </div>
  );
};

export default App;
