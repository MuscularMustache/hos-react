import React from 'react';
import '../styles/snackbar.css';

const Snackbar = props => (
  <div
    onClick={() => props.resetMessage()}
    className={`snackbar ${props.message ? 'active' : ''}`}
  >
    <span>{props.message}</span>
    <i className="material-icons">close</i>
  </div>
);

export default Snackbar;
