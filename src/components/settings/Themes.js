import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUser from '../../queries/CurrentUser';
import SetTheme from '../../mutations/SetTheme';

class Themes extends Component {
  onSetTheme(theme) {
    this.props.mutate({
      variables: {
        theme,
        id: this.props.userId
      },
      refetchQueries: [{ query: CurrentUser }]
    });
  }

  render() {
    return (
      <div className="themes">
        <h2>Themes</h2>
        <div className="flex-row between mb">
          <a onClick={() => this.onSetTheme('default')}>default</a>
          <a onClick={() => this.onSetTheme('teal')}>blue</a>
          <a onClick={() => this.onSetTheme('orange-pink')}>orange/pink</a>
        </div>
      </div>
    );
  }
}

export default graphql(SetTheme)(Themes);
