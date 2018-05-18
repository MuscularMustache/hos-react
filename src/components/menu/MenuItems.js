import React from 'react';

// this breaks if an array isn't sent. If i ever had only one option it would break
// - props.children should be set to an array if only 1 child is passed in
const MenuItems = props => (
  props.items.map(item => (
    <li key={item.props.icon} className={props.isOpen ? 'active' : 'hidden'}>
      {item}
      <i className="material-icons">{item.props.icon}</i>
    </li>
  ))
);

export default MenuItems;
