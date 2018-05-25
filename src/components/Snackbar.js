import React from 'react';
import '../styles/snackbar.css';
import { AppContext } from './AppProvider';

const Snackbar = () => (
  <AppContext.Consumer>
    {context => (
      <div
        onClick={context.toggleSnackbar}
        className={`snackbar ${context.viewSnackbar ? 'active' : ''}`}
      >
        <span>{context.message}</span>
        <i className="material-icons">close</i>
      </div>
    )}
  </AppContext.Consumer>
);

export default Snackbar;
