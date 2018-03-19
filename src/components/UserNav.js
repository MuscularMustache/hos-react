import React, { Component } from 'react';

class UserNav extends Component {
  render() {
    // NOTE: ADD A UNIVERSAL LOADING INDICATOR COMPONENT
    if (this.props.data.loading) { return <div>Loading...</div>; }

    return <div>User Landing Page</div>
  }
};

export default UserNav;
