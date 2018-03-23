import React from 'react';
import Header from './Header';

const App = props => {
  let isSignup = props.location.pathname === '/signup';

  return(
    <div className={isSignup ? "container signup" : "container"}>
      <Header isSignup={isSignup} />
      {props.children}
    </div>
  );
}

export default App;
