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
          <a className="theme-btn default" onClick={() => this.onSetTheme('default')}>default</a>
          <a className="theme-btn green-blue" onClick={() => this.onSetTheme('green-blue')}>blue</a>
          <a className="theme-btn orange-magenta" onClick={() => this.onSetTheme('orange-magenta')}>orange/pink</a>
          <a className="theme-btn blue-pink" onClick={() => this.onSetTheme('blue-pink')}>other1</a>
        </div>
      </div>
    );
  }
}

export default graphql(SetTheme)(Themes);
