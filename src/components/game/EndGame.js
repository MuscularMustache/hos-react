import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import DeleteGame from '../../mutations/DeleteGame';

class EndGame extends Component {
  componentDidMount() {
    const { id } = this.props.game[0];

    this.props.mutate({ variables: { id } });
  }

  render() {
    return (
      <div className="end-game collection">
        <div className="game-directions">
          <p>Thanks for playing. Hope you enjoyed it.</p>
          <p>Thats it all she wrote...</p>
        </div>
      </div>
    );
  }
}

export default graphql(DeleteGame)(EndGame);
