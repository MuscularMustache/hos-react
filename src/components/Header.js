import React from 'react';
import '../styles/header.css';
import hat from '../assets/images/hat.svg';
import logoText from '../assets/images/logo_text.svg';
import blueHat from '../assets/images/hat_blue.svg';
import blueText from '../assets/images/logo_text_blue.svg';

const Header = props => (
  <header className="app-header">
    <img src={props.isSignup ? blueHat : hat} className="logo-hat" alt="logo" />
    <img src={props.isSignup ? blueText : logoText} className="logo-text" alt="hat of shame" />
  </header>
);

export default Header;
