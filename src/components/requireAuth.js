// HIGHER ORDER COMPONENT
import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import CurrentUser from '../queries/CurrentUser';
import LoadingIndicator from './LoadingIndicator';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      // if its not loading and the user doesnt exist aka not logged in
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push('/login');
      }
    }

    // NOTE: "WrappedComponent" ends up being whatever is passed into requireAuth()
    render() {
      // edit lists crashes if user id is undefined which it is briefly on reload
      if (!_.get(this.props, 'data.user.id')) {
        return <LoadingIndicator />;
      }
      console.log('also called');
      return <WrappedComponent {...this.props} userId={_.get(this.props, 'data.user.id')} />;
    }
  }

  return graphql(CurrentUser)(RequireAuth);
};
