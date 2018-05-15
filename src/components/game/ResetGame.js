import React from 'react';
import { graphql } from 'react-apollo';
import DeleteGame from '../../mutations/DeleteGame';
import _ from 'lodash';

const ResetGame = props => {
  if (!_.get(props, 'game[0].id')) { return <div/>; }

  let id = props.game[0].id;

  return(
    <a className="standard-btn" onClick={() => {
      props.mutate({ variables: { id }})
        .then(() => props.refetchGame() );
    }}><span>Reset Game</span></a>
  );
}

export default graphql(DeleteGame)(ResetGame);
