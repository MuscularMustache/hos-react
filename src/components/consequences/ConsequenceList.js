import React from 'react';
import SwipeoutConsequence from './SwipeoutConsequence';
import '../../styles/consequences.css';

const ConsequenceList = props => {
  if (props.consequences.length === 0) {
    return (
      <h4 className="no-data">It seems you have no consequences. Click the options button below to start adding them</h4>
    );
  }
  return (
    <ul className="consequence-list">
      {props.consequences.map(({ id, content }) => (
        <SwipeoutConsequence
          key={id}
          id={id}
          content={content}
          refetchConequences={() => props.refetchConequences()}
        />
      ))}
    </ul>
  );
};

export default ConsequenceList;
