import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    return (
      <div className="menu-wrapper">
        <a className="standard-btn" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          { this.state.isOpen ? 'close' : 'open' }
        </a>
        { this.state.isOpen ? this.props.children : '' }
      </div>
    );
  }
};

export default Menu;
