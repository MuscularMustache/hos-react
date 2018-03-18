import React from 'react';
import '../styles/header.css';
import hat from '../assets/images/hat.svg';
import logoText from '../assets/images/logo_text.svg';

const Header = props => {
  return(
    <header className="app-header">
      <img src={hat} className="logo-hat" alt="logo" />
      <img src={logoText} className="logo-text" alt="hat of shame" />
    </header>
  );
}

export default Header;
