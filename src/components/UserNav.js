import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const UserNav = props => {
  if (props.data.loading) { return <LoadingIndicator />; }

  return (
    <div className="content">
      <Link className="standard-btn" to="/lists" disabled>play</Link>
      <Link className="standard-btn" to="/lists">edit consequences</Link>
      <Link className="standard-btn" to="/settings">settings</Link>
    </div>
  );
};

export default UserNav;
