import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import '../../styles/login.css';
import Login from '../../mutations/Login';
import CurrentUser from '../../queries/CurrentUser';

import facebookIcon from '../../assets/images/icons/facebook_white.svg';
import googleIcon from '../../assets/images/icons/google_white.svg';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  // TODO: THIS WILL NEED UPDATED IN REACT 17
  // react lifecycle hook
  // when our component is about to update this will be called
  componentWillUpdate(nextProps) {
    // nextProps is the props that will be placed on our component the next time it re-renders
    // this.props is the old props and nextProps are the new props
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/');
    }
  }


  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: CurrentUser }]
    }).catch(res => {
      // this is all of the errors that we get because graphQLErrors returns an array
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  modalPopup(strategy) {
    window.confirm(`${strategy} hasn't been implemented yet. Use regular login. I don't even care if you use a fake email, its a local instance that I'm going to clear out anyways.`);
  }

  // NOTE: very similar to signup form, look into refactoring these 2 components
  render() {
    return (
      <div className="login-content">
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} formType="login" />
        <img src={facebookIcon} className="login-icon" onClick={() => this.modalPopup('Facebook')} alt="fb login" />
        <img src={googleIcon} className="login-icon" onClick={() => this.modalPopup('Google')} alt="google login" />
        <p className="login-link">Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    );
  }
}

// CurrentUser is now assocaited with the component
// - so when CurrentUser query gets updated it will be on this.props.data
export default graphql(CurrentUser)(graphql(Login)(LoginForm));
