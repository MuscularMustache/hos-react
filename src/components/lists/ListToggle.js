import React from 'react';
import userIcon from '../../assets/images/icons/list_icon_user.svg';
import userIconActive from '../../assets/images/icons/list_icon_user_checked.svg';
import hatIcon from '../../assets/images/icons/list_icon_hat.svg';
import hatIconActive from '../../assets/images/icons/list_icon_hat_checked.svg';
import '../../styles/list-toggle.css';

const message = 'For these changes to take effect, please reset game';

// NOTE: the reason onToggleList isnt in here is because when re-fethching uses different data sets
const ListToggle = props => {
  const icon = props.listType === 'hat' ? hatIcon : userIcon;
  const iconActive = props.listType === 'hat' ? hatIconActive : userIconActive;

  return (
    <button onClick={props.onToggleList} className={`list-toggle-btn ${props.pullForGame ? 'active' : 'inactive'}`}>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <span onClick={props.context.updateMessage.bind(props.AppProvider, message)}>
        <img src={props.pullForGame ? iconActive : icon} className="list-icon" alt="user icon" />
      </span>
    </button>
  );
};

export default ListToggle;
