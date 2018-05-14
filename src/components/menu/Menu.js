import React, { Component } from 'react';
import MenuItems from './MenuItems';
import '../../styles/menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="menu-wrapper">

        {/* NOTE: Make this a component  */}
        <i className="material-icons menu-btn no-select"
          onClick={() => this.toggleMenu()}>
            { this.state.isOpen ? 'close' : 'more_vert' }
          </i>
        <div className={ this.state.isOpen ? 'bg-cover active' : 'hidden' } onClick={() => this.toggleMenu()}></div>

        <ul className="menu-items">
          <MenuItems isOpen={this.state.isOpen} children={this.props.children} />
        </ul>
      </div>
    );
  }
};

export default Menu;

// gotta move this component
