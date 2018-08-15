import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ThemeButton from './ThemeButton';
import CurrentUser from '../../queries/CurrentUser';
import SetTheme from '../../mutations/SetTheme';

class Themes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTheme: ''
    };
  }

  // TODO: going to need a currentUser here
  onSetTheme(theme) {
    this.props.mutate({
      variables: {
        theme,
        id: this.props.userId
      },
      refetchQueries: [{
        query: CurrentUser,
        variables: { userId: this.props.userId }
      }]
    }).then(() => {
      // note this shouldn't be set it localStorage
      localStorage.setItem('theme', theme); // eslint-disable-line
      this.setState({ activeTheme: theme });
    });
  }
  render() {
    // eslint-disable-next-line no-undef
    const activeTheme = this.state.activeTheme || localStorage.getItem('theme');
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

export default graphql(SetTheme)(graphql(CurrentUser, {
  options: props => ({ variables: { userId: props.userId } })
})(Themes));
