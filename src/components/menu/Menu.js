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

        <div className={ isOpen ? 'bg-cover active' : 'bg-cover hidden' }></div>
        <i className="material-icons menu-btn no-select">{ isOpen ? 'close' : 'more_vert' }</i>

        <ul className="menu-items">
          <MenuItems isOpen={isOpen} children={this.props.children} />
          <li className={ isOpen ? 'acitve' : 'hidden' }><span className="close-tag no-select">close options</span></li>
        </ul>
      </div>
    );
  }
};

export default Menu;

// gotta move this component
