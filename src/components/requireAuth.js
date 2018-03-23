// HIGHER ORDER COMPONENT
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      // if its not loading and the user doesnt exist aka not logged in
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push('/login');
      }
    }

    // NOTE: "WrappedComponent" ends up being whatever is passed into requireAuth()
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return graphql(CurrentUser)(RequireAuth);
}
