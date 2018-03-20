import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <form onSubmit={this.onSubmit.bind(this)} className="login-form" >
          <div className="input-field">
            <input
              placeholder="email"
              type="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>

          <button className="standard-btn">{this.props.formType}</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
