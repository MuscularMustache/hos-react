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
    let { isOpen } = this.state;
    return (
      <div className="menu-wrapper" onClick={() => this.toggleMenu()}>

        <i className="material-icons menu-btn no-select">{ isOpen ? 'close' : 'more_vert' }</i>
        <div className={ isOpen ? 'bg-cover active' : 'hidden' }></div>

        <ul className="menu-items">
          <MenuItems isOpen={isOpen} children={this.props.children} />
          <li><span className={ isOpen ? 'close-tag no-select' : 'hidden' }>close options</span></li>
        </ul>
      </div>
    );
  }
};

export default Menu;

// gotta move this component
