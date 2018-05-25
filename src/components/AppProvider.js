import React, { Component } from 'react';

export const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);

    /* eslint-disable react/no-unused-state */
    this.state = {
      message: '',
      viewSnackbar: false,
      updateMessage: message => {
        this.setState({ message, viewSnackbar: true });
        this.autoClose();
      },
      toggleSnackbar: () => this.setState({ viewSnackbar: !this.state.viewSnackbar })
    };
    /* eslint-enable react/no-unused-state */

    this.autoClose = () => {
      setTimeout(() => {
        this.setState({ viewSnackbar: false });
      }, 5000);
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
