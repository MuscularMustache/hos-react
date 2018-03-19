import React, { Component } from 'react';
import LoadingIndicator from './LoadingIndicator';

class UserNav extends Component {
  render() {
    if (this.props.data.loading) { return <LoadingIndicator />; }

    return <div>User Landing Page</div>
  }
};

export default UserNav;
