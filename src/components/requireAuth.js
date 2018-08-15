// HIGHER ORDER COMPONENT
import React, { Component } from 'react';
// import _ from 'lodash';
import { graphql } from 'react-apollo';
// import CurrentUser from '../queries/CurrentUser';
import SetUser from '../mutations/SetUser';
import LoadingIndicator from './LoadingIndicator';
import Auth from '../Auth/Auth'; // eslint-disable-line

const auth = new Auth();

export default WrappedComponent => {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);
      const userID = localStorage.getItem('userID') || ''; //eslint-disable-line
      this.state = { userID };
    }

    componentDidMount() {
      const { isAuthenticated } = auth;
      if (!isAuthenticated()) {
        this.props.history.push('/login');
      } else if (!this.state.userID) {
        // eslint-disable-next-line no-undef
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
          // TODO: should i logout? should i just push to login? display error message?
          // console.log('Access Token must exist to fetch profile');
          this.props.history.push('/login');
        }

        // NOTE: maybe user something other than profile sub
        auth.auth0.client.userInfo(accessToken, (err, profile) => {
          if (profile && profile.sub) {
            this.setUser(profile.sub);
          }
        });
      }
    }

    // TODO: going to need currentUser
    setUser(userID) {
      this.props.mutate({
        variables: { userID }
      }).then(res => {
        localStorage.setItem('theme', res.data.setUser.theme); // eslint-disable-line
        localStorage.setItem('userID', res.data.setUser.id); // eslint-disable-line
        this.setState({ userID: res.data.setUser.id });
      });
    }


    // NOTE: "WrappedComponent" ends up being whatever is passed into requireAuth()
    render() {
      // edit lists crashes if user id is undefined which it is briefly on reload
      if (!this.state.userID) {
        return <LoadingIndicator />;
      }

      // userId={_.get(this.props, 'data.user.id')}
      return <WrappedComponent {...this.props} auth={auth} userId={this.state.userID} />;
    }
  }

  return graphql(SetUser)(RequireAuth);
  // return graphql(SetUser)(graphql(CurrentUser, {
  //   options: props => ({ variables: { userId: props.userId } })
  // })(RequireAuth));
};
