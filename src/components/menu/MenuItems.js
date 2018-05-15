import React from 'react';

const MenuItems = props => {
  // this breaks if an array isn't sent. If i ever had only one option it would break
  //- props.children should be set to an array if only 1 child is passed in
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
