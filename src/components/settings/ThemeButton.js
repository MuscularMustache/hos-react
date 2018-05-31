import React from 'react';

const ThemeButton = props => (
  <a
    className={`${props.buttonTheme} ${props.activeTheme === props.buttonTheme ? 'active' : ''}`}
    onClick={props.onSetTheme}
  >
    {props.buttonTheme}
  </a>
);

export default ThemeButton;
