import React from 'react';

const ConsequenceList = props => {
  return (
    <ul className="collection">
      {props.consequences.map(({id, content}) => {
          return (
            <li key={id} className="collection-item">
              {content}
            </li>
          );
        })}
    </ul>
  );
}

export default ConsequenceList;
