import React from 'react';

const MenuItems = props => {
  if (props.isOpen) {
    return props.children.map(child => {
      return (
        <li key={child.props.icon}>
          {child}
          <i className="material-icons">{child.props.icon}</i>
        </li>
      );
    });
  }

  return <div />;
};

export default MenuItems;
