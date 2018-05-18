import React from 'react';
import { graphql } from 'react-apollo';
import DeleteConsequence from '../../mutations/DeleteConsequence';
import '../../styles/consequences.css';

const ConsequenceList = props => {
  if (props.consequences.length === 0) {
    return (
      <h4 className="no-consequences">It seems you have no consequences. Click the options button below to start adding them</h4>
    );
  }
  return (
    <ul className="collection">
      {props.consequences.map(({ id, content }) => (
        <li key={id} className="collection-item">
          <i
            className="material-icons"
            onClick={() => {
              props.mutate({ variables: { id } }).then(() => props.refetchConequences());
            }}
          >
            delete_forever
          </i>
          {content}
        </li>
      ))}
    </ul>
  );
};

export default graphql(DeleteConsequence)(ConsequenceList);
