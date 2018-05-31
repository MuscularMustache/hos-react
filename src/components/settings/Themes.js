import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ThemeButton from './ThemeButton';
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
    const activeTheme = this.props.theme;
    return (
      <div className="themes">
        <h2>Themes</h2>
        <div className="flex-row between mb">
          <ThemeButton activeTheme={activeTheme} buttonTheme="default" onSetTheme={() => this.onSetTheme('default')} />
          <ThemeButton activeTheme={activeTheme} buttonTheme="green-blue" onSetTheme={() => this.onSetTheme('green-blue')} />
          <ThemeButton activeTheme={activeTheme} buttonTheme="orange-magenta" onSetTheme={() => this.onSetTheme('orange-magenta')} />
          <ThemeButton activeTheme={activeTheme} buttonTheme="blue-pink" onSetTheme={() => this.onSetTheme('blue-pink')} />
        </div>
      </div>
    );
  }
}

export default graphql(SetTheme)(Themes);
