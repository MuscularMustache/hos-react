import React from 'react';
import '../styles/loading-indicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loader">
      <div className="shadow"></div>
      <div className="box"></div>
    </div>
  );
};

export default LoadingIndicator;
