import _ from 'lodash';
import React from 'react';
import { graphql } from 'react-apollo';
import DeleteGame from '../../mutations/DeleteGame';

const ResetGame = props => {
  if (!_.get(props, 'game[0].id')) { return <div />; }

  const { id } = props.game[0];

  return (
    <button
      className="standard-btn"
      onClick={() => { props.mutate({ variables: { id } }).then(() => props.refetchGame()); }}
    >
      <span>Reset Game</span>
    </button>
  );
};

export default graphql(DeleteGame)(ResetGame);
