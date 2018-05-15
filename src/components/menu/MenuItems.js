import React from 'react';

const MenuItems = props => {
  return props.children.map(child => {
    return (
      <li key={child.props.icon} className={props.isOpen ? "active" : "hidden"}>
        {child}
        <i className="material-icons">{child.props.icon}</i>
      </li>
    );
  });
};

export default MenuItems;
