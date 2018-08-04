import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/user-nav.css';

const UserNav = () => (
  <div className="content main-menu">
    <Link className="standard-btn" to="/game">play</Link>
    <Link className="standard-btn" to="/lists">edit consequences</Link>
    <Link className="standard-btn" to="/settings">settings</Link>
  </div>
);

export default UserNav;
