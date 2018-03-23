import React from 'react';
import { graphql } from 'react-apollo';
import DeleteConsequence from '../mutations/DeleteConsequence';

const ConsequenceList = props => {
  return (
    <ul className="collection">
      {props.consequences.map(({id, content}) => {
          return (
            <li key={id} className="collection-item">
              <i
                className="material-icons"
                onClick={() => {
                  props.mutate({ variables: { id }})
                    .then(() => props.refetchConequences() );
                }}>
                delete_forever
              </i>
              {content}
            </li>
          );
        })}
    </ul>
  );
}

export default graphql(DeleteConsequence)(ConsequenceList);
