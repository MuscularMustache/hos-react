import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirm: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  hasConfirm() {
    if (this.props.formType === 'sign up') {
      return (
        <div className="input-field confirm">
          <input
            className={this.state.confirm ? 'has-text' : 'empty'}
            type="password"
            value={this.state.confirm}
            onChange={e => this.setState({ confirm: e.target.value })}
          />
          <label>confirm password</label>
        </div>
      );
    }
  }

  // the bind method is only used because we're using a preventDefault because the delayed invoction
  // so if i change the form to a div i can use a fat arrow function and not have to bind this -
  // when refactoring, remvove the form and add onSubmit to be on the button click
  render() {
    return (
      <div className="login-form-wrapper">
        <form onSubmit={this.onSubmit.bind(this)} className="login-form" >
          <div className="input-field">
            <input
              className={this.state.email ? 'has-text' : 'empty'}
              type="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <label>email</label>
          </div>
          <div className="input-field">
            <input
              className={this.state.password ? 'has-text' : 'empty'}
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <label>password</label>
          </div>

          {this.hasConfirm()}

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
