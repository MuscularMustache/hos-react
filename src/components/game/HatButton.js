import React from 'react';
import hat from '../../assets/images/hat.svg';

const HatButton = props => (
  <button
    onClick={props.handleClick}
    data-disabled={props.disabled}
    className="hat-btn no-select"
  >
    <img src={hat} alt="logo" />
  </button>
);

export default HatButton;
