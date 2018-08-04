import React, { Component } from 'react';

class Auth0Login extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      this.props.history.push('/');
    } else {
      this.login();
    }
  }

  login() {
    this.props.auth.login();
  }

  render() {
    return (
      <div />
    );
  }
}

export default Auth0Login;
