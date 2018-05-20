import React from 'react';
import '../styles/snackbar.css';

const Snackbar = props => {
  if (!props.message) {
    return <div className="hidden" />;
  }

  return (
    <div className="snackbar">
      {props.message}
    </div>
  );
};

export default Snackbar;
